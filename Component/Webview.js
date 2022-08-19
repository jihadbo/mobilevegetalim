import React from 'react';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyWebComponent ({ navigation, route  }) {
  const storeData = async (value) => {
    await AsyncStorage.setItem('@token', value)
}  
  return <WebView 
    onError={async (syntheticEvent) => {
      const { nativeEvent } = syntheticEvent;
      // console.log(nativeEvent.url);
        let token = "error";
        let url = nativeEvent.url
        if (url[68] == '?') {
            let code = url.split("=")[1].split("&")[0];
            console.log(code);
            await axios.post("https://oauth2.googleapis.com/token?client_id=260750013099-p1f5oukdqhvc59agmmsvof8ri15k5ga2.apps.googleusercontent.com&client_secret=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&code=" +
            code +
            "&grant_type=authorization_code&redirect_uri=http://testapivegetalim.westeurope.cloudapp.azure.com:8080/OauthPage")
            .then((res) => code = res.data.access_token)
            .catch(() => {
                token = "error";
            });
            await axios.post('http://20.8.119.103:8080/OauthGoogle', {token : code}).then(res => {
              token = res.data.token;
              storeData(res.data.token);
            }).catch((error) =>  {
              console.log(error)
              console.log("jihad1\n")  
              code = "error"
            });
            console.log(token);
            if (code != "error")
              navigation.navigate('Profile')
            else
              navigation.navigate('SignIn')
        } else if (url[68] == '#') {
          let code = url.split("=")[2].split("&")[0];
          await axios.post('http://20.8.119.103:8080/OauthDiscord', {token : code}).then(res => {
              token = res.data.token;
              storeData(res.data.token);  
          }).catch((error) => {
            console.log("jihad4\n")  
            code = "error"
          });
          if (code != "error")
            navigation.navigate('Profile')
          else
            navigation.navigate('SignIn')
      }
    }}
    onLoadStart={ async (syntheticEvent) => {
      const { nativeEvent } = syntheticEvent;
      console.log(nativeEvent.url);
        let token = "error";
        let url = nativeEvent.url
        console.log(url[68]);
        if (url[68] == '?') {
            let code = url.split("=")[1].split("&")[0];
            await axios.post("https://oauth2.googleapis.com/token?client_id=260750013099-p1f5oukdqhvc59agmmsvof8ri15k5ga2.apps.googleusercontent.com&client_secret=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&code=" +
            code +
            "&grant_type=authorization_code&redirect_uri=http://testapivegetalim.westeurope.cloudapp.azure.com:8080/OauthPage")
            .then((res) => code = res.data.access_token)
            .catch(() => {
                token = "error";
            });
            console.log(code);
            await axios.post('http://20.8.119.103:8080/OauthGoogle', {token : code}).then(res => {
                token = res.data.token;
                storeData(res.data.token); 
            }).catch((error) =>  {
              console.log("jihad3\n") 
              console.log(error)
              code = "error"
            });
            console.log(token);
            if (code != "error")
              navigation.navigate('Profile')
            else
              navigation.navigate('SignIn')
        } else if (url[68] == '#') {
            let code = url.split("=")[2].split("&")[0];
            await axios.post('http://20.8.119.103:8080/OauthDiscord', {token : code}).then(res => {
                token = res.data.token;
                storeData(res.data.token);
            }).catch((error) => {
              console.log("jihad4\n")  
              code = "error"
            });
            if (code != "error")
              navigation.navigate('Profile')
            else
              navigation.navigate('SignIn')
        }
    }}
    userAgent={Platform.OS === 'android' ? 'Chrome/18.0.1025.133 Mobile Safari/535.19' : 'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75'} source={{ uri:  route.params.url}} />;
  }