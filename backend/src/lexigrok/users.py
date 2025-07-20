from fastapi import APIRouter, HTTPException

from lexigrok import crud, schemas
from lexigrok.security import get_password_hash, verify_password

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


def authenticate_user(username, password):
    user = crud.get_user(username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


@router.post("/", response_model=schemas.User)
async def create_user(user: schemas.UserCreate):
    db_user = crud.get_user(user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(user.password)
    return crud.create_user(user=user, hashed_password=hashed_password)
