import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import React, {useState} from 'react'
import { useHeaderHeight } from '@react-navigation/elements';
import colors from '../misc/colors';
import CheckBtn from './CheckBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from './context/NoteProvider';
import NodeInputModel from './NodeInputModel';

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

const NoteDetail = (props) => {

    const [note, setNote] = useState(props.route.params.note);
    const headerHeight = useHeaderHeight();
    const { setNotes } = useNotes();
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);


    const displayDeleteAlert = () => {
        Alert.alert(
          'Are You Sure!',
          'This action will delete your note permanently!',
          [
            {
              text: 'Delete',
              onPress: deleteNote,
            },
            {
              text: 'No Thanks',
              onPress: () => console.log('no thanks'),
            },
          ],
          {
            cancelable: true,
          }
        );
    };

    const deleteNote = async () => {
        const result = await AsyncStorage.getItem('notes');
        let notes = [];
        if (result !== null) notes = JSON.parse(result);
    
        const newNotes = notes.filter(n => n.id !== note.id);
        setNotes(newNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        props.navigation.goBack();
    };

    const handleUpdate = async (title, desc, selectedValue,time) => {
        const result = await AsyncStorage.getItem('notes');
        let notes = [];
        if (result !== null) notes = JSON.parse(result);
    
        const newNotes = notes.filter(n => {
          if (n.id === note.id) {
            n.title = title;
            n.desc = desc;
            n.selectedValue = selectedValue;
            n.isUpdated = true;
            n.time = time;
    
            setNote(n);
          }
          return n;
        });
    
        setNotes(newNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    };
    const handleOnClose = () => setShowModal(false);
    
    const openEditModal = () => {
        setIsEdit(true);
        setShowModal(true);
    }; 

    return (
        <>
        <ScrollView style={[styles.container, {paddingTop: headerHeight}]} >
            <Text style={styles.time}>
            {note.isUpdated
                ? `Updated At ${formatDate(note.time)}`
                : `Created At ${formatDate(note.time)}`}
            </Text>
            <Text style={styles.title}>{note.title}</Text>
            <Text style={styles.desc}>{note.desc}</Text>
            <Text style={styles.status}>Importance: {note.selectedValue}</Text>

        </ScrollView>
            <View style={styles.btnContainer}>
                <CheckBtn
                antIconName='delete'
                size={30}
                style={{ backgroundColor: colors.RED, marginBottom: 15 }}
                onPress={displayDeleteAlert}
                />
                <CheckBtn antIconName='edit' size={30} onPress={openEditModal}/>
            </View>
            <NodeInputModel
                isEdit={isEdit}
                note={note} 
                onClose={handleOnClose}
                onSubmit={handleUpdate}
                visible={showModal}
            />
            
        </>
    )
}

export default NoteDetail

const styles = StyleSheet.create({
    container:{
        //  flex: 1,
         paddingHorizontal: 15,
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.BLUE
    },
    desc: {
        fontSize: 20,
        opacity: 0.6,
    },
    status:{
        fontStyle: 'italic',
        fontSize: 20
    },
    time: {
        textAlign: 'right',
        fontSize: 13,
        opacity: 0.5,
    },
    btnContainer: {
        position: 'absolute',
        right: 15,
        bottom: 50,
    },
})