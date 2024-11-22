# Current Implementation Features

## Core Functionality
- Secure token storage using AsyncStorage
- A complete registration flow 
- Loading states for authentication
- Automatic token restoration on app launch
- Protected routes based on authentication state
- A basic home screen with logout functionality

## App Behavior
- Checks for an existing token on launch
- Shows a loading spinner while checking authentication state
- Directs users to either:
  - Login/register flow
  - Home screen
- Persists authentication across app restarts
- Handles logout properly
    

## Testing Instructions

1. Backend Setup
   - Ensure your backend server is running locally or deployed
   - Verify the API endpoints are accessible

2. Configuration
   - Open src/auth/authService.ts
   - Update API_URL constant to match your backend URL
   - For local testing use: http://localhost:3000 (iOS) or http://10.0.2.2:3000 (Android)

3. Testing Authentication Flows
   - Launch the app
   - Test Registration:
     - Fill out registration form with valid data
     - Verify successful registration redirects to home screen
     - Check for proper error handling with invalid data
   - Test Login:
     - Use registered credentials to log in
     - Verify successful login redirects to home screen
     - Verify error messages for invalid credentials

4. Token Persistence
   - Log in to the app
   - Force close the app completely
   - Relaunch the app
   - Verify you're automatically logged in
   - Check AsyncStorage for saved token

5. Logout Testing
   - Navigate to home screen
   - Press logout button
   - Verify redirect to login screen
   - Relaunch app to confirm logged out state persists
   - Verify token is removed from AsyncStorage

6. Error Cases
   - Test offline behavior
   - Test invalid token scenarios
   - Verify proper error messages display
