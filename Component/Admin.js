import React, { Component, useState, useEffect }  from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity, LogBox } from 'react-native'
import axios from 'axios';
import { Table, Row, Rows } from 'react-native-table-component';

export default function Admin ({ navigation }) {

    const tableHead = ['Utilisateur', 'Date de naissance', 'Points', 'Date de création']
    const tableData = [
      ['Jules87', '12/01/1995', '15', '13/09/2022'],
      ['Mimi-Lilly', '30/04/1991', '10', '01/10/2022'],
      ['Adrien92', '14/09/2002', '22', '19/09/2022'],
      ['RomainM', '03/01/2000', '6', '30/11/2022']
    ]

    const tableHeadRecipes = ['ID', 'Durée (min)', 'Note', "Date d'ajout"]
    const tableDataRecipes = [
      ['25', '45', '4.6', '13/04/2022'],
      ['46', '25', '3.9', '10/07/2022'],
      ['12', '30', '3.6', '09/10/2022'],
      ['89', '15', '4.2', '02/01/2022']
    ]

    const tableHeadPlans = ['ID', 'Revendeur', 'Achats', "Date d'ajout"]
    const tableDataPlans = [
      ['35', 'Moulinex', '12', '01/07/2022'],
      ['3', 'Amazon', '23', '31/04/2022'],
      ['18', 'Lidl', '36', '02/01/2022'],
      ['26', 'Carrefour', '14', '19/10/2022']
    ]

    const tableHeadShop = ['ID', 'Boutique', 'Utilisations', "Date d'expiration"]
    const tableDataShop = [
      ['24', 'Biocoop', '22', '09/12/2022'],
      ['67', 'Naturalia', '13', '19/10/2022'],
      ['12', 'La Vie Claire', '16', '07/01/2022'],
      ['21', 'Natureo', '39', '14/01/2022']
    ]

    return (
      <View style={styles.container}>
      <ScrollView>
          <Text style={styles.text1}>Utilisateurs</Text>
          <Table borderStyle={{borderWidth: 2, borderColor: '#8ECF6F'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} textStyle={styles.text}/>
          </Table>
          <Text style={styles.text2}>Reçettes</Text>
          <Table borderStyle={{borderWidth: 2, borderColor: '#FF7A61'}}>
          <Row data={tableHeadRecipes} style={styles.head2} textStyle={styles.text}/>
          <Rows data={tableDataRecipes} textStyle={styles.text}/>
          </Table>
          <Text style={styles.text2}>Bons Plans</Text>
          <Table borderStyle={{borderWidth: 2, borderColor: '#8ECF6F'}}>
          <Row data={tableHeadPlans} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableDataPlans} textStyle={styles.text}/>
          </Table>
          <Text style={styles.text2}>Boutique</Text>
          <Table borderStyle={{borderWidth: 2, borderColor: '#FF7A61'}}>
          <Row data={tableHeadShop} style={styles.head2} textStyle={styles.text}/>
          <Rows data={tableDataShop} textStyle={styles.text}/>
          </Table>
      </ScrollView>
      </View>

    );
}

const styles = StyleSheet.create({
      text1: {
        fontSize: 22,
        marginLeft: 10,
        marginBottom: 20,
        color: '#252527',
      },
      container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
      },
      head: {
        height: 60,
        backgroundColor: '#EFFFE7'
      },
      text: {
        margin: 6
      },
      text2: {
        fontSize: 22,
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 20,
        color: '#252527',
      },
      container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
      },
      head2: {
        height: 50,
        backgroundColor: '#FFD3CB'
      },
      text: {
        margin: 6
      }
})
