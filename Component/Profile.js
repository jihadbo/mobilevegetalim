import React, { useState, Component } from 'react'
import { StyleSheet, View, FlatList, Button, Text, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity, ScrollViewBase } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import AllRecette from './AllRecette';
import { render } from 'react-dom';

export default class Home extends Component {
    constructor(props) {
      super(props);
      this.state = { token : '', email : "", password : "********", birthdate: "", idrecette : [] , recettefav : []};
    }
    async getToken() {
      const values = await AsyncStorage.getItem('@token')
      console.log(values);
      this.setState({token : values});
      this.getData();
    }
    async getData() {
      let tester = [];
      console.log("jihad\n");
        await axios.get('http://20.8.119.103:8080/infouser/' + this.state.token, {header: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json'}})
        .then(res => {
          console.log(res.data);
          if (res.data.recettefav)
            this.setState({idrecette : res.data.recettefav.split(";"), email : res.data.email, birthdate : res.data.birthday})
          else {
            this.setState({email : res.data.email, birthdate : res.data.birthday})
          }
        }).catch((error) => {
        })
        this.state.idrecette.map(async (value) => {
          console.log(value);
            if (value != "") {
                console.log(value);
              await axios.post('http://20.8.119.103:8080/FiltreRecette', { filtre: "id",  valfiltre: value}, {header: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json'}})
              .then(res => {
                if (res.data.recettes){ 
                  tester.push(res.data.recettes[0]);
                  this.setState({recettefav : tester})
                }
              })
            }
          })
    }
    componentDidMount() {
      this.getToken();
    }
    render() {
    return (
      <ScrollView>
        <View style={styles.yM}>
          <Text style={styles.yProfile}>YOUR PROFILE</Text>
          <Text style={styles.mDetail}>My Details</Text>
        </View>
        <View style={styles.topA}>
          <View style={styles.top}>
            <Image
              style={styles.logo}
              source={{
                uri: "https://ekoiki.fr/wp-content/uploads/2021/04/home-01.png",
              }}
            />
            <Text style={styles.textI}>
              {this.state.email}
            </Text>
            <Text style={styles.input} value={this.state.email}>{this.state.email}</Text>
            <Text style={styles.input2} value={this.state.password}>{this.state.password}</Text>
            <Text style={styles.input2} value={this.state.birthdate}>{this.state.birthdate}</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ModifProfile', {email : this.state.email, birthdate : this.state.birthdate})} style={styles.buttonconfirm}>
            <Text style={{color: "#38CA40"}}>Changes Informations</Text>
          </TouchableOpacity>
          <Text style={styles.recettefav}>VOS RECETTES FAVORITES</Text>
          {this.state.recettefav.map((item, index) => <View style={{
            flexDirection: "row",
            paddingLeft : 30,
            marginLeft : 30,
            marginBottom : 30,
            marginRight : 30,
            borderWidth : 1,
            borderRadius : 20
          }}><TouchableOpacity onPress={() => this.props.navigation.navigate('Recettes', item.id)}><Image style={styles.tinyLogo}
          source={{uri : item.image}}/></TouchableOpacity><Text style={styles.yM} key={index}>{item.name}</Text><Icon name="delete" size={25} /></View>)}
          </View>
          <TouchableOpacity onPress={async () =>  {
              await AsyncStorage.removeItem('@token')
              this.props.navigation.navigate('SignIn')
            }} style={styles.buttons}>
            <Text style={{color: "#D32D35"}}>LOG OUT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );}
  }

const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: '#f8f8f8',
    },
    tinyLogo: {
      width: 100,
      height: 70,
      marginBottom : 10,
      marginTop : 10
    },
    recettefav: {
      fontSize: 20,
      marginTop : 30,
      marginBottom: 30,
      color: '#1D2D51',
      fontWeight: 'bold',
    },
    header: {
      alignItems: 'center',
      backgroundColor: '#fff',
      height: 75,
      flex: 0.10,
      borderBottomWidth: 0.5,
      borderBottomColor: '#bbb',
    },
    body: {
      flex: 0.90,
    },
    li: {
      width: 330,
      backgroundColor: "#fcfcfc",
    },
    text: {
      marginTop: 37,
      fontSize: 22,
      fontWeight: 'bold',
      fontStyle: 'italic',
      color: '#252527',
    },
    text1: {
      fontSize: 22,
      marginTop: 37,
      color: '#252527',
    },
    yM: {
      alignItems: "flex-start",
      flex: 1,
      marginTop: 30,
      marginLeft: 40
    },
    yProfile: {
      fontSize: 20,
      color: '#1D2D51',
      fontWeight: 'bold',
    },
    mDetail: {
      fontSize: 17,
      color: '#9ba9cc',
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
    },
    logs: {
      flex: 1,
      alignItems: "center"
    },
    info: {
      flex: 1,
      flexDirection: "row",
      color: "#3287b8",
      marginBottom: 15,
    },
    topA: {
      alignItems: 'center',
      marginTop: 25,
    },
    top: {
      width: "90%",
      height: "auto",
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: "#f8f8f8",
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
    logo: {
      width: 200,
      marginTop: 25,
      height: 200,
      borderRadius: 150,
      borderWidth: 1,
      borderColor: "#555"
    },
    signC: {
      color: "#326ed5",
    },
    textT: {
      marginTop: 30,
      fontSize: 22,
      fontWeight: 'bold',
      color: '#252527',
    },
    textI: {
      fontSize: 18,
      marginTop: 15,
      color: '#252527',
      marginBottom: 15
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
    buttonSS: {
      width: 145,
      height: 30,
      backgroundColor: '#fff',
      borderRadius: 15,
      borderWidth: 1,
      marginBottom: 10,
      borderColor: "rgb(184, 31, 31)",
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttons: {
      width: 100,
      height: 30,
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      borderWidth: 1,
      marginTop: 10,
      borderColor: "#D32D35",
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
    buttonconfirm: {
      width: 140,
      height: 30,
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      borderWidth: 1,
      marginTop: 19,
  
      borderColor: "#38CA40",
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
    datePickerStyle: {
      width: 230,
    },
  })