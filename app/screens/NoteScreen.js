import { StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../misc/colors'
import SearchBar from '../components/SearchBar'
import RoundIconBtn from '../components/RoundIconBtn'
import NodeInputModel from '../components/NodeInputModel'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Note from '../components/Note'
import { useNotes } from '../components/context/NoteProvider'
import NotFound from '../components/NotFound'

const reverseData = data => {
    return data.sort((a, b) => {
      const aInt = parseInt(a.time);
      const bInt = parseInt(b.time);
      if (aInt < bInt) return 1;
      if (aInt == bInt) return 0;
      if (aInt > bInt) return -1;
    });
};

const NoteScreen = ({navigation}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const {notes, setNotes, findNotes} = useNotes();
    const [searchQuery, setSearchQuery] = useState('');
    const [resultNotFound, setResultNotFound] = useState(false);

    const handleOnSubmit = async (title, desc, selectedValue) => {
        const note = {id: Date.now(), title, desc, selectedValue, time: Date.now()}
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    }

    const openNote = (note) => {
        navigation.navigate('NoteDetail', {note})
    }

    const reverseNotes = reverseData(notes);

    const handleOnSearchInput = async (text) => {
        setSearchQuery(text);
        if (!text.trim()) {
          setSearchQuery('');
          setResultNotFound(false);
          return await findNotes();
        }
        const filteredNotes = notes.filter(note => {
          if (note.title.toLowerCase().includes(text.toLowerCase())) {
            return note;
          }
        });
    
        if (filteredNotes.length) {
            setNotes([...filteredNotes]);
        } else {
          setResultNotFound(true);
        }
    };

    const handleOnClear = async () => {
        setSearchQuery('');
        setResultNotFound(false);
        await findNotes();
    };



  return (
    <>
        <StatusBar barStyle='dark-content' backgroundColor={colors.AQUA}/>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <Text style={styles.header}>Hello</Text>
            {notes.length ? (
                <SearchBar
                value={searchQuery}
                onChangeText={handleOnSearchInput}
                containerStyle={{ marginVertical: 20 }}
                onClear={handleOnClear}
                />
            ) : null}

            {resultNotFound ? (
                <NotFound />
            ) : (
                <FlatList
                data={reverseNotes}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                    marginBottom: 15,
                }}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <Note onPress={() => openNote(item)} item={item} />
                )}
                />
            )}
            
            {!notes.length ? (
                <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
                    <Text style={styles.emptyHeader}>Add notes</Text>
                </View>
            ) : null} 
            
        </View>
        </TouchableWithoutFeedback> 
        <View style={styles.addBtnStyle}><RoundIconBtn onPress={() => setModalVisible(true)} style={styles.addBtn} /></View>
        <NodeInputModel visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={handleOnSubmit}/>
    </>
  )
}

export default NoteScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 20,
        zIndex: 1,
    },
    header:{
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 50,
    },
    emptyHeaderContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    emptyHeader:{
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 0.2,
    },
    addBtn:{
        flex: 1,
        position: 'absolute',
        bottom: 50,
        // fontFamily: 'Montserrat-Regular'
    },
    addBtnStyle:{
        alignItems: 'center',
        zIndex: 2
    }

})