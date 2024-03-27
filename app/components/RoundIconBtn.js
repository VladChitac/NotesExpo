import { StyleSheet, Text, View, Platform } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';

const RoundIconBtn = ({color, style, onPress}) => {
  return (
    <View style={[styles.iconContainer, style]}>
      <Text style={[styles.text, {color: color || 'white'}]}  onPress={onPress}>ADD</Text>
    </View>

  )
}

export default RoundIconBtn

const styles = StyleSheet.create({
  iconContainer:{
    backgroundColor: colors.BLUE,
    padding: 15,
    elevation: 5,
    borderRadius: 40,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  text:{
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 35,
  }
})