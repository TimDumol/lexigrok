# Global database connection and session management
from sqlmodel import Session, create_engine

sqlite_file_name = "test.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)


def get_session():
    with Session(engine) as session:
        yield session


fake_users_db = {}

# Mock data that was previously in main.py
mock_topics_db = [
    {
        "id": "topic_food",
        "name": "Ordering food at a restaurant",
        "description": "Practice common phrases for dining out.",
    },
    {
        "id": "topic_directions",
        "name": "Asking for directions",
        "description": "Learn how to ask for and understand directions.",
    },
    {
        "id": "topic_shopping",
        "name": "Shopping for clothes",
        "description": "Practice vocabulary related to clothes and shopping.",
    },
    {
        "id": "topic_pharmacy",
        "name": "At the pharmacy",
        "description": "Discuss symptoms and medications at a pharmacy.",
    },
]

mock_translations_db = {
    "hola": {
        "word": "hola",
        "translation": "hello",
        "explanation": "A common Spanish greeting.",
        "example_sentence_source": "Hola, ¿cómo estás?",
        "example_sentence_target": "Hello, how are you?",
    },
    "adiós": {
        "word": "adiós",
        "translation": "goodbye",
        "explanation": "A common Spanish farewell.",
    },
    "gracias": {
        "word": "gracias",
        "translation": "thank you",
        "explanation": "Expressing gratitude.",
    },
    "pastillas": {
        "word": "pastillas",
        "translation": "pills, tablets",
        "explanation": "Solid forms of medication.",
        "example_sentence_source": "Necesito unas pastillas para el dolor.",
        "example_sentence_target": "I need some pills for the pain.",
    },
    "jarabe": {
        "word": "jarabe",
        "translation": "syrup",
        "explanation": "Liquid medication.",
        "example_sentence_source": "Prefiero el jarabe para la tos.",
        "example_sentence_target": "I prefer syrup for the cough.",
    },
}
