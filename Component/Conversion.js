import React, { Component, useState, useEffect }  from 'react';
import { StyleSheet, View, TextInput, Button, Text, Platform, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity } from 'react-native'
import NumericInput from 'react-native-numeric-input'
import RNPickerSelect from 'react-native-picker-select';


const styles = StyleSheet.create({
input: {
    flexDirection: "row",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    flexDirection: "row",
    width: 100,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    paddingTop: 15,
    paddingLeft: 30,
    marginBottom: 20,
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
  test: {
    flexDirection: "row",
  },
  image: {
    flexDirection: "row",
    width: 100,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    resizeMode : 'stretch'
  },
  textconversion: {
    width: 250,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 50,
    paddingLeft: 20,
    textDecorationColor : "black",
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
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  Container: {
      marginLeft: 10,
      marginRight: 10,
      marginTop: 20
  }
});

export default function Conversion({navigation}){
    let equiv = [
        "\nVoici L'equivalent en ingrédients:\ncacao, fécule : 3g\nfarine, semoule : 4 g\n sel, sucre, café : 5 g\n",
        "\nVoici L'equivalent en ingrédients:\nsucre, beurre : 15 g\nfarine, crème fraîche : 12g\n",
        "\nVoici L'equivalent en ingrédients:\nfarine, semoule : 100 g\nriz : 125 g\nsucre : 140 g\n",
        "\nVoici L'equivalent en ingrédients:\nfarine, semoule : 150 g\nriz : 200 g\nsucre : 220 g\n",
        "\nVoici L'equivalent en ingrédients:\nriz : 300 g\nfarine : 220 g\n"
    ];
    const [number1, onChangenumber1] = React.useState(null);
    const [number, onChangeNumber] = React.useState(null);
    const [masse, onChangemasse] = React.useState(null);
    const [masse1, onChangemasse1] = React.useState(null);
    const [equivaut, onChangeequivaut] = React.useState(null);

    return (<View style={styles.Container}>
            <Text >Voici notre table de Conversion :</Text>
            <Text/>
            <Text >Pour Convertir les températures:</Text>
            <Text >Pour convertir de Degré Fahrenheit to Celsius</Text>
            <Text></Text>
            <View style={styles.test}>
                <NumericInput value={number1} onChange={value => onChangenumber1(value)}/>
                <Image
                    source={require("./../assets/change.png")}
                    style={styles.image}
                />
                <Text style={styles.button}>{((number1 - 32) * 5/9).toFixed(2)}</Text>
            </View>
            <Text >Pour convertir de Degré Celsius to Fahrenheit</Text>
            <Text ></Text>
            <View style={styles.test}>
                <NumericInput  value={number} onChange={value => onChangeNumber(value)}/>
                <Image
                        source={require("./../assets/change.png")}
                        style={styles.image}
                    />
                <Text style={styles.button}>{((number * 9/5) + 32).toFixed(1)}</Text>
            </View>
            <Text >Pour Convertir les masses:</Text>
            <Text >Pour convertir de pound to grammes</Text>
            <Text></Text>
            <View style={styles.test}>
                <NumericInput value={masse} onChange={value => onChangemasse(value)}/>
                <Image
                    source={require("./../assets/change.png")}
                    style={styles.image}
                />
                <Text style={styles.button}>{(masse * 453.59).toFixed(2)}</Text>
            </View>
            <Text >Pour convertir de grammes to pound</Text>
            <Text ></Text>
            <View style={styles.test}>
                <NumericInput  value={masse1} onChange={value => onChangemasse1(value)}/>
                <Image
                        source={require("./../assets/change.png")}
                        style={styles.image}
                    />
                <Text style={styles.button}>{(masse1 / 453.59).toFixed(4)}</Text>
            </View>
            <View>
                <Text>Voici des conversion pour vous aider a la cuisine : </Text>
                <Text ></Text>
                <RNPickerSelect
                style={styles}
                onValueChange={(value) => onChangeequivaut(equiv[value])}
                items={[
                    { value: '0', label: '1 cuillère à café ou à thé (0.5 cL)' },
                    { value: '1', label: '1 cuillère à soupe (1.5 cL)' },
                    { value: '2', label: '1 verre à moutarde (15 cL)' },
                    { value: '3', label: '1 grand verre (25 cL)' },
                    { value: '4', label: '1 bol (35 cL)' },
                    ]}
                />
                <Text style={styles.textconversion}>{equivaut}</Text>
            </View>
        </View>
    )
} 
