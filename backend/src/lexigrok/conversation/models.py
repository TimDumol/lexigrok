from typing import List, Optional, Any, Dict
from sqlmodel import Field, Relationship, SQLModel, JSON, Column

class Message(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    conversation_id: int = Field(foreign_key="conversation.id")
    is_user_message: bool
    text: Optional[str] = None
    audio_url: Optional[str] = None
    transcription: Optional[str] = None
    generation_details: Optional[Dict[str, Any]] = Field(default=None, sa_column=Column(JSON))

    conversation: "Conversation" = Relationship(back_populates="messages")


class Conversation(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str

    messages: List["Message"] = Relationship(back_populates="conversation")
