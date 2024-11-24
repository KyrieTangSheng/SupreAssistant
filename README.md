# SUPRE ASSISTANT app

## Overview

An intelligent application designed to help users manage their time and schedules through natural language interaction with an AI assistant.

## Core Features

### User Data Management
- **Events**: Create, Read, Update, Delete // DONE
- **Notes**: Create, Read, Update, Delete // TODO

### AI Assistant
- Natural language chat interface // DONE
- Personalized 1:1 AI chatbot per user // DONE
- Contextual memory of user's events, notes, and chat history // DONE, with raw RAG, maybe VectorDB later
- Powered by Large Language Model APIs 
- Implements Retrieval Augmented Generation (RAG) // DONE with raw RAG, maybe VectorDB later
- JSON Structure for AI responses and smooth integration with backend // DONE

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Build and start the backend**
   ```bash
   npm run backend:build
   npm run backend:start
   ```

3. **Start the mobile app**
   NOTE: The mobile app is managed as a separate project due to compatibility issues between @babel/runtime and iOS simulator. While dependencies are managed independently in the mobile folder, you can still execute mobile app commands from the root workspace.

   First, start the Metro bundler:
   ```bash
   npm run mobile:start
   ```

   Then, for iOS:
   ```bash
   npm run mobile:ios
   ```
   
   Or for Android:
   ```bash
   npm run mobile:android
   ```

   Before running ios, you need to install pods:
   ```bash
   cd supreassistant_mobile/ios
   pod install
   ```

4. **BackendDevelopment mode**
   Backend development:
   ```bash
   npm run backend:dev
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

## Environment Setup

1. Copy `.env.example` to create your own `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your actual values:
   - Generate a secure `JWT_SECRET`
   - Add your AI provider API keys
   - Configure other environment-specific values

3. Never commit the `.env` file to version control
