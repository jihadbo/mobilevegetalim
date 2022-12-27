import React, { Component, useState, useEffect }  from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity } from 'react-native'

function TapBar({navigation}) {
    return (<View style={styles.top}>
      <TouchableOpacity onPress={() => navigation.navigate('Conversion')} style={styles.profileButton}>
        <Image
        style={{width: 30, height: 30}}
        source={{uri:'https://www.citypng.com/public/uploads/small/11663778115jz3pmhao8azwk5bnorhav9skgqsrptxel8tveqrc8xx6kg0zxzcslqsvm3mmlubfg3vkcd7nxwlw4v0ypcvfirv39s9qqbyhfu2g.png'}}
        />
      </TouchableOpacity>
      <Text style={styles.topText}>Veget'Alim</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.profileButton}>
        <Image
        style={{width: 30, height: 30}}
        source={{uri:'https://icon-library.com/images/white-profile-icon/white-profile-icon-6.jpg'}}
        />
      </TouchableOpacity>
    </View>)
  }
  export default TapBar;


const styles = StyleSheet.create({
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
    buttonbottom: {
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
    top: {
      paddingTop : 35,
      paddingEnd : 20,
      paddingStart : 20,
      flex: 0.1,
      backgroundColor: '#8ECF6F',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'right',
      flexDirection: "row"
    },
    topText: {
      color: '#fff',
      fontSize: 22,
    },
    profileButton: {
      textAlign: 'right',
      margin: 10
    },
    recettes: {
      alignItems: 'center',
      fontSize: 50,
      flex: 0.8,
    },
    recettesText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: "#515151"
    },
    bottom: {
      flex: 0.1,
      justifyContent: 'space-evenly',
      flexDirection:'row',
    }
  })
  