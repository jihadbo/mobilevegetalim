import React, { Component, useState, useEffect }  from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity, LogBox } from 'react-native';
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
        height: 70,
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

export default function AddBonPlan ({ navigation }) {

    const [shop, setShop] = useState("");
    const [reduction, setReduction] = useState("");
    const [photo, setPhoto] = useState("");
    const [link, setLink] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const storeData = async (value) => {
        await AsyncStorage.setItem('@token', value)
    }
    async function handlesubmit() {
        await axios.post('http://20.8.119.103:8080/connexionuser', { email: email, password: password}, {header: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json'}})
        .then(async res => {
          storeData(res.data.token);
          navigation.navigate('Profile')
        }).catch((error) => {
            navigation.navigate('SignIn')
          });
    }
    return (
            <View style={styles.logs}>
            <Text style={styles.text1}>Ajouter un Bon Plan</Text>
            <TextInput style={styles.input2} placeholder="Name" value={shop} onChangeText={setShop}/>
            <TextInput style={styles.input} multiline={true} placeholder="Description" value={description} onChangeText={setDescription}/>
            <TextInput style={styles.input2} placeholder="Prix" value={price} onChangeText={setPrice}/>
            <TextInput style={styles.input2} keyboardType="numeric" placeholder="Réduction (%)" value={reduction} onChangeText={setReduction}/>
            <TextInput style={styles.input2} placeholder="Photo" value={photo} onChangeText={setPhoto}/>
            <TextInput style={styles.input2} placeholder="Lien" value={link} onChangeText={setLink}/>
            <TouchableOpacity style={styles.button}>
              <Text style={{color: "#fff"}}>Publier</Text>
            </TouchableOpacity>
        </View>
    );
}
