import React, { Component, useState, useEffect }  from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity } from 'react-native'
import DiscordSocialButton from "./ButtonDiscord";
import { GoogleSocialButton } from "react-native-social-buttons";
import DatePicker from 'react-native-datepicker';
import axios from 'axios';
import AsyncStorage from 'react-native-async-storage';

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
      input3: {
        height: 40,
        width: 250,
        marginTop: 5,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#918c8c',
      },datePickerStyle: {
        width: 230,
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
    info: {
        flexDirection: "row",
        color: "#3287b8",
        marginBottom: 35,
    },
    signC: {
        color: "#326ed5",
      },
})

export default function SignUp({ navigation }) {

    const [password, setPassword] = useState("");
    const [confirmedpassword, setConfirmedPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("01-01-2000");
    async function handlesubmit() {
        if (confirmedpassword == password) {
          console.log( email, password, birthdate);
            await axios.post('http://20.8.119.103:8080/createuser', { email: email, password: password,  birthday: birthdate}, {header: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json'}})
            .then(async res => {
              try {
                await AsyncStorage.setItem('token', res.data)
                navigation.navigate('Profile')
              } catch (e) {
                navigation.navigate('SignIn')
              }
            }).catch((error) => {
                navigation.navigate('SignUp')
            });
        } else {
            navigation.navigate('SignUp')
        }
    }
    return (
    <View style={styles.logs}>
           <Text style={styles.text1}>Sign Up</Text>
          <TextInput style={styles.input} placeholder="Email *" value={email} onChangeText={setEmail}/>
           <TextInput style={styles.input2} secureTextEntry={true} placeholder="Password *" value={password} onChangeText={setPassword}/>
           <TextInput style={styles.input3} secureTextEntry={true} placeholder="Confirm password *" value={confirmedpassword} onChangeText={setConfirmedPassword}/>
           <DatePicker
            style={styles.datePickerStyle}
            date={birthdate}
            mode="date"
            placeholder="Birth date"
            format="DD/MM/YYYY"
            minDate="01-01-1900"
            maxDate="01-01-2022"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                right: -2,
                top: 9,
              },
              dateInput: {
                borderColor : "gray",
                alignItems: "flex-start",
                borderBottomWidth: 1,
                height: 40,
                width: 250,
                marginTop: 20,
                marginBottom: 10,
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                borderColor: '#918c8c',
              },
              placeholderText: {
                fontSize: 12,
                color: "gray"
              },
              dateText: {
                fontSize: 17,
              }
            }}
            onDateChange={setBirthdate}
          />
          <TouchableOpacity onPress={() => handlesubmit()} style={styles.button}>
            <Text style={{color: "#fff"}}>SIGN UP</Text>
          </TouchableOpacity>
          <View style={styles.info}>
            <Text>Vous avez un compte ?</Text>
            {/* onPress={navigationRef.navigate('SignIn')} */}
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}><Text style={styles.signC}>Connectez-vous</Text></TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Conversion')} style={styles.button}>
        <Text style={{color: "#fff"}}>Conversion</Text>
      </TouchableOpacity>
        <GoogleSocialButton onPress={() => navigation.navigate('Webview', {url : 'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=260750013099-p1f5oukdqhvc59agmmsvof8ri15k5ga2.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Ftestapivegetalim.westeurope.cloudapp.azure.com%3A8080%2FOauthPage&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&access_type=offline&prompt=consent&flowName=GeneralOAuthFlow'})}/>
          <DiscordSocialButton onPress={() => navigation.navigate('Webview', {url : "https://discord.com/oauth2/authorize?client_id=966021079934042192&redirect_uri=http://testapivegetalim.westeurope.cloudapp.azure.com:8080/OauthPage&response_type=token&scope=email"})}/>
        </View>);
  }
  