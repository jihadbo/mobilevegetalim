import React, { Component, useState, useEffect }  from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity } from 'react-native'
import axios from 'axios';
import SearchBar from "react-native-dynamic-search-bar";

export default function AllRecette({navigation}) {
  const [recette, setRecette] = useState([]);
  const [searched, updateSearch] = useState("");
  const [ready, Setready] = useState("none");
  async function getAllRecette() {
    await axios.get('http://20.8.119.103:8080/AllRecette/' , {header: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json'}})
    .then(res => {
      setRecette(res.data.recettes);
      Setready("yes");
    }).catch((error) => {
    });
  }
  if (ready == "none" && recette != undefined && recette.length == 0) {
    getAllRecette();
  }
  function ChangeListSearch (search) {
    if (search != undefined || search != "") {
       axios.post('http://20.8.119.103:8080/FiltreRecette/' ,{ filtre: "name",  "valfiltre": search}, {header: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json'}})
      .then(res => {
        if (res.data.recettes)
          setRecette(res.data.recettes);
        else {
          console.log("jjjjjjjjjj\n");
          setRecette([]);
        }
      }).catch((error) => {
      });
    }
  }
  return(
      <ScrollView>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={(text) => {
        updateSearch(text);
        ChangeListSearch(text);
        }}
        onClearPress={() => {
          Setready("none");
          getAllRecette();
        }}
        value={searched}
      />
        {recette.map((value, index) => 
          <TouchableOpacity onPress={() => navigation.navigate('Recettes', value.id)}>
          <Image style={{
            marginTop: 20,
            marginLeft : 85,
            width: 200,
            height: 200,
            borderRadius : 20
        }} source={{uri : value.image}} key={index}/>
        <TouchableOpacity style={{
            marginLeft : 85,
            marginTop: -50,
            position : 'relative',
            width: 200,
            minHeight : 50,
            paddingTop : 10,
            fontSize : 30,
            borderWidth: 1,
            borderRadius : 20,
            borderColor : 'white',
            backgroundColor : 'white'
        }}>
        <Text style={{fontSize : 20, textAlign: 'center'}} onc>{value.name}</Text></TouchableOpacity>
        </TouchableOpacity>
        )}
      </ScrollView>
    )
  }