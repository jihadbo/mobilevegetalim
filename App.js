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

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: 'green',
      }}
    >
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Shop" component={Shop}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Newsletter" component={Newsletter}
        options={{
          tabBarLabel: 'Newsletter',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="email-newsletter" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
      return (
        <NavigationContainer>
          <Stack.Navigator>
          <Stack.Screen name="home" component={Home, MyTabs} options={{ headerShown: false }} />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
            />
             <Stack.Screen
              name="AdminSignIn"
              component={AdminSignIn}
            />
            <Stack.Screen
              name="Admin"
              component={Admin}
            />
            <Stack.Screen
              name="Recette"
              component={AllRecette}
            />
            <Stack.Screen
              name="AddBonPlan"
              component={AddBonPlan}
            />
            <Stack.Screen
              name="Recettes"
              component={Recette}
            />
            <Stack.Screen
              name="AccueilBonPlan"
              component={AccueilBonPlan}
            />
            <Stack.Screen
              name="Calories"
              component={Calories}
            />
            <Stack.Screen
              name="Points"
              component={Points}
            />
            <Stack.Screen name="StepByStep" component={StepByStepModal} />
          <Stack.Screen name="Quizz" component={Quizz} />
            <Stack.Screen name="Shop" component={Shop} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Selectionned" component={Selectionned} />
              <Stack.Screen name="Confirmed" component={Confirmed} />
            <Stack.Screen name="Conversion" component={Conversion}/>
            <Stack.Screen name="ModifProfile" component={ModifProfile}/>
            <Stack.Screen name="Webview" component={MyWebComponent}/>
            <Stack.Screen name="Newsletter" component={Newsletter} />
          </Stack.Navigator>
        </NavigationContainer>
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
})

// import { StatusBar } from 'expo-status-bar';
// import React, { useState, useEffect } from 'react'
// import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity } from 'react-native'
// import DatePicker from 'react-native-datepicker';
// import { List, ListItem } from 'react-native-elements';
// import {getStatusBarHeight} from "react-native-status-bar-height";

// // import recipes from './recipes';
// // import comments from './comments';
// // import shop from './shop';


// export default function App() {
//   const [password, setPassword] = useState("password");
//   const [confirmedpassword, setConfirmedPassword] = useState("");
//   const [email, setEmail] = useState("test@vegetalim.com");
//   const [birthdate, setBirthdate] = useState("01-01-2000");
//   const [sign, setSign] = useState("Selectionned");

//   const pages = () => {
//     if (sign === "in") {
//       return (
//         <View style={styles.logs}>
//           <Text style={styles.text1}>Sign In</Text>
//           <TextInput style={styles.input} placeholder="Email *" value={email} onChangeText={setEmail}/>
//           <TextInput style={styles.input2} secureTextEntry={true} placeholder="Password *" value={password} onChangeText={setPassword}/>
//           <TouchableOpacity onPress={console.log("test changes")} style={styles.button}>
//             <Text style={{color: "#fff"}}>SIGN IN</Text>
//           </TouchableOpacity>
//           <View style={styles.info}>
//             <Text>Vous n’avez pas de compte ? </Text>
//             <TouchableOpacity onPress={() => {setSign("up")}}><Text style={styles.signC}>Inscrivez-vous</Text></TouchableOpacity>
//           </View>
//           <TouchableOpacity onPress={console.log("test")} style={styles.buttonSS}>
//             <Text style={{color: "rgb(184, 31, 31)"}}>Log in with Google</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     } else if (sign === "up") {
//       return (
//         <View style={styles.logs}>
//           <Text style={styles.text1}>Sign Up</Text>
//           <TextInput style={styles.input} placeholder="Email *" value={email} onChangeText={setEmail}/>
//           <TextInput style={styles.input2} secureTextEntry={true} placeholder="Password *" value={password} onChangeText={setPassword}/>
//           <TextInput style={styles.input3} secureTextEntry={true} placeholder="Confirm password *" value={confirmedpassword} onChangeText={setConfirmedPassword}/>
//           <DatePicker
//             style={styles.datePickerStyle}
//             date={birthdate}
//             mode="date"
//             placeholder="Birth date"
//             format="DD/MM/YYYY"
//             minDate="01-01-1900"
//             maxDate="01-01-2022"
//             confirmBtnText="Confirm"
//             cancelBtnText="Cancel"
//             customStyles={{
//               dateIcon: {
//                 position: 'absolute',
//                 right: -2,
//                 top: 9,
//               },
//               dateInput: {
//                 borderColor : "gray",
//                 alignItems: "flex-start",
//                 borderBottomWidth: 1,
//                 height: 40,
//                 width: 250,
//                 marginTop: 20,
//                 marginBottom: 10,
//                 borderWidth: 1,
//                 padding: 10,
//                 borderRadius: 5,
//                 borderColor: '#918c8c',
//               },
//               placeholderText: {
//                 fontSize: 12,
//                 color: "gray"
//               },
//               dateText: {
//                 fontSize: 17,
//               }
//             }}
//             onDateChange={setBirthdate}
//           />
//           <TouchableOpacity onPress={console.log(birthdate)} style={styles.button}>
//             <Text style={{color: "#fff"}}>SIGN UP</Text>
//           </TouchableOpacity>
//           <View style={styles.info}>
//             <Text>Vous avez un compte ? </Text>
//             <TouchableOpacity onPress={() => {setSign("in")}}><Text style={styles.signC}>Connectez-vous</Text></TouchableOpacity>
//           </View>
//           <TouchableOpacity onPress={console.log("test")} style={styles.buttonSS}>
//             <Text style={{color: "rgb(184, 31, 31)"}}>Log in with Google</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     } else if (sign === "profile") {
//       return (
//         <>
//           <View style={styles.yM}>
//             <Text style={styles.yProfile}>YOUR PROFILE</Text>
//             <Text style={styles.mDetail}>My Details</Text>
//           </View>
//           <View style={styles.topA}>
//             <View style={styles.top}>
//               <Image
//                 style={styles.logo}
//                 source={{
//                   uri: "https://ekoiki.fr/wp-content/uploads/2021/04/home-01.png",
//                 }}
//               />
//               <Text style={styles.textI}>
//                 {email}
//               </Text>
//               <TextInput style={styles.input} placeholder="Edit e-mail" value={email} onChangeText={setEmail}/>
//               <TextInput style={styles.input2} secureTextEntry={true} placeholder="Edit password" value={password} onChangeText={setPassword}/>
//     <DatePicker
//                 style={styles.datePickerStyle}
//                 date={birthdate}
//                 mode="date"
//                 placeholder="Birth date"
//                 format="DD/MM/YYYY"
//                 minDate="01-01-1900"
//                 maxDate="01-01-2022"
//                 confirmBtnText="Confirm"
//                 cancelBtnText="Cancel"
//                 customStyles={{
//                   dateIcon: {
//                     position: 'absolute',
//                     right: -2,
//                     top: 9,
//                   },
//                   dateInput: {
//                     borderColor : "gray",
//                     alignItems: "flex-start",
//                     borderBottomWidth: 1,
//                     height: 40,
//                     width: 250,
//                     marginTop: 20,
//                     marginBottom: 10,
//                     borderWidth: 1,
//                     padding: 10,
//                     borderRadius: 5,
//                     borderColor: '#918c8c',
//                   },
//                   placeholderText: {
//                     fontSize: 12,
//                     color: "gray"
//                   },
//                   dateText: {
//                     fontSize: 17,
//                   }
//                 }}
//                 onDateChange={setBirthdate}
//               />
//             <TouchableOpacity onPress={"confirm"} style={styles.buttonconfirm}>
//               <Text style={{color: "#38CA40"}}>Confirm changes</Text>
//             </TouchableOpacity>
//             </View>
//             <TouchableOpacity onPress={"out"} style={styles.buttons}>
//               <Text style={{color: "#D32D35"}}>LOG OUT</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       );
//     } else if (sign === "Shop") {
//       return (
//         <View style={styles.container}>
//           <View style={styles.row}>
//             <View style={styles.center}>
//               <Text style={styles.boutique}>Boutique</Text>
//             </View>
//             <Text style={styles.yProfile}>Bons disponibles{'\n'}</Text>
//             <FlatList style={{marginTop: 10}}
//               // data={shop}
//               renderItem={({item}) => {return (
//                 <View>
//                   <Image style={{width: "80%", height: 100}}
//                     source={{uri: item.img}}
//                   />
//                   <Text style={styles.bons}> {'\n'} {item.shop} {item.reduction}</Text>
//                   <Text> {item.description} </Text>
//                   <TouchableOpacity onPress={{}} style={styles.button}>
//                     <Text style={{color: "#fff"}}>Séléctionner</Text>
//                   </TouchableOpacity>
//                   <Text> {'\n'} {'\n'} </Text>
//                 </View>
//               )}}
//               keyExtractor={(item) => item.id}
//             />
//           </View>
//         </View>
//       );
//     } else if (sign === "Selectionned") {
//       return (
//         <View style={styles.container}>
//           <View style={styles.row}>
//             <View style={styles.center}>
//               <Text style={styles.boutique}>Confirmation</Text>
//             </View>
//             <Text style={styles.yProfile}>{'\n'}Voulez vous confirmer le choix de ce bon d'achat ?{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
//             <View style={styles.confirm}>
//               <Image
//                 style={{width: '80%', height: 100}}
//                 source={{uri:'https://upload.wikimedia.org/wikipedia/fr/9/9e/Logo_Biocoop2018.png'}}
//               />
//               <Text style={styles.yProfile}>{'\n'}-10% sur tous la articles en échange de 100 points{'\n'}</Text>
//               <TouchableOpacity onPress={{}} style={styles.buttonConfirm}>
//                 <Text style={{color: "#FFFFFF"}}>Confirmer</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       );
//     } else if (sign === "Confirmed") {
//       return (
//         <View style={styles.container}>
//           <View style={styles.row}>
//             <View style={styles.center}>
//               <Text style={styles.boutique}>Confirmé</Text>
//             </View>
//             <View style={styles.confirm}>
//             <Text style={styles.yProfile}>{'\n'}Bon d'achat acquis avec succès !{'\n'}{'\n'}{'\n'}</Text>
//               <Image
//                 style={{width: '80%', height: 100}}
//                 source={{uri:'https://upload.wikimedia.org/wikipedia/fr/9/9e/Logo_Biocoop2018.png'}}
//               />
//               <Text style={styles.yProfile}>{'\n'}-10% sur tous la articles en échange de 100 points{'\n'}</Text>
//               <Text style={styles.yProfile}>{'\n'}{'\n'}{'\n'}Voici le code à entrer sur le site partenaire :{'\n'}</Text>
//               <Text style={styles.code}>{'\n'}ZJKFL34{'\n'}</Text>
//             </View>
//           </View>
//         </View>
//       );
//     }
//   }
//     return (
//       <View style={styles.main}>
//         <View style={styles.header}>
//           <Text style={styles.text}>
//               Account
//           </Text>
//         </View>
//         <View style={styles.body}>
//           <ScrollView>
//             {pages()}
//           </ScrollView>
//         </View>
//       </View>
//     )
// }

// const styles = StyleSheet.create({
//   main: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   confirm: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bons: {
//     fontSize: 16,
//     color: '#1D2D51',
//     fontWeight: 'bold',
//   },
//   boutique: {
//     fontSize: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: '#1D2D51',
//     fontWeight: 'bold',
//   },
//   recipesName: {
//     fontSize: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: '#1D2D51',
//     fontWeight: 'bold',
//   },
//   ingredients: {
//     fontSize: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: '#1D2D51',
//   },
//   container : {
//     paddingTop: getStatusBarHeight(),
//   },
//   center : {
//       marginTop : -40,
//       marginBottom: 15,
//       justifyContent: 'center',
//       alignItems: 'center',
//   },
//   row : {
//     padding : 20
//   },
//   listContainerStyle : {
//     marginTop : 0
//   },
//   listItemContainerStyle : {
//     borderLeftWidth : 1,
//     borderRightWidth : 1,
//     borderColor : '#cbd2d9'
//   },
//   titleStyle : {
//     backgroundColor : 'red'
//   },
//   header: {
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     height: 75,
//     flex: 0.10,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#bbb',
//   },
//   body: {
//     flex: 0.90,
//   },
//   li: {
//     width: 330,
//     backgroundColor: "#fcfcfc",
//   },
//   text: {
//     marginTop: 37,
//     fontSize: 22,
//     fontWeight: 'bold',
//     fontStyle: 'italic',
//     color: '#252527',
//   },
//   text1: {
//     fontSize: 22,
//     marginTop: 37,
//     color: '#252527',
//   },
//   yM: {
//     alignItems: "flex-start",
//     flex: 1,
//     marginTop: 30,
//     marginLeft: 40
//   },
//   code: {
//     fontSize: 30,
//     color: '#000000',
//     fontWeight: 'bold',
//   },
//   yProfile: {
//     fontSize: 20,
//     color: '#1D2D51',
//     fontWeight: 'bold',
//   },
//   mDetail: {
//     fontSize: 17,
//     color: '#9ba9cc',
//   },
//   input: {
//     height: 40,
//     width: 250,
//     marginTop: 20,
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 5,
//     borderColor: '#918c8c',
//   },
//   input2: {
//     height: 40,
//     width: 250,
//     marginTop: 15,
//     marginBottom: 10,
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 5,
//     borderColor: '#918c8c',
//   },
//   input3: {
//     height: 40,
//     width: 250,
//     marginTop: 5,
//     marginBottom: 10,
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 5,
//     borderColor: '#918c8c',
//   },
//   logs: {
//     flex: 1,
//     alignItems: "center"
//   },
//   info: {
//     flex: 1,
//     flexDirection: "row",
//     color: "#3287b8",
//     marginBottom: 15,
//   },
//   topA: {
//     alignItems: 'center',
//     marginTop: 15,
//   },
//   top: {
//     width: "90%",
//     height: "70%",
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     borderWidth: 1,
//     marginBottom: 10,
//     borderColor: "#f8f8f8",
//     alignItems: 'center',
//     shadowColor: "#000",
//     shadowOffset: {
//     	width: 0,
//     	height: 3,
//     },
//     shadowOpacity: 0.27,
//     shadowRadius: 4.65,
//     elevation: 6,
//   },
//   logo: {
//     width: "85%",
//     marginTop: 25,
//     height: 200,
//     borderWidth: 0,
//     borderColor: "#555"
//   },
//   signC: {
//     color: "#326ed5",
//   },
//   textT: {
//     marginTop: 30,
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#252527',
//   },
//   textI: {
//     fontSize: 18,
//     marginTop: 15,
//     color: '#252527',
//     marginBottom: 15
//   },
//   buttonConfirm: {
//     width: 250,
//     height: 30,
//     backgroundColor: '#4FEE7B',
//     borderRadius: 5,
//     borderWidth: 1,
//     marginTop: 20,
//     marginBottom: 10,
//     borderColor: "#777",
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.27,
//     shadowRadius: 4.65,
//     elevation: 6,
//   },
//   button: {
//     width: 250,
//     height: 30,
//     backgroundColor: '#326ed5',
//     borderRadius: 5,
//     borderWidth: 1,
//     marginTop: 20,
//     marginBottom: 10,
//     borderColor: "#777",
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: "#000",
//     shadowOffset: {
//     	width: 0,
//     	height: 3,
//     },
//     shadowOpacity: 0.27,
//     shadowRadius: 4.65,
//     elevation: 6,
//   },
//   buttonSS: {
//     width: 145,
//     height: 30,
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     borderWidth: 1,
//     marginBottom: 10,
//     borderColor: "rgb(184, 31, 31)",
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttons: {
//     width: 100,
//     height: 30,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 5,
//     borderWidth: 1,
//     marginTop: 10,
//     borderColor: "#D32D35",
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: "#000",
//     shadowOffset: {
//     	width: 0,
//     	height: 3,
//     },
//     shadowOpacity: 0.27,
//     shadowRadius: 4.65,
//     elevation: 6,
//   },
//   buttonconfirm: {
//     width: 140,
//     height: 30,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     borderWidth: 1,
//     marginTop: 19,

//     borderColor: "#368BE7",
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: "#000",
//     shadowOffset: {
//     	width: 0,
//     	height: 3,
//     },
//     shadowOpacity: 0.27,
//     shadowRadius: 4.65,
//     elevation: 6,
//   },
//   datePickerStyle: {
//     width: 230,
//   },
// })
