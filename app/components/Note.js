import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import colors from '../misc/colors';

const Note = ({ item, onPress }) => {
  const { title, desc, selectedValue, time } = item;

  const formatDate = ms => {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    
    return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};


  const importantBlocks = (selectedValue) => {
    if (selectedValue === 'Important') return {backgroundColor: colors.RED}
    if (selectedValue === 'Not Important') return {backgroundColor: colors.BLUE}
    if (selectedValue === 'Normal') return {backgroundColor: colors.AQUA}
  }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, importantBlocks(selectedValue)]}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text numberOfLines={3}>{desc}</Text>
        <Text style={{marginTop: 15}}>{formatDate(time)}</Text>
        <Text style={{fontStyle: 'italic', fontWeight:'bold'}} >{selectedValue}</Text>
    </TouchableOpacity>
    );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 10,
    padding: 8,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Note;