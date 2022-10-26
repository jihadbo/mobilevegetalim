import React, { Component, useState, useEffect }  from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity, LogBox } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    logs: {
        flex: 1,
        alignItems: "center"
      },
      text1: {
        fontSize: 22,
        marginTop: 37,
        color: '#252527',
      },
      input: {
        height: 40,
        width: 250,
        marginTop: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#918c8c',
      },
      input2: {
        height: 40,
        width: 250,
        marginTop: 15,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#918c8c',
      },
      info: {
        flexDirection: "row",
        color: "#3287b8",
        marginBottom: 35,
      },
      signC: {
        color: "#326ed5",
      },
      button: {
        width: 160,
        height: 30,
        backgroundColor: '#8ECF6F',
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 10,
        borderColor: "#777",
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        elevation: 6,
      },
})

export default function AdminSignIn ({ navigation }) {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const storeData = async (value) => {
        await AsyncStorage.setItem('@token', value)
    }

    return (
            <View style={styles.logs}>
          <Text style={styles.text1}>Admin</Text>
          <TextInput style={styles.input} placeholder="Email *" value={email} onChangeText={setEmail}/>
          <TextInput style={styles.input2} secureTextEntry={true} placeholder="Password *" value={password} onChangeText={setPassword}/>
          <TouchableOpacity onPress={() => navigation.navigate('Admin')} style={styles.button}>
            <Text style={{color: "#fff"}}>SIGN IN</Text>
          </TouchableOpacity>
        </View>);
}
