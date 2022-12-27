import React, { useState, Component } from 'react'
import { StyleSheet, View, FlatList, Button, Text, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity, ScrollViewBase } from 'react-native'
import {getStatusBarHeight} from "react-native-status-bar-height";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AccueilBonPlan extends Component {
    constructor(props) {
      super(props);
      this.state = {pressed: false, deals : [{click: false, click2:false, compteur: 0,img : "https://www.pngall.com/wp-content/uploads/7/Blender-PNG-Image-File.png", shop: "Moulinex", reduction : 10, description : "En ce moment le blender GX430 est en réduction sur le site Moulinex.fr", user: "Pedro65", price: "24,99€"},
                            {click: false, click2:false, compteur: 0,img : "https://backend.panzani.fr/app/uploads/2020/03/paniers_associe.png", shop: "Carrefour", reduction : 33, description : "2 paquets de pâtes achetés = 1 offert jusqu'au 03/10/2022", user: "AliceParis", price: "2,99€"}]}};
    componentDidMount() {
      //     await axios.post('http://20.8.119.103:8080/connexionuser', { email: email, password: password}, {header: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json'}})
      //     .then(async res => {
      //       storeData(res.data.token);
      //       navigation.navigate('Profile')
      //     }).catch((error) => {
      //         navigation.navigate('SignIn')
      //       });
      // }
    }
    render() {
        return (
            <View style={styles.row}>
               <FlatList
               data={this.state.deals}
               ListHeaderComponent={
                <View style={styles.center}>
                    <Text style={styles.boutique}>Bons plans</Text>
                </View>
               }
               keyExtractor={(item) => item.id}
               showsVerticalScrollIndicator={false}
                renderItem={({item, index}) =>
                   <View key={item.id} style={{border: "solid",
                       borderRadius: "21px",
                       borderTopWidth: 1,
                       borderBottomWidth: 1,
                       borderColor: "black",
                       padding : "3%",
                       justifyContent: 'center',
                       alignItems: 'center',
                       marginBottom : 50,
                       marginTop: 20
                   }}>
                     <Text style={styles.bons}> {item.shop} {'\n'} </Text>
                     <Text style={styles.bons}>-{item.reduction}% {'\n'}</Text>
                     <Image style={{width: 150, height: 150}}
                       source={{uri: item.img}}
                     />
                     <Text style={styles.bons}> {'\n'} {item.price}{'\n'}</Text>
                     <Text style={styles.desc}> {item.description} </Text>
                     <View style={styles.box}>
                <View style ={
                  {flexDirection : "row",
                padding : 10}
                }>
                <TouchableOpacity
                onPress={() =>  {
                  let array2 = this.state.deals;
                  if (!array2[index].click)
                      array2[index].compteur += 1;
                  array2[index].click = true
                  array2[index].click2 = false
                  this.setState({deals : array2})
                  console.log(this.state.deals)
                  }}>
                <Icon name="thumbs-up" size={30} style={item.click ? styles.icon : styles.iconalt} />
                {/* <Icon name="thumbs-up" size={30} style={[this.state.pressed ? styles.icon : styles.iconalt]} /> */}
                </TouchableOpacity>
                <Text style={{marginTop : 8}}>{item.compteur}</Text>
                <TouchableOpacity
                onPress={() =>  {
                  let array2 = this.state.deals;
                  if (!array2[index].click2)
                      array2[index].compteur -= 1;
                  array2[index].click2 = true
                  array2[index].click = false
                  this.setState({deals : array2})
                  console.log(this.state.deals)
                  }}
                  >
                <Icon name="thumbs-down" size={30} style={item.click2 ? styles.icon2 : styles.iconalt} />
                {/* <Icon name="thumbs-down" size={30} style={[this.state.pressed ? styles.icon2 : styles.iconalt]} /> */}
                </TouchableOpacity>
                </View>
               </View>
                     <TouchableOpacity onPress={() => {this.props.navigation.navigate('Selectionned', {remise : item.reduction})}} style={styles.button}>
                       <Text style={{color: "#8ECF6F"}}>Voir l'offre</Text>
                     </TouchableOpacity>
                     {/* <Rating
                       showRating
                       onFinishRating={this.ratingCompleted}
                       style={{ paddingVertical: 10 }}
                     /> */}
                   </View>
                }
              />
            </View>
      )
    }
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    container : {
        paddingTop: getStatusBarHeight(),
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
    iconalt: {
      marginRight: 10,
      marginLeft : 10,
      color: "black"
    },
    icon: {
      marginRight: 10,
      marginLeft : 10,
      color: "green"
    },
    icon2: {
      marginRight: 10,
      marginLeft : 10,
      color: "red"
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
      backgroundColor: '#F7F7F7',
      borderWidth: 1,
      borderColor: '#8ECF6F',
      borderRadius: 20,
      marginTop: 20,
      marginBottom: 10,
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
