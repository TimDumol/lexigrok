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
