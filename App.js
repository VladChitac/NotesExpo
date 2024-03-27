import React, { useEffect, useState } from 'react';
import Intro from './app/screens/Intro';
import { StyleSheet, Text, View, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteScreen from './app/screens/NoteScreen';

export default function App() {
  // const [user, setUser] = useState({})
  // const findUser = async () => {
  //   const result = await AsyncStorage.getItem('user')
  //   setUser(JSON.parse(result))
  //   console.log(result)
  // }
  // useEffect(() => {
  //   findUser()
  // }, [])

  return <NoteScreen />

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
