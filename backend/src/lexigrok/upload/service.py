from lexigrok.upload import schemas
from lexigrok.storage import Storage


def get_presigned_url_service(
    file_name: str, storage: Storage
) -> schemas.PresignedUrlResponse:
    """Generate a presigned URL for file upload."""
    # In a real app, you'd want to sanitize the filename and add user-specific prefixes.
    # For example, to prevent overwrites and organize files.
    # object_name = f"user-uploads/{session_id}/{uuid.uuid4()}-{file_name}"
    object_name = f"images/{file_name}"  # Basic example
    url = storage.get_presigned_url(object_name)
    return schemas.PresignedUrlResponse(url=url, object_name=object_name)
