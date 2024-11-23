/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { EventsScreen } from './src/screens/EventsScreen';
import { CompanionScreen } from './src/screens/CompanionScreen';
import { CreateEventScreen } from './src/screens/CreateEventScreen';
import { EventDetailsScreen } from './src/screens/EventDetailsScreen';
import { EditEventScreen } from './src/screens/EditEventScreen';
import { RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Events" 
          component={EventsScreen}
          options={{ 
            headerShown: true,
            title: 'Events'
          }}
        />
        <Stack.Screen 
          name="Companion" 
          component={CompanionScreen}
          options={{ 
            headerShown: true,
            title: 'AI Assistant'
          }}
        />
        <Stack.Screen 
          name="CreateEvent" 
          component={CreateEventScreen}
          options={{ title: 'Create Event' }}
        />
        <Stack.Screen 
          name="EventDetails" 
          component={EventDetailsScreen}
          options={{ title: 'Event Details' }}
        />
        <Stack.Screen 
          name="EditEvent" 
          component={EditEventScreen}
          options={{ title: 'Edit Event' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
