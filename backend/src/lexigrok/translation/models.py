from lexigrok.translation import schemas
from lexigrok.database import mock_translations_db


def get_translation_from_db(word: str) -> schemas.TranslationResponse | None:
    """Get translation data from the mock database."""
    translation_dict = mock_translations_db.get(word)
    if translation_dict:
        return schemas.TranslationResponse(**translation_dict)
    return None
