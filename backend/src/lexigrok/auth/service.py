from fastapi import HTTPException

from lexigrok.auth import schemas
from lexigrok.auth.models import get_user, create_user
from lexigrok.security import get_password_hash, verify_password


def authenticate_user(username: str, password: str) -> schemas.UserInDB | bool:
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_user_service(user: schemas.UserCreate) -> schemas.UserInDB:
    db_user = get_user(user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(user.password)
    return create_user(user=user, hashed_password=hashed_password)
