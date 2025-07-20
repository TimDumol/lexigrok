from fastapi import APIRouter, Depends

from lexigrok.topics import schemas
from lexigrok.auth.dependencies import get_current_active_user
from lexigrok.auth.schemas import UserInDB
from lexigrok.topics.service import (
    get_suggested_topics_service,
    get_topic_suggestions_service,
    create_custom_topic_service,
)

router = APIRouter(
    prefix="/topics",
    tags=["topics"],
)


@router.get("/suggested", response_model=schemas.SuggestedTopicsResponse)
async def get_suggested_topics(
    current_user: UserInDB = Depends(get_current_active_user),
):
    """Retrieve a list of suggested topics for practice."""
    return get_suggested_topics_service()


@router.get("/suggestions", response_model=schemas.TopicSuggestionResponse)
async def get_topic_suggestions(
    q: str, current_user: UserInDB = Depends(get_current_active_user)
):
    """Get topic suggestions based on a query."""
    return get_topic_suggestions_service(q)


@router.post("/custom", response_model=schemas.Topic)
async def create_custom_topic(
    topic_name: str,
    description: str | None = None,
    current_user: UserInDB = Depends(get_current_active_user),
):
    """Allows a user to define a custom topic."""
    return create_custom_topic_service(topic_name, description)
