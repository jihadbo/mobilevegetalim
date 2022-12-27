import React, { useState, Component } from 'react'
import { StyleSheet, View, FlatList, Button, Text, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity, ScrollViewBase } from 'react-native'

export default class Points extends Component {
    constructor(props) {
      super(props);
    };
    componentDidMount() {
      console.log(this.props);
    }
    render() {
        return (
            <View style={styles.main}>
              <View style={styles.top}>
              <Image style={{width: 220, height: 220}}
                source={{uri: 'https://www.iconsdb.com/icons/preview/green/sad-xxl.png'}}
              />
              </View>
              <View style={styles.bottom}>
                <Text style={{textAlign: 'center',fontSize: 25}}>Vous n'avez malheureusement pas assez de points pour ce bon. Vous possédez : </Text>
                <Text style={{textAlign: 'center',fontSize: 30, fontWeight: "bold", color: "#FF3333"}}>{this.props.route.params.pointpos}</Text>
                <Text style={{textAlign: 'center',fontSize: 25}}> points, il vous manque donc : </Text>
                <Text style={{textAlign: 'center',fontSize: 30, fontWeight: "bold", color: "#2C8B0F"}}>{this.props.route.params.point}</Text>
                <Text style={{textAlign: 'center',fontSize: 25}}> points pour atteindre votre objectif.</Text>
                <Text style={{textAlign: 'center',fontSize: 25}}>{'\n'}{'\n'}Continuez comme ça !</Text>
              </View>
            </View>
      )
    }
  }

const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: '#f8f8f8',
    },
    top : {
      marginTop: 60,
      flex: 0.3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottom : {
      marginTop: 70,
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 15,
      marginRight: 15,
    },
  })
