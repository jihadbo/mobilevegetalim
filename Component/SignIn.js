import React, { Component, useState, useEffect }  from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity, LogBox } from 'react-native'
import DiscordSocialButton from "./ButtonDiscord";
import { GoogleSocialButton } from "react-native-social-buttons";
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
        width: 250,
        height: 30,
        backgroundColor: '#326ed5',
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 10,
        borderColor: "#777",
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
      },
      buttonC: {
        width: 160,
        height: 30,
        backgroundColor: '#cc0000',
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

export default function SignIn ({ navigation }) {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
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
          <Text style={styles.text1}>Sign In</Text>
          <TextInput style={styles.input} placeholder="Email *" value={email} onChangeText={setEmail}/>
          <TextInput style={styles.input2} secureTextEntry={true} placeholder="Password *" value={password} onChangeText={setPassword}/>
          <TouchableOpacity onPress={handlesubmit} style={styles.button}>
            <Text style={{color: "#fff"}}>SIGN IN</Text>
          </TouchableOpacity>
          <View style={styles.info}>
            <Text>Vous n’avez pas de compte ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={styles.signC}>Inscrivez-vous</Text></TouchableOpacity>
          </View>
          <GoogleSocialButton onPress={() => navigation.navigate('Webview', {url : 'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=260750013099-p1f5oukdqhvc59agmmsvof8ri15k5ga2.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Ftestapivegetalim.westeurope.cloudapp.azure.com%3A8080%2FOauthPage&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&access_type=offline&prompt=consent&flowName=GeneralOAuthFlow'})}/>
          <DiscordSocialButton onPress={() => navigation.navigate('Webview', {url : "https://discord.com/oauth2/authorize?client_id=966021079934042192&redirect_uri=http://testapivegetalim.westeurope.cloudapp.azure.com:8080/OauthPage&response_type=token&scope=email"})}/>
          <TouchableOpacity onPress={() => navigation.navigate('AdminSignIn')} style={styles.buttonC}>
            <Text style={{color: "#fff"}}>ADMIN</Text>
          </TouchableOpacity>
        </View>);
}
