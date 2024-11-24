# AI Time Management Assistant App API Documentation

## Overview

This document outlines the API design for the **AI Time Management Assistant App**. It covers the available endpoints, their methods, request parameters, request bodies, and expected responses. The APIs are structured to support user authentication, event management, note management, and real-time chat functionalities.

## Base URL 
```
https://api.yourapp.com/v1
```

## Authentication

### Register a New User [DONE]

- **Endpoint:** `/auth/register`
- **Method:** `POST`
- **Description:** Registers a new user.

#### Request Body

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Response

- **201 Created**

```json
{
  "message": "User registered successfully.",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  },
  "token": "jwt-token-string"
}
```

- **400 Bad Request**

```json
{
  "error": "Validation error message."
}
```

### User Login [DONE]

- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a JWT token.

#### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

#### Response

- **200 OK**

```json
{
  "message": "Login successful.",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  },
  "token": "jwt-token-string"
}
```

- **401 Unauthorized**

```json
{
  "error": "Invalid email or password."
}
```

### Refresh Token [TODO]

- **Endpoint:** `/auth/refresh`
- **Method:** `POST`
- **Description:** Refreshes the JWT token.

#### Headers

```
Authorization: Bearer <refresh-token>
```

#### Response

- **200 OK**

```json
{
  "token": "new-jwt-token-string"
}
```

- **401 Unauthorized**

```json
{
  "error": "Invalid or expired token."
}
```

## User Management

### Get User Profile [TODO]

- **Endpoint:** `/users/profile`
- **Method:** `GET`
- **Description:** Retrieves the authenticated user's profile.

#### Headers

```
Authorization: Bearer <jwt-token>
```

#### Response

- **200 OK**

```json
{
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

- **401 Unauthorized**

```json
{
  "error": "Authentication required."
}
```

### Update User Profile [TODO]

- **Endpoint:** `/users/profile`
- **Method:** `PUT`
- **Description:** Updates the authenticated user's profile.

#### Headers

```
Authorization: Bearer <jwt-token>
```

#### Request Body

```json
{
  "username": "string",
  "email": "string",
  "password": "string" // Optional
}
```

#### Response

- **200 OK**

```json
{
  "message": "Profile updated successfully.",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "updatedAt": "timestamp"
  }
}
```

- **400 Bad Request**

```json
{
  "error": "Validation error message."
}
```

- **401 Unauthorized**

```json
{
  "error": "Authentication required."
}
```

### Delete User Account [TODO]

- **Endpoint:** `/users/profile`
- **Method:** `DELETE`
- **Description:** Deletes the authenticated user's account.

#### Headers

```
Authorization: Bearer <jwt-token>
```

#### Response

- **200 OK**

```json
{
  "message": "User account deleted successfully."
}
```

- **401 Unauthorized**

```json
{
  "error": "Authentication required."
}
```

## Event Management

### Create an Event [DONE]

- **Endpoint:** `/events`
- **Method:** `POST`
- **Description:** Creates a new event.

#### Headers

```
Authorization: Bearer <jwt-token>
```

#### Request Body

```json
{
  "title": "string",
  "description": "string",
  "startTime": "ISO8601 timestamp",
  "endTime": "ISO8601 timestamp",
  "location": "string" // Optional
}
```

#### Response

- **201 Created**

```json
{
  "message": "Event created successfully.",
  "event": {
    "id": "string",
    "title": "string",
    "description": "string",
    "startTime": "ISO8601 timestamp",
    "endTime": "ISO8601 timestamp",
    "location": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

- **400 Bad Request**

```json
{
  "error": "Validation error message."
}
```

- **401 Unauthorized**

```json
{
  "error": "Authentication required."
}
```

### Get All Events [DONE]

- **Endpoint:** `/events`
- **Method:** `GET`
- **Description:** Retrieves all events for the authenticated user.

#### Headers

```
Authorization: Bearer <jwt-token>
```

#### Query Parameters

- `startDate` (optional): ISO8601 timestamp to filter events starting from this date.
- `endDate` (optional): ISO8601 timestamp to filter events up to this date.

#### Response

- **200 OK**

```json
{
  "events": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "startTime": "ISO8601 timestamp",
      "endTime": "ISO8601 timestamp",
      "location": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    // More events...
  ]
}
```

- **401 Unauthorized**

```json
{
  "error": "Authentication required."
}
```

### Get Single Event [DONE]

- **Endpoint:** `/events/{eventId}`
- **Method:** `GET`
- **Description:** Retrieves a specific event by ID.

#### Headers

```
Authorization: Bearer <jwt-token>
```

#### Path Parameters

- `eventId` (string): ID of the event to retrieve.

#### Response

- **200 OK**

```json
{
  "event": {
    "id": "string",
    "title": "string",
    "description": "string",
    "startTime": "ISO8601 timestamp",
    "endTime": "ISO8601 timestamp",
    "location": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

- **404 Not Found**

```json
{
  "error": "Event not found."
}
```

- **401 Unauthorized**

```json
{
  "error": "Authentication required."
}
```

### Update an Event [DONE]

- **Endpoint:** `/events/{eventId}`
- **Method:** `PUT`
- **Description:** Updates a specific event by ID.

#### Headers

```
Authorization: Bearer <jwt-token>
```

#### Path Parameters

- `eventId` (string): ID of the event to update.

#### Request Body

```json
{
  "title": "string" // Optional
  "description": "string" // Optional
  "startTime": "ISO8601 timestamp" // Optional
  "endTime": "ISO8601 timestamp" // Optional
  "location": "string" // Optional
}
```

#### Response

- **200 OK**

```json
{
  "message": "Event updated successfully.",
  "event": {
    "id": "string",
    "title": "string",
    "description": "string",
    "startTime": "ISO8601 timestamp",
    "endTime": "ISO8601 timestamp",
    "location": "string",
    "updatedAt": "timestamp"
  }
}
```

- **400 Bad Request**

```json
{
  "error": "Validation error message."
}
```

- **404 Not Found**

```json
{
  "error": "Event not found."
}
```

- **401 Unauthorized**

```json
{
  "error": "Authentication required."
}
```

### Delete an Event [DONE]

- **Endpoint:** `/events/{eventId}`
- **Method:** `DELETE`
- **Description:** Deletes a specific event by ID.

#### Headers

```
Authorization: Bearer <jwt-token>
```

#### Path Parameters

- `eventId` (string): ID of the event to delete.

#### Response

- **200 OK**

```json
{
  "message": "Event deleted successfully."
}
```

- **404 Not Found**

```json
{
  "error": "Event not found."
}
```

- **401 Unauthorized**

```json
{
  "error": "Authentication required."
}
```

## Note Management [DONE]

### Create a Note [DONE]

- **Endpoint:** `/notes`
- **Method:** `POST`
- **Description:** Creates a new note.

#### Headers

```
Authorization: Bearer <jwt-token>
```

#### Request Body

```json
{
  "title": "string",
  "content": "string"
}
```

#### Response

- **201 Created**

```json
{
  "message": "Note created successfully.",
  "note": {
    "id": "string",
    "title": "string",
    "content": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

- **400 Bad Request**

```json
{
  "error": "Validation error message."
}
```

- **401 Unauthorized**

```json
{
  "error": "Authentication required."
}
```

### Get All Notes [DONE]

- **Endpoint:** `/notes`
- **Method:** `GET`
- **Description:** Retrieves all notes for the authenticated user.

#### Headers

```
Authorization: Bearer <jwt-token>
```

#### Response

- **200 OK**

```json
{
  "notes": [
    {
      "id": "string",
      "title": "string",
      "content": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    // More notes...
  ]
}
```

- **401 Unauthorized**

```json
{
  "error": "Authentication required."
}
```

### Get Single Note [DONE]

- **Endpoint:** `/notes/{noteId}`
- **Method:** `GET`
- **Description:** Retrieves a specific note by ID.

#### Headers

```
Authorization: Bearer <jwt-token>
```

#### Path Parameters

- `noteId` (string): ID of the note to retrieve.

#### Response

- **200 OK**

```json
{
  "note": {
    "id": "string",
    "title": "string",
    "content": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

- **404 Not Found**

```json
{
  "error": "Note not found."
}
```

- **401 Unauthorized**

```json
{
  "error": "Authentication required."
}
```

### Update a Note [DONE]

- **Endpoint:** `/notes/{noteId}`
- **Method:** `PUT`
- **Description:** Updates a specific note by ID.

#### Headers

```
Authorization: Bearer <jwt-token>
```

#### Path Parameters

- `noteId` (string): ID of the note to update.

#### Request Body

```json
{
  "title": "string", // Optional
  "content": "string" // Optional
}
```

#### Response

- **200 OK**

```json
{
  "message": "Note updated successfully.",
  "note": {
    "id": "string",
    "title": "string",
    "content": "string",
    "updatedAt": "timestamp"
  }
}
```

- **400 Bad Request**

```json
{
  "error": "Validation error message."
}
```

- **404 Not Found**

```json
{
  "error": "Note not found."
}
```

- **401 Unauthorized**

```json
{
  "error": "Authentication required."
}
```

### Delete a Note [DONE]

- **Endpoint:** `/notes/{noteId}`
- **Method:** `DELETE`
- **Description:** Deletes a specific note by ID.

#### Headers

```
Authorization: Bearer <jwt-token>
```

#### Path Parameters

- `noteId` (string): ID of the note to delete.

#### Response

- **200 OK**

```json
{
  "message": "Note deleted successfully."
}
```

- **404 Not Found**

```json
{
  "error": "Note not found."
}
```

- **401 Unauthorized**

```json
{
  "error": "Authentication required."
}
```

## Real-time Chat (WebSocket) [DONE]

### Overview

The application uses WebSockets (via Socket.io) to facilitate real-time chat between users and the AI assistant. Below are the primary events and their payloads.

### Connect to Chat

- **Event:** `connect`
- **Description:** Establishes a WebSocket connection.

#### Payload

None.

#### Response

- **Event:** `connected`
- **Payload:**

```json
{
  "message": "WebSocket connection established.",
  "userId": "string"
}
```

### Send a Message

- **Event:** `send_message`
- **Description:** Sends a message from the user to the AI assistant.

#### Payload

```json
{
  "message": "string"
}
```

#### Response

- **Event:** `receive_message`
- **Payload:**

```json
{
  "sender": "user" | "ai",
  "message": "string",
  "timestamp": "timestamp"
}
```

### Receive AI Response

- **Event:** `receive_message`
- **Description:** Receives a message from the AI assistant.

#### Payload

```json
{
  "sender": "ai",
  "message": "string",
  "timestamp": "timestamp"
}
```

### Disconnect from Chat

- **Event:** `disconnect`
- **Description:** Terminates the WebSocket connection.

#### Payload

None.

#### Response

- **Event:** `disconnected`
- **Payload:**

```json
{
  "message": "WebSocket connection terminated.",
  "userId": "string"
}
```

## Error Handling

All API responses for errors will follow a consistent structure to help clients handle errors gracefully.

### Error Response Structure

```json
{
  "error": "Error message detailing what went wrong."
}
```

## Authentication

All protected routes require a valid JWT token. Include the token in the `Authorization` header as follows:

```
Authorization: Bearer <jwt-token>
```

Ensure that tokens are securely stored and transmitted over HTTPS to protect user data.

## Rate Limiting

To prevent abuse, the API implements rate limiting. Users are limited to a certain number of requests per minute. If the limit is exceeded, the API will respond with a `429 Too Many Requests` status code.

## Pagination

For endpoints that return lists of resources (e.g., `/events`, `/notes`), pagination can be implemented using query parameters:

- `page` (integer): The page number to retrieve.
- `limit` (integer): The number of items per page.

#### Example

```
GET /events?page=2&limit=10
```

#### Response

```json
{
  "events": [
    // Array of event objects
  ],
  "pagination": {
    "currentPage": 2,
    "totalPages": 5,
    "totalItems": 50
  }
}
```

## Search and Filtering

Implement search and filtering capabilities for resources like events and notes using query parameters.

### Example: Search Events by Title

```
GET /events?search=meeting
```

#### Response

```json
{
  "events": [
    {
      "id": "string",
      "title": "Team Meeting",
      // Other event fields
    },
    // More matching events...
  ]
}
```

## Webhooks

If applicable, set up webhooks to allow external services to be notified of certain events within the application, such as new user registrations or updates to user data.

### Example: User Registration Webhook

- **Endpoint:** Configurable by the user.
- **Method:** `POST`
- **Payload:**

```json
{
  "userId": "string",
  "username": "string",
  "email": "string",
  "registeredAt": "timestamp"
}
```

## Security Considerations

- **HTTPS:** All API endpoints must be accessed over HTTPS to ensure data encryption in transit.
- **Input Validation:** Validate all incoming data to prevent injection attacks and ensure data integrity.
- **CORS:** Configure Cross-Origin Resource Sharing (CORS) to allow only trusted domains to access the API.
- **Content Security Policy (CSP):** Implement CSP headers to mitigate cross-site scripting (XSS) attacks.
- **Rate Limiting:** As mentioned, implement rate limiting to prevent denial-of-service (DoS) attacks.
- **Data Encryption:** Encrypt sensitive data at rest, especially user credentials and personal information.

## Versioning

The API is versioned to manage changes and updates without disrupting existing clients.

- **Current Version:** `v1`
- **URL Structure:** All endpoints are prefixed with the version number, e.g., `/v1/auth/login`

Future versions can be introduced as `/v2/...` to introduce breaking changes or new features.

## Documentation and Testing

- **Swagger/OpenAPI:** Consider using Swagger or OpenAPI for interactive API documentation and testing.
- **Postman Collections:** Provide Postman collections to facilitate easy testing and integration for developers.

## Conclusion

This API design provides a comprehensive structure to support the functionalities of the AI Time Management Assistant App. It ensures scalability, security, and ease of integration for frontend developers and third-party services.
