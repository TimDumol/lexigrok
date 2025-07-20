from pydantic import BaseModel


class TranslationRequest(BaseModel):
    word: str
    context: str | None = None  # Surrounding text for better contextual translation
    source_lang: str = "es"
    target_lang: str = "en"


class TranslationResponse(BaseModel):
    word: str
    translation: str
    explanation: str | None = None
    example_sentence_source: str | None = None
    example_sentence_target: str | None = None
    audio_pronunciation_url: str | None = None  # URL to audio file of the word
