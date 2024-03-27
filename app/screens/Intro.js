import { StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import colors from '../misc/colors'
import RoundIconBtn from '../components/RoundIconBtn';
 


export default function Intro() {

    const [name, setName] = useState(''); 
    const handleOnChangeName = text => setName(text);
    
    const handleSubmit = async () =>{
        const user = { name: name}
        await AsyncStorage.setItem('user', JSON.stringify(user))
    }

    return (
        <>
            <StatusBar hidden />
            <View style={styles.container}>
                <Text style={styles.inputTitle}>Enter your name to continue</Text>
                <TextInput 
                    value={name}
                    onChangeText={handleOnChangeName} 
                    placeholder='Enter your Name' 
                    style={styles.textInput}
                />
                {name.trim().length >= 3 ? <RoundIconBtn antIconName='arrowright' size={40} onPress={handleSubmit}/> : null}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    textInput:{
        borderWidth: 2,
        borderColor: colors.BLUE,
        color: colors.BLUE,
        width: '75%',
        height: 50,
        borderRadius: 10,
        fontSize: 25,
        marginBottom: 15,
    },
    inputTitle:{
        fontSize: 22,
        marginBottom: 5,
        opacity: 0.5,
    }
});