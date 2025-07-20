from lexigrok.auth import schemas
from lexigrok.database import fake_users_db


def get_user(username: str) -> schemas.UserInDB | None:
    if username in fake_users_db:
        user_dict = fake_users_db[username]
        return schemas.UserInDB(**user_dict)
    return None


def create_user(user: schemas.UserCreate, hashed_password: str) -> schemas.UserInDB:
    user_in_db = schemas.UserInDB(
        username=user.username,
        email=user.email,
        full_name=user.full_name,
        disabled=False,
        hashed_password=hashed_password,
    )
    fake_users_db[user.username] = user_in_db.model_dump()
    return user_in_db
