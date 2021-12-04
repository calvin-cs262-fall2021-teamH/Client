/*
 * Homepage for Hello Campus
 *
 * @author: Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
 * 10/6/2021
 * adapted page navigation from: https://reactnavigation.org/docs/navigating
 */

import React, { useState, useEffect } from "react";
import {
	Image,
	View,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	StyleSheet,
    ImageBackground,
    Modal,
    Alert,
    Pressable,
    FlatList,
    TextInput,
} from "react-native";
import filter from 'lodash.filter'
import { globalStyles } from "../styles/global";
import * as Google from "expo-google-app-auth";
import { useRoute } from '@react-navigation/native';
import { AsyncStorage} from 'react-native';
import {checkIfTokenExpired, refreshAuthAsync,getCachedAuthAsync, authState} from './home';
//import @react-native-async-storage/async-storage;


export default function myDashBoard({route, navigation}) {
    return(
        <ImageBackground source = {require('../assets/light_background.jpg')} style={{ flex: 1, alignItems: 'center', backgroundColor: '#8C2032' }}>
        <Text style = {{fontSize: 20, color: "#fff", margin: 25}}>Welcome {route.params.user.given_name}, here you can add students to your course, edit questions, and view student responses.
        </Text>
        <TouchableOpacity style={globalStyles.genericButton} onPress= {async () => {
          const name = route.params.user.given_name;
          navigation.navigate("My Students", {name});
        }}>
                <Text style={{flex:.315, color: "#fff", fontWeight: "bold"}}> Your Students </Text>{/*include a "your answers will be saved" message*/}
                <Image source={require('../assets/login_white.png')} resizeMode='contain' style={{flex: .1 }}/>
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.genericButton} onPress= {async () => {
          const name = route.params.user.given_name;
          navigation.navigate("Location List", {name});
        }}>
                <Text style={{flex:.315, color: "#fff", fontWeight: "bold"}}> Locations/Questions </Text>{/*include a "your answers will be saved" message*/}
                <Image source={require('../assets/login_white.png')} resizeMode='contain' style={{flex: .1 }}/>
      </TouchableOpacity>
        </ImageBackground>
    )
}