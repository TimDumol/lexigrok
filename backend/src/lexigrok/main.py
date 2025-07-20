from fastapi import FastAPI
from pydantic import BaseModel

from lexigrok.auth.router import router as auth_router
from lexigrok.topics.router import router as topics_router
from lexigrok.conversation.router import router as conversation_router
from lexigrok.translation.router import router as translation_router
from lexigrok.upload.router import router as upload_router


class HealthCheck(BaseModel):
    status: str


app = FastAPI(
    title="Language Learning App API",
    description="API for practicing language skills.",
    version="0.1.0",
)

# Include routers
app.include_router(auth_router)
app.include_router(topics_router)
app.include_router(conversation_router)
app.include_router(translation_router)
app.include_router(upload_router)


@app.get("/", response_model=HealthCheck, tags=["General"])
async def root():
    """Health check endpoint."""
    return HealthCheck(status="OK: Language Learning API is running!")
