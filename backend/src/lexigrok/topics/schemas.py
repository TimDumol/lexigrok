from pydantic import BaseModel


class Topic(BaseModel):
    id: str
    name: str
    description: str | None = None


class SuggestedTopicsResponse(BaseModel):
    topics: list[Topic]


class TopicSuggestionResponse(BaseModel):
    suggestions: list[Topic]
