# LexiGrok - Language Learning Application

LexiGrok is a web-based language learning application designed to help users practice and improve their language skills (initially Spanish) through interactive conversations on topics of their choice.

## Project Overview

This project aims to provide a platform where language learners can:
- Choose or define topics for practice (e.g., ordering at a pharmacy, discussing hobbies).
- Engage in text-based or spoken conversations with an AI practice partner.
- Receive suggestions and guidance during practice.
- Get contextual translations and explanations for words.

## Tech Stack

The project is broadly divided into a frontend and a backend:

-   **Frontend:** React (with Vite and TypeScript), Shadcn UI, TanStack Router, Tailwind CSS
-   **Backend:** FastAPI (Python)

## Directory Structure

The repository is organized as follows:

```
.
├── frontend/  # Contains all frontend React application code
├── backend/   # Contains all backend FastAPI application code
└── README.md  # This file
```

## Getting Started

### With Docker

The easiest way to get the application running locally is with Docker.

1.  **Prerequisites:**
    -   [Docker](httpshttps://docs.docker.com/get-docker/) installed on your machine.
    -   [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.

2.  **Running the application:**
    -   Clone the repository.
    -   Navigate to the root of the project.
    -   Run the following command:
        ```bash
        docker-compose up --build
        ```
    -   The frontend will be available at `http://localhost:5173`.
    -   The backend will be available at `http://localhost:8000`.
    -   The Minio console will be available at `http://localhost:9001`.

### Without Docker

To get the application running locally, you will need to set up and run both the frontend and backend services independently.

1.  **Frontend Setup:**
    -   Navigate to the `frontend/` directory.
    -   Follow the instructions in `frontend/README.md` to install dependencies and start the development server.

2.  **Backend Setup:**
    -   Navigate to the `backend/` directory.
    -   Follow the instructions in `backend/README.md` to set up the Python environment, install dependencies, and start the API server.

## Contributing

(Details about contributing to the project can be added here later, such as coding standards, pull request process, etc.)

### Pre-commit Hooks

This project uses pre-commit hooks to enforce code quality and consistency. The hooks are configured in `.pre-commit-config.yaml` and will automatically run checks on every commit.

To use the pre-commit hooks, you need to have `pre-commit` installed. Follow the backend setup instructions to install the necessary development dependencies. Once installed, the hooks will be active.

The following checks are performed:
- `ruff format`: Formats Python code.
- `ruff check --fix`: Lints Python code and automatically fixes issues.
- `eslint`: Lints and fixes frontend code.

## License

(License information can be added here. For now, assuming it might be under a common open-source license like MIT, or specify if otherwise.)
The project currently has a `LICENSE` file at the root, which should be consulted for specific terms.
