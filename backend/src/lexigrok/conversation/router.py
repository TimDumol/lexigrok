from fastapi import APIRouter, Depends

from lexigrok.conversation import schemas
from lexigrok.auth.dependencies import get_current_active_user
from lexigrok.auth.schemas import UserInDB
from lexigrok.conversation.service import (
    process_user_message_service,
    get_conversation_suggestion_service,
)

router = APIRouter(
    prefix="/conversation",
    tags=["conversation"],
)


@router.post("/message", response_model=schemas.BotResponse)
async def post_user_message(
    message: schemas.UserMessage,
    current_user: UserInDB = Depends(get_current_active_user),
):
    """Process a user's message and get a bot response."""
    return process_user_message_service(message)


@router.post("/suggest", response_model=schemas.ConversationSuggestionResponse)
async def get_conversation_suggestion(
    request: schemas.ConversationSuggestionRequest,
    current_user: UserInDB = Depends(get_current_active_user),
):
    """Get a contextual suggestion for what the user could say next."""
    return get_conversation_suggestion_service(request)
