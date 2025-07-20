from fastapi import APIRouter, Depends

from lexigrok.translation import schemas
from lexigrok.auth.dependencies import get_current_active_user
from lexigrok.auth.schemas import UserInDB
from lexigrok.translation.service import get_contextual_translation_service

router = APIRouter(
    prefix="/translation",
    tags=["translation"],
)


@router.post("/word", response_model=schemas.TranslationResponse)
async def get_contextual_translation(
    request: schemas.TranslationRequest,
    current_user: UserInDB = Depends(get_current_active_user),
):
    """Get a contextual translation for a specific word."""
    return get_contextual_translation_service(request)
