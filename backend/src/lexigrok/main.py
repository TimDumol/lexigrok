import time
from fastapi import FastAPI
from fastapi import HTTPException, Depends
from typing import Optional

from lexigrok import schemas  # Use relative import for schemas
from lexigrok.storage import MinioStorage, Storage

app = FastAPI(
    title="Language Learning App API",
    description="API for practicing language skills.",
    version="0.1.0",
)


def get_storage():
    return MinioStorage()


# --- Mock Data / Placeholder Logic ---
mock_topics_db = [
    schemas.Topic(
        id="topic_food",
        name="Ordering food at a restaurant",
        description="Practice common phrases for dining out.",
    ),
    schemas.Topic(
        id="topic_directions",
        name="Asking for directions",
        description="Learn how to ask for and understand directions.",
    ),
    schemas.Topic(
        id="topic_shopping",
        name="Shopping for clothes",
        description="Practice vocabulary related to clothes and shopping.",
    ),
    schemas.Topic(
        id="topic_pharmacy",
        name="At the pharmacy",
        description="Discuss symptoms and medications at a pharmacy.",
    ),
]

mock_translations_db = {
    "hola": schemas.TranslationResponse(
        word="hola",
        translation="hello",
        explanation="A common Spanish greeting.",
        example_sentence_source="Hola, ¿cómo estás?",
        example_sentence_target="Hello, how are you?",
    ),
    "adiós": schemas.TranslationResponse(
        word="adiós", translation="goodbye", explanation="A common Spanish farewell."
    ),
    "gracias": schemas.TranslationResponse(
        word="gracias", translation="thank you", explanation="Expressing gratitude."
    ),
    "pastillas": schemas.TranslationResponse(
        word="pastillas",
        translation="pills, tablets",
        explanation="Solid forms of medication.",
        example_sentence_source="Necesito unas pastillas para el dolor.",
        example_sentence_target="I need some pills for the pain.",
    ),
    "jarabe": schemas.TranslationResponse(
        word="jarabe",
        translation="syrup",
        explanation="Liquid medication.",
        example_sentence_source="Prefiero el jarabe para la tos.",
        example_sentence_target="I prefer syrup for the cough.",
    ),
}

# --- API Endpoints ---


@app.get("/", response_model=schemas.HealthCheck, tags=["General"])
async def root():
    """Health check endpoint."""
    return schemas.HealthCheck(status="OK: Language Learning API is running!")


# --- Topic Endpoints ---
@app.get(
    "/topics/suggested", response_model=schemas.SuggestedTopicsResponse, tags=["Topics"]
)
async def get_suggested_topics():
    """
    Retrieve a list of suggested topics for practice.
    """
    # In a real app, this could be personalized or fetched from a database.
    return schemas.SuggestedTopicsResponse(topics=mock_topics_db)


@app.get(
    "/topics/suggestions",
    response_model=schemas.TopicSuggestionResponse,
    tags=["Topics"],
)
async def get_topic_suggestions(q: str):
    """
    Get topic suggestions based on a query.
    """
    # In a real app, this would call an external API to get suggestions.
    # For now, we'll just return some mock data.
    mock_suggestions = [
        schemas.Topic(
            id="suggestion_1",
            name=f"{q} basics",
            description=f"Learn the basics of {q}",
        ),
        schemas.Topic(
            id="suggestion_2",
            name=f"Advanced {q}",
            description=f"Master advanced {q} concepts",
        ),
        schemas.Topic(
            id="suggestion_3",
            name=f"{q} for travelers",
            description=f"Essential {q} phrases for travelers",
        ),
    ]
    return schemas.TopicSuggestionResponse(suggestions=mock_suggestions)


@app.post("/topics/custom", response_model=schemas.Topic, tags=["Topics"])
async def create_custom_topic(topic_name: str, description: Optional[str] = None):
    """
    Allows a user to define a custom topic (basic version).
    In reality, this might just influence the conversation start.
    """
    new_id = f"custom_{topic_name.lower().replace(' ', '_')}"
    custom_topic = schemas.Topic(id=new_id, name=topic_name, description=description)
    # Potentially save this or use it to steer the AI. For now, just return it.
    # mock_topics_db.append(custom_topic) # If we want to add to suggestions
    return custom_topic


# --- Conversation Endpoints ---
@app.post(
    "/conversation/message", response_model=schemas.BotResponse, tags=["Conversation"]
)
async def post_user_message(message: schemas.UserMessage):
    """
    Process a user's message (text or transcribed voice) and get a bot response.
    This is where the core language model interaction would happen.
    """
    # Updated placeholder logic to check for image
    if message.topic_id == "image-practice" and message.imageUrl:
        # If it's an image practice session, the bot's response should be about the image
        # A real implementation would use a multimodal model (like GPT-4 Vision)
        # to analyze the image and the user's text.
        bot_text = f"Analizando la imagen y tu descripción: '{message.text}'. ¡Buen trabajo! ¿Qué más ves?"
        suggestion = "Describe el fondo de la imagen."
    else:
        # Standard topic-based response
        bot_text = f"Bot processed: '{message.text}'"
        if message.topic_id:
            bot_text += f" (on topic: {message.topic_id})"

        suggestion = (
            "Puedes preguntarme sobre el tiempo."  # "You can ask me about the weather."
        )
        if "pharmacy" in (message.topic_id or ""):
            suggestion = "¿Necesitas algo más de la farmacia?"
        elif "food" in (message.topic_id or ""):
            suggestion = "¿Qué tipo de comida te gusta?"

    session_id = message.session_id or f"session_{int(time.time())}"

    return schemas.BotResponse(
        session_id=session_id, response_text=bot_text, suggestion=suggestion
    )


@app.post(
    "/conversation/suggest",
    response_model=schemas.ConversationSuggestionResponse,
    tags=["Conversation"],
)
async def get_conversation_suggestion(request: schemas.ConversationSuggestionRequest):
    """
    Get a contextual suggestion for what the user could say next.
    """
    # Placeholder logic
    # In a real app, this would use the conversation history and topic.
    if request.current_topic_id == "topic_pharmacy":
        suggestion = "Podrías decir: 'Me duele la cabeza.'"
    elif request.current_topic_id == "topic_food":
        suggestion = "Intenta preguntar: '¿Cuál es la especialidad de la casa?'"
    else:
        suggestion = "Puedes decir: 'Háblame más sobre eso.'"
    return schemas.ConversationSuggestionResponse(suggestion=suggestion)


# --- Translation Endpoint ---
@app.post(
    "/translate/word", response_model=schemas.TranslationResponse, tags=["Translation"]
)
async def get_contextual_translation(request: schemas.TranslationRequest):
    """
    Get a contextual translation for a specific word.
    """
    word_to_translate = request.word.lower()
    translation_data = mock_translations_db.get(word_to_translate)

    if not translation_data:
        # Fallback for words not in mock_db - in real app, call translation API
        return schemas.TranslationResponse(
            word=request.word,
            translation=f"'{request.word}' (mock translation - not found)",
            explanation="This is a placeholder translation as the word was not found in the mock database.",
        )
    return translation_data


# --- Speech-to-Text (Conceptual - actual STT would be more complex) ---
# @app.post("/speech/transcribe", tags=["Speech"])
# async def transcribe_audio(audio_file: UploadFile = File(...)):
# """
#     Conceptual endpoint for transcribing audio to text.
#     Requires a full STT engine integration.
# """
# # In a real app:
# # 1. Save/process audio_file.
# # 2. Send to STT service (e.g., Google Speech-to-Text, OpenAI Whisper).
# # 3. Return transcription.
# contents = await audio_file.read()
# return {"filename": audio_file.filename, "transcription": "This is a mock transcription."}


# --- Image Upload Endpoint ---
@app.get("/upload/image", response_model=schemas.PresignedUrlResponse, tags=["Upload"])
async def get_presigned_url_for_image(
    file_name: str, storage: Storage = Depends(get_storage)
):
    """
    Get a presigned URL to upload an image file to the storage backend.
    """
    # In a real app, you'd want to sanitize the filename and add user-specific prefixes.
    # For example, to prevent overwrites and organize files.
    # object_name = f"user-uploads/{session_id}/{uuid.uuid4()}-{file_name}"
    object_name = f"images/{file_name}"  # Basic example
    try:
        url = storage.get_presigned_url(object_name)
        return schemas.PresignedUrlResponse(url=url, object_name=object_name)
    except Exception as e:
        # Log the exception details in a real app
        print(f"Error generating presigned URL: {e}")
        raise HTTPException(status_code=500, detail="Could not generate upload URL.")
