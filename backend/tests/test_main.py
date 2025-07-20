import pytest
from unittest.mock import MagicMock
from fastapi.testclient import TestClient
from lexigrok.main import app, get_storage
from lexigrok.storage import Storage


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def authenticated_client():
    client = TestClient(app)
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
