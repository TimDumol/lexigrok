from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class Conversation(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)

    messages: List["Message"] = Relationship(back_populates="conversation")


class Message(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    conversation_id: Optional[int] = Field(default=None, foreign_key="conversation.id")
    is_user_message: bool

    text: Optional[str] = None
    audio_url: Optional[str] = None
    transcription: Optional[str] = None

    conversation: Optional[Conversation] = Relationship(back_populates="messages")
