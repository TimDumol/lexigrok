from sqlmodel import Session

from lexigrok import models, schemas

fake_users_db = {}


def get_user(username: str):
    if username in fake_users_db:
        user_dict = fake_users_db[username]
        return schemas.UserInDB(**user_dict)


def create_user(user: schemas.UserCreate, hashed_password):
    user_in_db = schemas.UserInDB(
        username=user.username,
        email=user.email,
        full_name=user.full_name,
        disabled=False,
        hashed_password=hashed_password,
    )
    fake_users_db[user.username] = user_in_db.model_dump()
    return user_in_db


def create_conversation(db: Session, user_id: str) -> models.Conversation:
    conversation = models.Conversation(user_id=user_id)
    db.add(conversation)
    db.commit()
    db.refresh(conversation)
    return conversation


def get_conversation(db: Session, conversation_id: int) -> models.Conversation:
    return db.get(models.Conversation, conversation_id)


def create_message(db: Session, message: schemas.MessageCreate) -> models.Message:
    db_message = models.Message.from_orm(message)
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message
