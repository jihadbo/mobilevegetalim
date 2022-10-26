import React, { useState, Component } from 'react'
import { StyleSheet, View, FlatList, Button, Text, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity, ScrollViewBase } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import AllRecette from './AllRecette';
import { render } from 'react-dom';
import {getStatusBarHeight} from "react-native-status-bar-height";

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
      console.log(this.props.route.params.remise);
    //   this.getToken();
    }
    render() {
    return (
        <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.center}>
            <Text style={styles.boutique}>Selectionner</Text>
          </View>
          <Text style={styles.yProfile}>{'\n'}Voulez vous confirmer le choix de ce bon d'achat ?{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
          <View style={styles.confirm}>
            <Image
              style={{width: 300, height: 100}}
              source={{uri:'https://www.lacolleraye.fr/wp-content/uploads/Logo-Biocoop.png'}}
            />
            <Text style={styles.yProfile}>{'\n'} -{this.props.route.params.remise}% sur tous la articles en échange de {this.props.route.params.remise * 10} points{'\n'}</Text>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Confirmed', {remise : this.props.route.params.remise})}} style={styles.buttonConfirm}>
              <Text style={{color: "#FFFFFF"}}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );}
  }

const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: '#f8f8f8',
    },
    container : {
            paddingTop: getStatusBarHeight(),
          },
    center : {
              marginTop : -40,
              marginBottom: 15,
              justifyContent: 'center',
              alignItems: 'center',
          },
    row : {
            padding : 20
          },
      buttonConfirm: {
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
confirm: {
            justifyContent: 'center',
            alignItems: 'center',
          },
            boutique: {
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#1D2D51',
    fontWeight: 'bold',
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
