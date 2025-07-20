import os
from fastapi.testclient import TestClient

from lexigrok.main import app

os.environ["SECRET_KEY"] = "test"

client = TestClient(app)


def test_create_user():
    response = client.post(
        "/users/",
        json={
            "username": "testuser",
            "email": "testuser@example.com",
            "full_name": "Test User",
            "password": "testpassword",
        },
    )
    assert response.status_code == 200, response.text
    data = response.json()
    assert data["username"] == "testuser"
    assert "hashed_password" not in data


def test_login_for_access_token():
    # First, create a user
    client.post(
        "/users/",
        json={
            "username": "testuser2",
            "email": "testuser2@example.com",
            "full_name": "Test User 2",
            "password": "testpassword2",
        },
    )

    # Then, log in
    response = client.post(
        "/token",
        data={"username": "testuser2", "password": "testpassword2"},
    )
    assert response.status_code == 200, response.text
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_get_suggested_topics_unauthenticated():
    response = client.get("/topics/suggested")
    assert response.status_code == 401, response.text


def test_get_suggested_topics_authenticated():
    # First, create a user and get a token
    client.post(
        "/users/",
        json={
            "username": "testuser3",
            "password": "testpassword3",
        },
    )
    login_response = client.post(
        "/token",
        data={"username": "testuser3", "password": "testpassword3"},
    )
    token = login_response.json()["access_token"]

    # Then, access the protected endpoint
    response = client.get(
        "/topics/suggested",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200, response.text
    data = response.json()
    assert "topics" in data
