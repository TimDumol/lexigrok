import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from sqlmodel.pool import StaticPool

from lexigrok.main import app, get_session
from lexigrok import models


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
    authenticated_client: TestClient, session: Session
):
    response = authenticated_client.post(
        "/conversation/message",
        json={"text": "Hello", "topic_id": "test"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "session_id" in data
    session_id = data["session_id"]

    conversation = session.get(models.Conversation, int(session_id))
    assert conversation
    assert len(conversation.messages) == 2
    assert conversation.messages[0].is_user_message
    assert conversation.messages[0].text == "Hello"
    assert not conversation.messages[1].is_user_message
