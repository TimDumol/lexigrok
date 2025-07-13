import pytest
from unittest.mock import MagicMock
from fastapi.testclient import TestClient
from lexigrok.main import app, get_storage
from lexigrok.storage import Storage


@pytest.fixture
def client():
    return TestClient(app)


def test_get_presigned_url_for_image_success(client):
    # Arrange
    mock_storage = MagicMock(spec=Storage)
    mock_storage.get_presigned_url.return_value = "http://mock-url.com/presigned-url"
    app.dependency_overrides[get_storage] = lambda: mock_storage
    file_name = "test-image.jpg"
    object_name = f"images/{file_name}"

    # Act
    response = client.get(f"/upload/image?file_name={file_name}")

    # Assert
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["url"] == "http://mock-url.com/presigned-url"
    assert json_response["object_name"] == object_name
    mock_storage.get_presigned_url.assert_called_once_with(object_name)


def test_get_presigned_url_for_image_storage_error(client):
    # Arrange
    mock_storage = MagicMock(spec=Storage)
    mock_storage.get_presigned_url.side_effect = Exception("Storage is down")
    app.dependency_overrides[get_storage] = lambda: mock_storage
    file_name = "test-image.jpg"

    # Act
    response = client.get(f"/upload/image?file_name={file_name}")

    # Assert
    assert response.status_code == 500
    assert response.json() == {"detail": "Could not generate upload URL."}
