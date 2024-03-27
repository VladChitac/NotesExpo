import { StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../misc/colors'
import SearchBar from '../components/SearchBar'
import RoundIconBtn from '../components/RoundIconBtn'
import NodeInputModel from '../components/NodeInputModel'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Note from '../components/Note'

const NoteScreen = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [notes, setNotes] = useState([]);

    const handleOnSubmit = async (title, desc, selectedValue) => {
        const note = {id: Date.now(), title, desc, selectedValue, time: Date.now()}
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    }

    const findNotes = async () => {
        const result = await AsyncStorage.getItem('notes');

        if (result !== null) setNotes(JSON.parse(result))
    }

    useEffect(() => {
        findNotes();
    })

  return (
    <>
        <StatusBar barStyle='dark-content' backgroundColor={colors.AQUA}/>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <Text style={styles.header}>Hello</Text>
            <SearchBar containerStyle={{marginVertical: 20}}/>
            <FlatList
              data={notes}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 15,
              }}              
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Note item={item} />
              )}
            />
            {!notes.length ? (
                <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
                    <Text style={styles.emptyHeader}>Add notes</Text>
                    {/* <RoundIconBtn onPress={() => setModalVisible(true)} style={styles.addBtn} /> */}
                </View>
            ) : null} 
            
        </View>
        </TouchableWithoutFeedback> 
        <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}><RoundIconBtn onPress={() => setModalVisible(true)} style={styles.addBtn} /></View>
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
        alignItems: 'center',
        // justifyContent: 'center',
        position: 'absolute',
        bottom: 50,
    }

})