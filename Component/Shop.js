import React, { useState, Component } from 'react'
import { StyleSheet, View, FlatList, Button, Text, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import TapBar from './TapBar';
import {getStatusBarHeight} from "react-native-status-bar-height";
// import { Icon } from "@rneui/themed";
// import {thumbs-up} from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/FontAwesome';


export default class Shop extends Component {
    constructor(props) {
      super(props);
      this.state = {pressed: false, shop : [{ click: false, click2:false, compteur: 0, img : "https://www.lacolleraye.fr/wp-content/uploads/Logo-Biocoop.png", shop: "Biocoop", reduction : 10, description : "-10% sur tous la articles en échange de 100 points"} , {click: false, click2:false, img : "https://www.lacolleraye.fr/wp-content/uploads/Logo-Biocoop.png", shop: "Biocoop", compteur: 0, reduction : 25, description : "-25% sur tous la articles en échange de 250 points"}, {click: false, click2:false, img : "https://www.lacolleraye.fr/wp-content/uploads/Logo-Biocoop.png", shop: "Biocoop", compteur: 0, reduction : 50, description : "-50% sur tous la articles en échange de 500 points"}]};
    }
    async getToken() {
      const values = await AsyncStorage.getItem('@token')
      console.log(values);
      this.setState({token : values});
      this.getData();
    }
    onButtonPress = () => {
      this.setState(!pressed)
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
    //   this.getToken();
    }
    render() {
    return (
        <ScrollView style={styles.container}>
        <TapBar navigation={this.props.navigation}/>
            <View style={styles.row}>
            <Text>1000 points disponible{'\n'}</Text>
              <View style={styles.center}>
               <Text style={styles.boutique}>Boutique</Text>
             </View>
             {/* <View style={{display : 'grid'}}> */}
             <Text style={styles.yProfile}>Bons disponibles</Text>
             <TouchableOpacity style={{border: "solid",
                    borderWidth: 2,
                    borderRadius: 21,
                    borderColor: "black",
                    width : 120,
                    marginBottom : "2%",
                    marginLeft : 200,
                    padding : "2%",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}><Text>1000 points disponible{'\n'}</Text></TouchableOpacity>
              {/* </View> */}
               {this.state.shop.map((item,i) =>
                <TouchableOpacity key={i} style={{border: "solid",
                borderWidth: 2,
                borderRadius: 21,
                borderColor: "black",
                padding : "3%",
                paddingTop : "12%",
                marginBottom : 10,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
              <Image style={{width: "80%", height: 100}}
                source={{uri: item.img}}
              />
              <Text style={styles.bons}> {'\n'} {item.shop} -{item.reduction}%</Text>
              <Text> {item.description} </Text>
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('Selectionned', {remise : item.reduction})}} style={styles.button}>
                <Text style={{color: "#fff"}}>Séléctionner</Text>
              </TouchableOpacity>
              <Text> {'\n'} {'\n'} </Text>
            </TouchableOpacity>
               )}
          </View> 
        </ScrollView>
    );}
  }

const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: '#f8f8f8',
    },
    row : {
        padding : 20
      },
      center : {
        marginTop : -40,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container : {
        // paddingTop: getStatusBarHeight(),
      },
      box : {
        // backgroundColor: 'blue',
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
        alignItems: "center",
        // marginTop: 0,
      },
      icon: {
        color: "green"
      },
      icon2: {
        color: "red"
      },
      iconalt: {
        color: "black"
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
    code: {
            fontSize: 30,
            color: '#000000',
            fontWeight: 'bold',
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
    boutique: {
        fontSize: 25,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#1D2D51',
        fontWeight: 'bold',
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
    confirm: {
            justifyContent: 'center',
            alignItems: 'center',
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
  })
