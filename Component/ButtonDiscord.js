import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
    DiscordStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7289DA",
        borderWidth: 0.5,
        borderColor: "#fff",
        height: 40,
        width: 220,
        borderRadius: 5,
        margin: 5,
        marginTop: 20
      },
      imageIconStyle: {
        padding: 10,
        marginLeft: 15,
        height: 25,
        width: 25,
        resizeMode: "stretch"
      },
      textStyle: {
        color: "#fff",
        marginLeft: 20,
        marginRight: 20
      }
    });

export default class DiscordSocialButton extends React.Component {
    render() {
      return (
        <TouchableOpacity
          style={{ ...styles.DiscordStyle, ...this.props.buttonViewStyle }}
          onPress={this.props.onPress}
        >
          <Image
            source={require("./../assets/discord1.png")}
            style={{...styles.imageIconStyle, ...this.props.logoStyle}}
          />
          <Text style={{...styles.textStyle, ...this.props.textStyle}}>
            {this.props.buttonText
              ? this.props.buttonText
              : "Sign in with Discord"}
          </Text>
        </TouchableOpacity>
      );
    }
  }