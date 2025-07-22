from typing import Any, Dict, List
from openai import OpenAI
from lexigrok.config import settings
from lexigrok.conversation.models import Message
from lexigrok.generation.strategy import GenerationOutput, LLMStrategy

class OpenAIStrategy(LLMStrategy):
    def __init__(self, model: str = "gpt-3.5-turbo"):
        self.client = OpenAI(api_key=settings.openai_api_key)
        self.model = model

    def get_response(
        self, messages: List[Message], temperature: float
    ) -> GenerationOutput:
        chat_completion = self.client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant.",
                },
                *[
                    {
                        "role": "user" if msg.is_user_message else "assistant",
                        "content": msg.text,
                    }
                    for msg in messages
                ],
            ],
            model=self.model,
            temperature=temperature,
        )

        usage = chat_completion.usage
        generation_details: Dict[str, Any] = {
            "strategy": "openai",
            "model": self.model,
        }
        if usage:
            generation_details.update(
                {
                    "prompt_tokens": usage.prompt_tokens,
                    "completion_tokens": usage.completion_tokens,
                    "total_tokens": usage.total_tokens,
                }
            )

        return {
            "text": chat_completion.choices[0].message.content,
            "generation_details": generation_details,
        }
