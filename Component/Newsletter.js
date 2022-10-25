import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity } from 'react-native'

export default function Newsletter() {
  return (<>
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Newsletter
      </Text>
      <Text style={styles.title}>We update all week the content of the website with new recipe</Text>
      <Text style={styles.title2}>Suscibre to our Newsletter</Text>
      <Text style={styles.mail}> E-mail</Text>
      {/* <TextInput style={styles.input}> Put your E-mail Here </TextInput> */}
      <TextInput style={styles.input} placeholder="Email *" />
      <TouchableOpacity
        style={styles.button}
        onPress={""}
      >

        <Text>SUBSCRIBE</Text>
      </TouchableOpacity>
      <Image
        style={styles.logo}
        source={require('./../assets/logo.png')}
      />
    </View>
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'cen',
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 30
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    marginTop: 70,
    width: 100,
    height: 140,
  },
  mail: {
    fontSize: 18,
    fontWeight: 'bold',
    // textAlign: 'center',
    marginTop: 30,
  },
  button: {
    fontSize: 18,
    textAlign: 'center',
    borderColor: 'blue',
    justifyContent: 'center',
    backgroundColor: "#DDDDDD",
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 15,
    width: 200,
    marginTop: 30,
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
  title: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
});