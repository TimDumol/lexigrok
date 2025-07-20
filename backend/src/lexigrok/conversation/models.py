from sqlmodel import Field, Relationship, SQLModel


class Conversation(SQLModel, table=True):
    id: int = Field(primary_key=True)
    user_id: str = Field(index=True)

    messages: list["Message"] = Relationship(back_populates="conversation")


class Message(SQLModel, table=True):
    id: int = Field(primary_key=True)
    conversation_id: int | None = Field(default=None, foreign_key="conversation.id")
    is_user_message: bool

    text: str | None = None
    audio_url: str | None = None
    transcription: str | None = None

    conversation: Conversation | None = Relationship(back_populates="messages")
