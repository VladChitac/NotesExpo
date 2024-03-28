import React, { useEffect, useState } from 'react';
import Intro from './app/screens/Intro';
import { StyleSheet, Text, View, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import NoteScreen from './app/screens/NoteScreen';
import react from 'react';
import NoteDetail from './app/components/NoteDetail';
import NoteProvider from './app/components/context/NoteProvider';

const Stack = createNativeStackNavigator(); 

export default function App() {

  return (
  <NavigationContainer>
    <NoteProvider>
      <Stack.Navigator screenOptions={{headerTitle: '', headerTransparent: true,}}>
        <Stack.Screen component={NoteScreen} name="NoteScreen" />
        <Stack.Screen component={NoteDetail} name="NoteDetail" />
      </Stack.Navigator> 
    </NoteProvider>
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
