# AI Time Management Assistant App

## Overview
An intelligent application designed to help users manage their time and schedules through natural language interaction with an AI assistant.

## Core Features

### User Data Management
- Events (Create, Read, Update, Delete)
- Notes (Create, Read, Update, Delete)

### AI Assistant
- Natural language chat interface
- Personalized 1:1 AI chatbot per user
- Contextual memory of user's events, notes, and chat history
- Powered by Large Language Model APIs
- Implements Retrieval Augmented Generation (RAG)

### Technical Requirements
- JSON-structured data format for LLM integration
- Cloud-based architecture for cross-platform compatibility
- Support for both web and mobile platforms
- Persistent chat history and user data storage

### Integration Requirements
- LLM API integration
- Vector database for RAG implementation
- Cloud database for user data
- Authentication system 

## Technology Stack

### Deployment
- **Docker**
  - Containerization platform for easy deployment and environment consistency.
  - Simplifies the setup process across different development and production environments.
  - Facilitates scalability and efficient resource management.

### Backend
- **Node.js with Express.js**
- **WebSocket support for real-time chat**
- **RESTful API architecture**
- **JWT authentication**
- **SQLite**
  - Lightweight, file-based SQL database for primary data storage.
  - Ideal for managing user data, events, and notes with simplicity and reliability.
- **FAISS (Facebook AI Similarity Search)**
  - Efficient library for vector similarity searches.
  - Utilized for implementing Retrieval Augmented Generation (RAG) functionalities.

### Frontend
- **Web: React.js**
  - Modern React with hooks
  - Progressive Web App (PWA) capabilities
- **Mobile: React Native**
  - Cross-platform (iOS & Android)
  - Shared codebase with web where possible

### Shared Technologies
- **TypeScript** for type safety
- **Redux** or **Context API** for state management
- **Axios** for API calls
- **Socket.io** for real-time communications

## Folder Breakdown

- **src/**: Contains all the source code for the backend.
  
  - **config/**: Configuration files for the application.
    - `db.config.ts`: Database connection settings.
    - `env.config.ts`: Environment variables setup.
    - `logger.config.ts`: Logger configuration.
  
  - **controllers/**: Handle incoming requests and return responses.
    - `auth.controller.ts`: Authentication-related endpoints.
    - `event.controller.ts`: CRUD operations for events.
    - `note.controller.ts`: CRUD operations for notes.
    - `user.controller.ts`: User management endpoints.
  
  - **middlewares/**: Middleware functions for request processing.
    - `auth.middleware.ts`: JWT authentication handling.
    - `error.middleware.ts`: Global error handling.
    - `validation.middleware.ts`: Request data validation.
  
  - **models/**: Data models/schema definitions.
    - `event.model.ts`: Event schema.
    - `note.model.ts`: Note schema.
    - `user.model.ts`: User schema.
  
  - **routes/**: Define API endpoints and route them to controllers.
    - `auth.routes.ts`: Routes for authentication.
    - `event.routes.ts`: Routes for event management.
    - `note.routes.ts`: Routes for note management.
    - `user.routes.ts`: Routes for user management.
  
  - **services/**: Business logic and interactions with models.
    - `auth.service.ts`: Authentication logic.
    - `event.service.ts`: Event-related operations.
    - `note.service.ts`: Note-related operations.
    - `user.service.ts`: User-related operations.
  
  - **sockets/**: WebSocket (Socket.io) related files for real-time features.
    - `chat.socket.ts`: Handling real-time chat functionalities.
  
  - **utils/**: Utility functions and helpers.
    - `jwt.util.ts`: JWT token generation and verification.
    - `logger.util.ts`: Logging utilities.
    - `validation.util.ts`: Data validation utilities.
  
  - `app.ts`: Initializes the Express app, middleware, and routes.
  
  - `server.ts`: Starts the server and sets up WebSocket connections.
  
- **tests/**: Contains all test cases for the application.
  - Organized similarly to the `src/` folder for consistency.
  
- **Root Files**:
  - `.env`: Environment variables.
  - `.gitignore`: Specifies files and folders to ignore in Git.
  - `package.json`: Project dependencies and scripts.
  - `tsconfig.json`: TypeScript configuration.
  - `README.md`: Project documentation.
  - `Dockerfile`: Configuration for Docker containerization.

## Additional Recommendations

- **TypeScript**: Utilize TypeScript for type safety across the backend.
  
- **State Management**: While primarily a frontend concern, ensure that API endpoints are well-designed to support frontend state management solutions like Redux or Context API.
  
- **Real-time Communications**: Implement Socket.io in `sockets/chat.socket.ts` for real-time chat features.
  
- **Security**: Ensure that JWT authentication is securely implemented in `middlewares/auth.middleware.ts` and that sensitive information is stored securely.
  
- **Testing**: Incorporate unit and integration tests within the `tests/` directory to maintain code quality.

This structure should provide a solid foundation for developing a robust and scalable backend for your application.
