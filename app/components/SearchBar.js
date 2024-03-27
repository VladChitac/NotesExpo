import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import colors from '../misc/colors'

const SearchBar = ({containerStyle}) => {
  return (
    <View style={[styles.container, {...containerStyle}]}>
      <TextInput style={styles.searchBar} placeholder='Search here...'/>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container:{
        
    },
    searchBar:{
        borderWidth: 0.5,
        borderColor: colors.AQUA,
        height: 40,
        borderRadius: 40,
        paddingLeft: 15,
        fontSize: 20,
    }
})