from abc import ABC, abstractmethod
from typing import Any, Dict, List, TypedDict

from lexigrok.conversation.models import Message


class GenerationOutput(TypedDict):
    text: str
    generation_details: Dict[str, Any]


class LLMStrategy(ABC):
    @abstractmethod
    def get_response(
        self, messages: List[Message], temperature: float
    ) -> GenerationOutput:
        pass
