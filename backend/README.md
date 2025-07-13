# LexiGrok - Backend

This directory contains the backend API for LexiGrok, built using FastAPI.

## Tech Stack

-   **Framework:** FastAPI
-   **Language:** Python 3.13+
-   **Serving:** Uvicorn
-   **Data Validation:** Pydantic (used by FastAPI)
-   **Dependency Management/Runner:** uv

## Directory Structure

-   `app/`: Main application module.
    -   `main.py`: FastAPI application instance and endpoint definitions.
    -   `schemas.py`: Pydantic models for request/response validation and serialization.
    -   `__init__.py`: Makes `app` a Python package.
-   `pyproject.toml`: Project metadata and dependencies (uses Hatchling build system).
-   `README.md`: This file.
-   `.python-version`: Specifies Python 3.13.0 (useful for tools like `pyenv`).

## Setup and Installation

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2. **Install uv**
    You can follow the [install guide](https://docs.astral.sh/uv/getting-started/installation/). 

3.  **Install Dependencies:**
    The primary dependency is FastAPI. You'll also need Uvicorn to serve the application.
    Using `uv` (if installed, as suggested by `uv.lock` in the project root):
    ```bash
    uv sync
    ```

4.  **Install Pre-commit Hooks:**
    This project uses pre-commit hooks to enforce code quality. To install the hooks, run the following command from the `backend` directory after installing dependencies:
    ```bash
    uv run pre-commit install
    ```

## Running the Development Server

Once dependencies are installed and your virtual environment is active:

-   **From the `backend` directory:**
    ```bash
    ./scripts/dev-server.sh
    ```
The API server will start on `http://localhost:9933`.

## API Overview

The API provides endpoints to support the language learning application. Currently, these are placeholders and include:

-   **`GET /`**: Health check.
-   **`GET /topics/suggested`**: Retrieves a list of suggested practice topics.
    -   Response: `SuggestedTopicsResponse` (list of `Topic` schemas).
-   **`POST /topics/custom`**: (Conceptual) Allows user to define a custom topic.
    -   Request: `topic_name: str`, `description: Optional[str]`
    -   Response: `Topic` schema.
-   **`POST /conversation/message`**: Processes a user's message and returns a bot response.
    -   Request: `UserMessage` schema (includes `session_id`, `text`, `topic_id`).
    -   Response: `BotResponse` schema (includes `session_id`, `response_text`, `suggestion`).
-   **`POST /conversation/suggest`**: Gets a contextual suggestion for the user.
    -   Request: `ConversationSuggestionRequest` schema.
    -   Response: `ConversationSuggestionResponse` schema.
-   **`POST /translate/word`**: Provides contextual translation for a word.
    -   Request: `TranslationRequest` schema (includes `word`, `context`).
    -   Response: `TranslationResponse` schema.

Refer to `backend/app/schemas.py` for detailed request/response models and `backend/app/main.py` for endpoint implementations. Interactive API documentation (Swagger UI) is usually available at `http://localhost:9933/docs` when the server is running.
