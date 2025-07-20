from pydantic import BaseModel, Field
from typing import List, Optional


class PresignedUrlResponse(BaseModel):
    url: str = Field(..., example="https://storage.example.com/presigned-url")
    object_name: str = Field(..., example="images/my-image.jpg")


# --- Topic Schemas ---
class Topic(BaseModel):
    id: str
    name: str
    description: Optional[str] = None


class SuggestedTopicsResponse(BaseModel):
    topics: List[Topic]


class TopicSuggestionResponse(BaseModel):
    suggestions: List[Topic]


# --- Conversation Schemas ---
class UserMessage(BaseModel):
    session_id: Optional[str] = None
    text: str
    topic_id: Optional[str] = None
    imageUrl: Optional[str] = None  # To pass the Data URL of the image


class BotResponse(BaseModel):
    session_id: str
    response_text: str
    suggestion: Optional[str] = None  # Next suggestion from the bot


class ConversationSuggestionRequest(BaseModel):
    session_id: str
    current_topic_id: Optional[str] = None
    conversation_history: Optional[List[str]] = None  # e.g., last few turns


class ConversationSuggestionResponse(BaseModel):
    suggestion: str


class MessageBase(BaseModel):
    is_user_message: bool
    text: Optional[str] = None
    audio_url: Optional[str] = None
    transcription: Optional[str] = None


class MessageCreate(MessageBase):
    conversation_id: int


class Message(MessageBase):
    id: int
    conversation_id: int

    class Config:
        orm_mode = True


class ConversationBase(BaseModel):
    user_id: str


class ConversationCreate(ConversationBase):
    pass


class Conversation(ConversationBase):
    id: int
    messages: List[Message] = []

    class Config:
        orm_mode = True


# --- Translation Schemas ---
class TranslationRequest(BaseModel):
    word: str
    context: Optional[str] = None  # Surrounding text for better contextual translation
    source_lang: str = "es"
    target_lang: str = "en"


class TranslationResponse(BaseModel):
    word: str
    translation: str
    explanation: Optional[str] = None
    example_sentence_source: Optional[str] = None
    example_sentence_target: Optional[str] = None
    audio_pronunciation_url: Optional[str] = None  # URL to audio file of the word


# --- User Profile/Progress (Future Scope) ---
# class UserProfile(BaseModel):
# user_id: str
# learned_words: List[str]
# practice_history: List[Topic]


class HealthCheck(BaseModel):
    status: str


# --- User Schemas ---
class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None


class UserInDB(User):
    hashed_password: str


class UserCreate(User):
    password: str


# --- Token Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None
