import React, { Component, useState, useEffect }  from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './Component/SignIn'
import SignUp from "./Component/SignUp"
import MyWebComponent from "./Component/Webview"
import Conversion from "./Component/Conversion"
import Profile from "./Component/Profile"
import Home from './Component/Home'
import ModifProfile from "./Component/ModifProfil"
import AllRecette from './Component/AllRecette.js'
import Recette from './Component/Recette'
import Selectionned from './Component/SelectionnedBonAchat';
import Confirmed from './Component/ConfirmedBonAchat';
import Shop from './Component/Shop';
import AccueilBonPlan from './Component/AccueilBonPlan'
import AddBonPlan from './Component/AddBonPlan'
import Calories from './Component/Calories'
import Newsletter from './Component/Newsletter';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StepByStepModal from './Component/StepByStepModal';
import Quizz from './Component/Quizz';
import { LogBox } from 'react-native';
import AdminSignIn from './Component/AdminSignIn'
import Admin from './Component/Admin'
import Points from './Component/Points'
import TapBar from './Component/TapBar';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Tab = createBottomTabNavigator();
const ShopStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const NewsletterStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="home" component={Home} options={{ headerBackVisible: false ,headerShown :false}}/>
      <HomeStack.Screen name="AddBonPlan" component={AddBonPlan} options={{ headerBackVisible: false }}/>
      <HomeStack.Screen name="Recettes" component={Recette} options={{ headerBackVisible: false }}/>
      <HomeStack.Screen name="AccueilBonPlan" component={AccueilBonPlan} options={{ headerBackVisible: false }}/>
      <HomeStack.Screen name="Calories" component={Calories} options={{ headerBackVisible: false }}/>
      <HomeStack.Screen name="Points" component={Points} options={{ headerBackVisible: false }}/>
      <HomeStack.Screen name="StepByStep" component={StepByStepModal}  options={{ headerBackVisible: false }}/>
      <HomeStack.Screen name="Quizz" component={Quizz}  options={{ headerBackVisible: false }}/>
      <HomeStack.Screen name="Profile" component={Profile}  options={{ headerBackVisible: false }}/>
      <HomeStack.Screen name="SignUp" component={SignUp}  options={{ headerBackVisible: false }}/>
      <HomeStack.Screen name="Conversion" component={Conversion} options={{ headerBackVisible: false }}/>
      <HomeStack.Screen name="ModifProfile" component={ModifProfile} options={{ headerBackVisible: false }}/>
      <HomeStack.Screen name="Webview" component={MyWebComponent} options={{ headerBackVisible: false }}/>
      <HomeStack.Screen name="SignIn" component={SignIn}/>
      <HomeStack.Screen name="AdminSignIn" component={AdminSignIn} options={{ headerBackVisible: false }}/>
      <HomeStack.Screen name="Admin" component={Admin} options={{ headerBackVisible: false }}/>
      <HomeStack.Screen name="Recette" component={AllRecette} options={{ headerBackVisible: false }}/>
    </HomeStack.Navigator>
  );
}

function ShopStackScreen() {
  return (
    <ShopStack.Navigator>
      <ShopStack.Screen name="Shop" component={Shop} options={{ headerBackVisible: false ,headerShown :false}}/>
      <ShopStack.Screen name="Selectionned" component={Selectionned} />
      <ShopStack.Screen name="Confirmed" component={Confirmed} />
      <ShopStack.Screen name="SignIn" component={SignIn}/>
      <ShopStack.Screen name="AdminSignIn" component={AdminSignIn} options={{ headerBackVisible: false }}/>
      <ShopStack.Screen name="Admin" component={Admin} options={{ headerBackVisible: false }}/>
      <ShopStack.Screen name="Recette" component={AllRecette} options={{ headerBackVisible: false }}/>
    </ShopStack.Navigator>
  );
}

function NewsletterStackScreen() {
  return (
    <NewsletterStack.Navigator>
      <NewsletterStack.Screen name="Newsletter" component={Newsletter} options={{ headerBackVisible: false ,headerShown :false}} />
      <NewsletterStack.Screen name="SignIn" component={SignIn}/>
      <NewsletterStack.Screen name="AdminSignIn" component={AdminSignIn} options={{ headerBackVisible: false }}/>
      <NewsletterStack.Screen name="Admin" component={Admin} options={{ headerBackVisible: false }}/>
      <NewsletterStack.Screen name="Recette" component={AllRecette} options={{ headerBackVisible: false }}/>
    </NewsletterStack.Navigator>
  );
}


export default function App() {
      return (
        <>
        <NavigationContainer>
          <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'green',
            headerShown: false
          }}
        >
      <Tab.Screen name="HomeTapBar" component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="ShopTapBar" component={ShopStackScreen}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="NewsletterTapBar" component={NewsletterStackScreen}
        options={{
          tabBarLabel: 'Newsletter',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="email-newsletter" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
        </NavigationContainer>
        </>
      );
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

