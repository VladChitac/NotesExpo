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
  const { title, desc, selectedValue } = item;

  const importance = (selectedValue) => {
    if (selectedValue === 'Normal') return <Text style={{backgroundColor: colors.PINK, borderRadius: 10}}>{selectedValue}</Text>
    if (selectedValue === 'Important') return <Text style={{backgroundColor: colors.RED}}>{selectedValue}</Text>
    if (selectedValue === 'Not Important') return <Text style={{backgroundColor: colors.BLUE}}>{selectedValue}</Text>
  }

  const importantBlocks = (selectedValue) => {
    if (selectedValue === 'Important') return {backgroundColor: colors.RED}
    if (selectedValue === 'Not Important') return {backgroundColor: colors.BLUE}
    if (selectedValue === 'Normal') return {backgroundColor: colors.RED}
  }
  return (
    <View style={[styles.container, importantBlocks(selectedValue)]}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text numberOfLines={3}>{desc}</Text>
        
        <Text>{importance(selectedValue)}</Text>
    </View>
  );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.AQUA,
    width: width / 2 - 10,
    padding: 8,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.LIGHT,
  },
});

export default Note;