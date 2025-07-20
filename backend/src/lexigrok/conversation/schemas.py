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
