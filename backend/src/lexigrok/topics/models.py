from lexigrok.topics import schemas
from lexigrok.database import mock_topics_db


def get_mock_topics() -> list[schemas.Topic]:
    """Get mock topics from database."""
    return [schemas.Topic(**topic) for topic in mock_topics_db]
