import time

from lexigrok.conversation import schemas


def process_user_message_service(message: schemas.UserMessage) -> schemas.BotResponse:
    """Process a user's message and generate a bot response."""
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
