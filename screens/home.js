/**
 * Homepage for Hello Campus
 *
 * @author: Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
 * 10/6/2021
 * adapted page navigation from: https://reactnavigation.org/docs/navigating
 */

import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, TouchableHighlight, StyleSheet, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global';
import * as Google from "expo-google-app-auth";

/**
 * HomeScreen is the main screen of the Hello Campus app.
 * @param {navigation} navigation makes sure navigation is correct for getting to the screen and navigating other screens.
 */
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
          navigation.navigate("StudentView", { user });
        }

      } catch (error) {
        console.log("LoginScreen.js 19 | error with login", error);
      }
    };
  
    return (
        <ImageBackground source = {require('../assets/woods_scene.jpg')} style={styles.container}>

                <TouchableOpacity onPress={() => navigation.navigate('Setting')} style = {styles.container1}>
                    <ImageBackground source = { require('../assets/menuIcon.png')} style = { globalStyles.settingIcon }/> 
                </TouchableOpacity>
          
          <TouchableHighlight onPress = {()=> navigation.navigate('About')} style ={styles.touchableHighlight}>
              <Image source={ require('../assets/HelloCampusLogo_NoBackground.png')} style={styles.imagest}/> 
          </TouchableHighlight>
          
          <TouchableOpacity style={globalStyles.genericButton}
           onPress={() => navigation.navigate('Map')}>
          <Text style={{flex:.3, color: "#fff", fontWeight: "bold"}}>EXPLORE</Text>
          <Image source={require('../assets/map_white.png')} resizeMode='contain' style={{flex: .15 }}/>
          </TouchableOpacity>

          <TouchableOpacity style={globalStyles.genericButton}
           onPress={() => signInAsync()}>
          <Text style={{flex:.315, color: "#fff", fontWeight: "bold"}}>SIGN IN</Text>
          <Image source={require('../assets/login_white.png')} resizeMode='contain' style={{flex: .1 }}/>
          </TouchableOpacity>

          <TouchableOpacity onPress = {()=> navigation.navigate('About')} style = {{marginTop:30}}>
              <Text style = {{color: "#fff", fontWeight: "bold"}}> ABOUT </Text>
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
  container1: {
    flex:1,
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'flex-end',
    marginTop: 25,
    marginRight: 10,
    left: 300,
    right: 10,
   
    
   // position: 'absolute', // add if dont work with above
  },
  loginText: {
    fontWeight: 'bold',
    color: "#fff",
  },

aboutButton: {
  width : "80%",
  borderRadius: 75,
  height: 75,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 40,
  backgroundColor: "#8C2131",
},

aboutText: {
  fontWeight: 'bold',
  color: "#d9aa00"},

touchableHighlight: {
    borderRadius: 100,
},

imagest:{
  width : 150,
  height: 150,
},
});
