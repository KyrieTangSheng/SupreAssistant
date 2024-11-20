# SUPRE ASSISTANT app

## Overview

An intelligent application designed to help users manage their time and schedules through natural language interaction with an AI assistant.

## Core Features

### User Data Management
- **Events**: Create, Read, Update, Delete
- **Notes**: Create, Read, Update, Delete

### AI Assistant
- Natural language chat interface
- Personalized 1:1 AI chatbot per user
- Contextual memory of user's events, notes, and chat history
- Powered by Large Language Model APIs
- Implements Retrieval Augmented Generation (RAG)

## Installation

1. **Install dependencies**
   ```bash
   npm run setup
   ```
2. **Build the project**
   ```bash
   npm run build
   ```

3. **Start the application**
   ```bash
   npm start
   ```

4. **Development mode**
   ```bash
   npm run dev
   ```

## Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t supre-assistant.
   ```

2. **Run the Docker container**
   ```bash
   docker run -d -p 3000:3000 --env-file .env supre-assistant
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
