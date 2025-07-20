from lexigrok.topics import schemas
from lexigrok.topics.models import get_mock_topics


def get_suggested_topics_service() -> schemas.SuggestedTopicsResponse:
    """Get suggested topics for practice."""
    topics = get_mock_topics()
    return schemas.SuggestedTopicsResponse(topics=topics)


def get_topic_suggestions_service(query: str) -> schemas.TopicSuggestionResponse:
    """Get topic suggestions based on a query."""
    # In a real app, this would call an external API to get suggestions.
    mock_suggestions = [
        schemas.Topic(
            id="suggestion_1",
            name=f"{query} basics",
            description=f"Learn the basics of {query}",
        ),
        schemas.Topic(
            id="suggestion_2",
            name=f"Advanced {query}",
            description=f"Master advanced {query} concepts",
        ),
        schemas.Topic(
            id="suggestion_3",
            name=f"{query} for travelers",
            description=f"Essential {query} phrases for travelers",
        ),
    ]
    return schemas.TopicSuggestionResponse(suggestions=mock_suggestions)


def create_custom_topic_service(
    topic_name: str, description: str | None = None
) -> schemas.Topic:
    """Create a custom topic."""
    new_id = f"custom_{topic_name.lower().replace(' ', '_')}"
    return schemas.Topic(id=new_id, name=topic_name, description=description)
