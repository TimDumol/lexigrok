from pydantic import BaseModel


class PresignedUrlResponse(BaseModel):
    url: str
    object_name: str
