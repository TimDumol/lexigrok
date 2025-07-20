from fastapi import APIRouter, Depends, HTTPException

from lexigrok.upload import schemas
from lexigrok.auth.dependencies import get_current_active_user
from lexigrok.auth.schemas import UserInDB
from lexigrok.upload.service import get_presigned_url_service
from lexigrok.upload.dependencies import get_storage

router = APIRouter(
    prefix="/upload",
    tags=["upload"],
)


@router.get("/image", response_model=schemas.PresignedUrlResponse)
async def get_presigned_url_for_image(
    file_name: str,
    storage=Depends(get_storage),
    current_user: UserInDB = Depends(get_current_active_user),
):
    """Get a presigned URL to upload an image file to the storage backend."""
    try:
        return get_presigned_url_service(file_name, storage)
    except Exception as e:
        # Log the exception details in a real app
        print(f"Error generating presigned URL: {e}")
        raise HTTPException(status_code=500, detail="Could not generate upload URL.")
