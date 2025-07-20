from lexigrok.translation import schemas
from lexigrok.translation.models import get_translation_from_db


def get_contextual_translation_service(
    request: schemas.TranslationRequest,
) -> schemas.TranslationResponse:
    """Get a contextual translation for a specific word."""
    word_to_translate = request.word.lower()
    translation_data = get_translation_from_db(word_to_translate)

    if not translation_data:
        # Fallback for words not in mock_db - in real app, call translation API
        return schemas.TranslationResponse(
            word=request.word,
            translation=f"'{request.word}' (mock translation - not found)",
            explanation="This is a placeholder translation as the word was not found in the mock database.",
        )
    return translation_data
