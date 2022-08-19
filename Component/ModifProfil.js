import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-datepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModifProfile ({ navigation, route }) {
    const [password, setPassword] = useState("*********");
    const [email, setEmail] = useState(route.params.email);
    const [birthdate, setBirthdate] = useState(route.params.birthdate);
    const [token, setToken] = useState("");
    const getData = async () => {
      const value = await AsyncStorage.getItem('@token')
      setToken(value);
      console.log(value);
  }
  getData();
    async function handleSubmit() {
      if (password != "*********") {
        console.log(password + birthdate);
          await axios.put('http://20.8.119.103:8080/modifuser', { token: token, password: password,  birthday: birthdate}, {header: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json'}})
          .then(res => {
              navigation.navigate("Profile")
          }).catch((error) => {
              alert("error");
          });
      } else {
        console.log(token);
          await axios.put('http://20.8.119.103:8080/modifuser', { token: token,  birthday: birthdate}, {header: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json'}})
          .then(res => {
              navigation.navigate("Profile")
          }).catch((error) => {
              alert("error");
          });
      }
  };
    return ( <>
             <View style={styles.yM}>
               <Text style={styles.yProfile}>YOUR PROFILE</Text>
               <Text style={styles.mDetail}>My Details</Text>
             </View>
             <View style={styles.topA}>
               <View style={styles.top}>
                 <Image
                    style={styles.logo}
                    source={{
                      uri: "https://ekoiki.fr/wp-content/uploads/2021/04/home-01.png",
                    }}
                  />
                  <Text style={styles.textI}>
                    {email}
                  </Text>
                  <TextInput style={styles.input} placeholder="Edit e-mail" value={email} onChangeText={setEmail}/>
                  <TextInput style={styles.input2} secureTextEntry={true} placeholder="Edit password" value={password} onChangeText={setPassword}/>
        <DatePicker
                    style={styles.datePickerStyle}
                    date={birthdate}
                    mode="date"
                    placeholder="Birth date"
                    format="DD-MM-YYYY"
                    minDate="01-01-1900"
                    maxDate="01-01-2022"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        right: -2,
                        top: 9,
                      },
                      dateInput: {
                        borderColor : "gray",
                        alignItems: "flex-start",
                        borderBottomWidth: 1,
                        height: 40,
                        width: 250,
                        marginTop: 20,
                        marginBottom: 10,
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 5,
                        borderColor: '#918c8c',
                      },
                      placeholderText: {
                        fontSize: 12,
                        color: "gray"
                      },
                      dateText: {
                        fontSize: 17,
                      }
                    }}
                    onDateChange={setBirthdate}
                  />
                <TouchableOpacity onPress={() => handleSubmit()} style={styles.buttonconfirm}>
                  <Text style={{color: "#38CA40"}}>Confirm changes</Text>
                </TouchableOpacity>
                </View>
              </View>
            </>
          );
                }
                const styles = StyleSheet.create({
                    main: {
                      flex: 1,
                      backgroundColor: '#f8f8f8',
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
                      marginTop: 25,
                    },
                    top: {
                      width: "90%",
                      height: "87%",
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      borderRadius: 15,
                      borderWidth: 1,
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
                      width: 200,
                      marginTop: 25,
                      height: 200,
                      borderRadius: 150,
                      borderWidth: 1,
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
                  
                      borderColor: "#38CA40",
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
                  }
                  ) 