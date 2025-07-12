# LexiGrok - Frontend

This directory contains the frontend application for LexiGrok, a web-based language learning platform.

## Tech Stack

The frontend is built using the following technologies:

-   **Framework/Library:** React 19 (with Vite)
-   **Language:** TypeScript
-   **UI Components:** Shadcn UI
-   **Styling:** Tailwind CSS
-   **Routing:** TanStack Router (v1, file-based routing)
-   **Package Manager:** pnpm

## Directory Structure

Key directories and files within `frontend/src/`:

-   `assets/`: Static assets like images and icons.
-   `components/`:
    -   `ui/`: Shadcn UI components (typically auto-generated/installed).
    -   Custom application components (e.g., `PracticeView.tsx`, `TopicSelectionView.tsx`, `MessageBubble.tsx`, etc.).
-   `lib/`: Utility functions, e.g., `utils.ts` for `cn()` from Shadcn.
-   `routes/`: Contains files for TanStack Router's file-based routing.
    -   `__root.tsx`: The root layout component for the entire application.
    -   `index.tsx`: Route for the topic selection page (`/`).
    -   `practice.tsx`: Route for the conversation practice page (`/practice`).
-   `main.tsx`: The main entry point for the React application, initializes the TanStack Router.
-   `routeTree.gen.ts`: Auto-generated file by TanStack Router Vite plugin, defining the route structure. (Do not edit manually).
-   `index.css`: Global styles and Tailwind CSS imports.

## Setup and Installation

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    Ensure you have Node.js and pnpm installed.
    ```bash
    pnpm install
    ```
    This will install all necessary packages defined in `package.json`.

## Running the Development Server

1.  **Start the Vite development server:**
    ```bash
    pnpm dev
    ```
    This command will start the server, typically on `http://localhost:5173`. The application will automatically reload if you make changes to the code.
    The TanStack Router Vite plugin will also generate/update `src/routeTree.gen.ts` when the dev server starts or when files in `src/routes/` change.

## Key Features & Components (Conceptual)

-   **Topic Selection (`TopicSelectionView`, `TopicSelector`, `TopicCard`):**
    -   Allows users to choose a predefined topic or enter a custom one.
    -   Uses Shadcn `Card`, `Input`, and `Button` components.
    -   Navigates to the practice view with the selected topic information.
-   **Practice View (`PracticeView`):**
    -   The main interface for conversation practice.
    -   Displays the current topic.
    -   Includes:
        -   `ConversationHistory`: Shows the dialogue using `MessageBubble` components within a `ScrollArea`.
        -   `UserInput`: Handles text and (future) voice input using `Textarea` and `Button`.
        -   `SuggestionPrompt`: Provides contextual suggestions to the user.
        -   `ContextualTranslationPopup`: A `Dialog` to show word translations.
-   **Routing:**
    -   Managed by TanStack Router using a file-based system. Routes are defined by creating `.tsx` files in the `src/routes` directory.
    -   The root layout (`__root.tsx`) provides global navigation and structure.

## Building for Production

To create a production build:
```bash
pnpm build
```
This will generate optimized static assets in the `dist/` directory.

## Linting

To lint the codebase:
```bash
pnpm lint
```
(ESLint configuration is in `eslint.config.js`.)
