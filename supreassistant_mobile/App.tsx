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
import { NotesScreen } from './src/screens/NotesScreen';
import { CreateNoteScreen } from './src/screens/CreateNoteScreen';
import { NoteDetailsScreen } from './src/screens/NoteDetailScreen';
import { EditNoteScreen } from './src/screens/EditNoteScreen';
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
        <Stack.Screen 
          name="Notes" 
          component={NotesScreen}
          options={{ 
            headerShown: true,
            title: 'Notes'
          }}
        />
        <Stack.Screen 
          name="CreateNote" 
          component={CreateNoteScreen}
          options={{ title: 'Create Note' }}
        />
        <Stack.Screen 
          name="NoteDetails" 
          component={NoteDetailsScreen}
          options={{ title: 'Note Details' }}
        />
        <Stack.Screen 
          name="EditNote" 
          component={EditNoteScreen}
          options={{ title: 'Edit Note' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
