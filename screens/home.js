/* home.js  Homepage for Hello Campus
Team HUH?!
10/6/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
adapted page navigation from: https://reactnavigation.org/docs/navigating
*/

import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, TouchableHighlight, StyleSheet, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global';
import * as Google from "expo-google-app-auth";

export default function HomeScreen({navigation}) {
    const signInAsync = async () => {
      console.log("LoginScreen.js 6 | loggin in");
      try {
        const { type, user } = await Google.logInAsync({
          iosClientId: "2260489795-nvs04mkpqbhrjbd7ne2jb560e2a3dhdm.apps.googleusercontent.com",
          androidClientId: "2260489795-b82e25fatl0ih72e43ii5q6q858fb6ql.apps.googleusercontent.com",
        });
  
        if (type === "success") {
          // Then you can use the Google REST API
          console.log("LoginScreen.js 17 | success, navigating to profile");
          navigation.navigate("Map");
        }
      } catch (error) {
        console.log("LoginScreen.js 19 | error with login", error);
      }
    };
  
    return (
        <ImageBackground source = {require('../assets/woods_scene.jpg')} style={styles.container}>
          
          <TouchableHighlight onPress = {()=> navigation.navigate('About')} style ={styles.touchableHighlight}>
              <Image source={ require('../assets/HelloCampusLogo_NoBackground.png')} style={styles.imagest}/> 
          </TouchableHighlight>
          
          <TouchableOpacity style={globalStyles.genericButton} onPress={() => navigation.navigate('Map')}>
          <Text style={styles.loginText}>EXPLORE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={globalStyles.genericButton} onPress={() => signInAsync()}>
            <Text style={styles.loginText}>SIGN IN</Text>
          </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8C2131",
    alignItems: "center",
    justifyContent: "center",
  },

  loginText: {
    fontWeight: 'bold',
    color: "#fff",
  },
  touchableHighlight: {
    borderRadius: 100,
},

imagest:{
  width : 150,
  height: 150,
},
});
