import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-datepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getStatusBarHeight} from "react-native-status-bar-height";
import Icon from "react-native-dynamic-vector-icons";
import StarReview from 'react-native-star-review'

// export default function ModifProfile ({ navigation, route }) {
export default class ModifProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {noterecette: 0, recette : [], ingredients : [], preparation: [], commentaires : [], comments : [
          {id : 1, user : "jihad", comment : "good"},
          {id : 2, user : "rayan", comment : "bad"},
          {id : 3, user : "so", comment : "maybe"}
        ]};
    }
  // let comments = [
  //   {id : 1, user : "jihad", comment : "good"},
  //   {id : 2, user : "rayan", comment : "bad"},
  //   {id : 3, user : "so", comment : "maybe"}
  // ]

  DoStars(stars) {
    let container = []
    for (let index = 1; index < 6; index++) {
      let starType = "star";
      if (index > stars) {
        starType = "staro";
      }
      container.push(
          <Icon
            key={index}
            name={starType}
            size={16}
            type="AntDesign"
            color={"#ffa114"}
          />
      );
    }
    return container;
  } 

  DoCommentaire() {
    let recettes = [];
    let ingredients = [];
    let preparation = [];
    let noterecettes = 0;
    this.state.recette.ingredients.split(';').map((value) => {
        ingredients.push(value);
    });
    this.state.recette.preparation.split('/').map((value) => {
        preparation.push(value);
    });
    let com = this.state.recette.commentaires.split(';');
    com.map((value) => {
        let test = value.split('/');
        recettes.push({name : test[0], note : test[1], com : test[2]});
        noterecettes += parseInt(test[1]);
    })
    noterecettes /= com.length;
    // console.log(this.state.recette.image);
    this.setState({noterecette: noterecettes, preparation : preparation, ingredients : ingredients, commentaires : recettes})
}

async GetRecette(id) {
    axios.post('http://20.8.119.103:8080/FiltreRecette/' ,{ filtre: "id",  "valfiltre": id}, {header: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json'}})
    .then(res => {
        if (res.data.recettes) {
            this.setState({recette : res.data.recettes[0]});
            this.DoCommentaire();
        } else {
            this.setState({recette : []});
        }
    }).catch((error) => {
    });
}
componentDidMount () {
    this.GetRecette(this.props.route.params);
}
render(){
    return (
      <ScrollView style={styles.container}>
      <View style={styles.row}>
        <View style={styles.center}>
          <Text style={styles.recipesName}>{this.state.recette.name}{'\n'}</Text>
          <Image
            style={{width: '60%', height: 200, marginBottom : 20}}
            source={{uri: this.state.recette.image}}
          />
        </View>
        <StarReview reviews={this.state.commentaires.length} ratings={this.state.noterecette}/>
        <Text style={styles.yProfile}>Ingredients : </Text>
        {this.state.ingredients.map((value, index) => 
        <Text style={styles.ingredients} key={index}>- {value}</Text>
          
        )}
        <Text style={styles.yProfile}>Steps : </Text>
        {this.state.preparation.map((value, index) => 
        <Text style={styles.ingredients} key={index}>{index + 1} - {value}</Text>
          
        )}
        <View style={styles.yProfileComment}>
        <Text style={styles.yProfile}>Comments</Text>
        {this.state.commentaires.map((item,index) => 
            <View style={{border: "solid",
            borderWidth: "2px",
            borderRadius: "21px",
            borderColor: "black",
            padding : "3%",
            marginBottom : "3%"
            }} key={index}>
            <View style={{flexDirection: "row", marginBottom: 10}}>
              <Text> {item.name} </Text>
              <View style={{
                flexDirection: "row",
                marginLeft : 20,
              }}>
              {this.DoStars(item.note)}
              </View>
              </View>
              <Text> {item.com}{'\n'} </Text>
            </View>
        )}
      </View>
      </View>
    </ScrollView>
          );}
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  recipesName: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#1D2D51',
    fontWeight: 'bold',
  },
  ingredients: {
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#1D2D51',
    marginBottom : 10
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
  listContainerStyle : {
    marginTop : 0
  },
  listItemContainerStyle : {
    borderLeftWidth : 1,
    borderRightWidth : 1,
    borderColor : '#cbd2d9'
  },
  titleStyle : {
    backgroundColor : 'red'
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
    marginBottom : 20,
    marginTop: 30
  },
  yProfileComment : {
    fontSize: 20,
    color: '#1D2D51',
    fontWeight: 'bold',
    marginBottom : 20,
    paddingBottom: 30
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
    marginTop: 15,
  },
  top: {
    width: "90%",
    height: "70%",
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 10,
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
    width: "85%",
    marginTop: 25,
    height: 200,
    borderWidth: 0,
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

    borderColor: "#368BE7",
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
