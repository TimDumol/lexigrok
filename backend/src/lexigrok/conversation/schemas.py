from pydantic import BaseModel


class UserMessage(BaseModel):
    session_id: str | None = None
    text: str
    topic_id: str | None = None
    imageUrl: str | None = None  # To pass the Data URL of the image


class BotResponse(BaseModel):
    session_id: str
    response_text: str
    suggestion: str | None = None  # Next suggestion from the bot


class ConversationSuggestionRequest(BaseModel):
    session_id: str
    current_topic_id: str | None = None
    conversation_history: list[str] | None = None  # e.g., last few turns


class ConversationSuggestionResponse(BaseModel):
    suggestion: str


class MessageBase(BaseModel):
    is_user_message: bool
    text: str | None = None
    audio_url: str | None = None
    transcription: str | None = None


class MessageCreate(MessageBase):
    conversation_id: int


class Message(MessageBase):
    id: int
    conversation_id: int

    class Config:
        orm_mode: bool = True


class ConversationBase(BaseModel):
    user_id: str


class ConversationCreate(ConversationBase):
    pass


class Conversation(ConversationBase):
    id: int
    messages: list[Message] = []

    class Config:
        orm_mode = True
