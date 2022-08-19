import React, { Component, useState, useEffect }  from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

export default function Home({navigation}) {
    return(
      <View>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.button}>
            <Text style={{color: "#fff"}}>SignIn</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.button}>
            <Text style={{color: "#fff"}}>SignUp</Text>
          </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Conversion')} style={styles.button}>
            <Text style={{color: "#fff"}}>Conversion</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Shop')} style={styles.button}>
            <Text style={{color: "#fff"}}>Shop</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Recettes', '9bd2d33f-a426-4b46-b814-19696f6960e7')} style={styles.button}>
            <Text style={{color: "#fff"}}>Recettes</Text>
          </TouchableOpacity>
      </View>
    )
  }

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
  })