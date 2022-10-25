import React, { Component, useState, useEffect }  from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity, LogBox } from 'react-native';
import axios from 'axios';
import CustomMultiPicker from "react-native-multiple-select-list";

export default function Calories ({ navigation }) {

    const userList = {
      "267":"Pain (100g)",
      "20":"Tomates (1 unité/100g)                   ",
      "128":"Steak (200g)",
      "134":"Pâtes (400g)",
      "244":"Frites (500g)",
      "410":"Avocat (1 unité/200g)",
      "516":"Riz (400g)",
      "117":"Mayonnaise (30g)",
      "29":"Ketchup (30g)",
      }

      const [kcal, setKcal] = useState(0);

    return (
        <View style={styles.logs}>
          <View style={styles.header}>
            <Text style={styles.text}>Total KCal : {kcal} </Text>
          </View>
          <View>
            <CustomMultiPicker
            options={userList}
            search={true} // should show search bar?
            multiple={true} //
            placeholder={"Search"}
            placeholderTextColor={'#757575'}
            returnValue={"value"} // label or value
            callback={(res)=> {
              let calo = 0;
              res.map((value) => {
                if (value !== undefined) {
                  calo += parseInt(value)
                }
              })
              setKcal(calo)
            }} // callback, array of selected items
            rowBackgroundColor={"#eee"}
            rowHeight={50}
            rowRadius={9}
            iconColor={"#8ECF6F"}
            iconSize={30}
            selectedIconName={"ios-checkmark-circle-outline"}
            unselectedIconName={"ios-radio-button-off-outline"}
            scrollViewHeight={130}
            />
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
      logs: {
        flex: 1,
        alignItems: "center"
      },
      text: {
        justifyContent : "center",
        alignItems: "center",
        fontSize : 22,
      },
      header: {
        margin: 9
      },
})
