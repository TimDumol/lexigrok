import os
from unittest.mock import MagicMock
import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from sqlmodel.pool import StaticPool

from lexigrok.conversation.models import Conversation
from lexigrok.main import app
from lexigrok.database import get_session
from lexigrok.storage import Storage
from lexigrok.upload.dependencies import get_storage

os.environ["SECRET_KEY"] = "test"


@pytest.fixture(name="session")
def session_fixture():
    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session
    SQLModel.metadata.drop_all(engine)


@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_session_override():
        return session

    app.dependency_overrides[get_session] = get_session_override
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()


@pytest.fixture
def authenticated_client(client: TestClient):
    client.post(
        "/users/",
        json={
            "username": "testmainuser",
            "password": "testmainpassword",
        },
    )
    login_response = client.post(
        "/token",
        data={"username": "testmainuser", "password": "testmainpassword"},
    )
    token = login_response.json()["access_token"]
    client.headers = {"Authorization": f"Bearer {token}"}
    return client


def test_create_and_get_conversation(
    authenticated_client: TestClient, session: Session, mocker
):
    mocker.patch(
        "lexigrok.generation.openai_strategy.OpenAIStrategy.get_response",
        return_value={
            "text": "mocked response",
            "generation_details": {"strategy": "mock"},
        },
    )
    response = authenticated_client.post(
        "/conversation/message",
        json={"text": "Hello", "topic_id": "test"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "session_id" in data
    session_id = data["session_id"]

    conversation = session.get(Conversation, int(session_id))
    assert conversation
    assert len(conversation.messages) == 2
    assert conversation.messages[0].is_user_message
    assert conversation.messages[0].text == "Hello"
    assert not conversation.messages[1].is_user_message


def test_get_presigned_url_for_image_success(authenticated_client):
    # Arrange
    mock_storage = MagicMock(spec=Storage)
    mock_storage.get_presigned_url.return_value = "http://mock-url.com/presigned-url"
    app.dependency_overrides[get_storage] = lambda: mock_storage
    file_name = "test-image.jpg"
    object_name = f"images/{file_name}"

    # Act
    response = authenticated_client.get(f"/upload/image?file_name={file_name}")

    # Assert
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["url"] == "http://mock-url.com/presigned-url"
    assert json_response["object_name"] == object_name
    mock_storage.get_presigned_url.assert_called_once_with(object_name)


def test_get_presigned_url_for_image_storage_error(authenticated_client):
    # Arrange
    mock_storage = MagicMock(spec=Storage)
    mock_storage.get_presigned_url.side_effect = Exception("Storage is down")
    app.dependency_overrides[get_storage] = lambda: mock_storage
    file_name = "test-image.jpg"

    # Act
    response = authenticated_client.get(f"/upload/image?file_name={file_name}")

    # Assert
    assert response.status_code == 500
    assert response.json() == {"detail": "Could not generate upload URL."}
