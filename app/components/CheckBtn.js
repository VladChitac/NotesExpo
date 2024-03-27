import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';

const CheckBtn = ({antIconName, size, color, style, onPress}) => {
  return (
    <View style={[styles.iconContainer, style]}>
      <AntDesign 
        name={antIconName} 
        size={size} 
        color={color || 'white'}
        onPress={onPress}
      />
    </View>
  )
}

export default CheckBtn

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: colors.BLUE,
    padding: 15,
    elevation: 5,
    borderRadius: 40,
  }
})
