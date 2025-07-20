import random
from fastapi.exceptions import HTTPException
from sqlmodel import Session

from lexigrok.conversation import schemas
from lexigrok.conversation.models import Conversation, Message


def process_user_message_service(
    message: schemas.UserMessage,
    db: Session,
    user_id: str,
) -> schemas.BotResponse:
    """
    Process a user's message (text or transcribed voice) and get a bot response.
    This is where the core language model interaction would happen.
    """
    if message.session_id:
        conversation = get_conversation(db, int(message.session_id))
        if conversation is None:
            raise HTTPException(status_code=404, detail="Conversation not found")
    else:
        conversation = create_conversation(db, user_id)

    # Store user message
    user_message = schemas.MessageCreate(
        conversation_id=conversation.id,
        is_user_message=True,
        text=message.text,
        audio_url=None,  # Assuming no audio for now
        transcription=None,
    )
    create_message(db, user_message)

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

    # Store bot message
    bot_message = schemas.MessageCreate(
        conversation_id=conversation.id,
        is_user_message=False,
        text=bot_text,
    )
    create_message(db, bot_message)

    return schemas.BotResponse(
        session_id=str(conversation.id), response_text=bot_text, suggestion=suggestion
    )


def get_conversation_suggestion_service(
    request: schemas.ConversationSuggestionRequest,
) -> schemas.ConversationSuggestionResponse:
    """Get a contextual suggestion for what the user could say next."""
    # Placeholder logic
    # In a real app, this would use the conversation history and topic.
    if request.current_topic_id == "topic_pharmacy":
        suggestion = "Podrías decir: 'Me duele la cabeza.'"
    elif request.current_topic_id == "topic_food":
        suggestion = "Intenta preguntar: '¿Cuál es la especialidad de la casa?'"
    else:
        suggestion = "Puedes decir: 'Háblame más sobre eso.'"
    return schemas.ConversationSuggestionResponse(suggestion=suggestion)


def create_conversation(db: Session, user_id: str) -> Conversation:
    conversation = Conversation(user_id=user_id)
    db.add(conversation)
    db.commit()
    db.refresh(conversation)
    return conversation


def get_conversation(db: Session, conversation_id: int) -> Conversation | None:
    return db.get(Conversation, conversation_id)


def create_message(db: Session, message: schemas.MessageCreate) -> Message:
    db_message = Message.model_validate(
        message,
        # TODO: generate a uuid7
        update=dict(id=random.randrange(10**18)),
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message
