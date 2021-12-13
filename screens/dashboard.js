/*
 * Dashboard for the Professor View of the HelloCampus Application
 *
 * @author: Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
 * 10/6/2021
 * adapted page navigation from: https://reactnavigation.org/docs/navigating
 */

import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { globalStyles } from "../styles/global";

export default function myDashBoard({ route, navigation }) {
  return (
    <ImageBackground source={require('../assets/good.jpg')} style={{ flex: 1, alignItems: 'center', backgroundColor: '#8C2032' }}>
      <Text style={{ fontSize: 20, color: "#fff", margin: 25 }}>
        Welcome {route.params.user.given_name}, here you can add students to your course, edit questions, and view student responses.
      </Text>

      <TouchableOpacity style={globalStyles.genericButton}
        onPress={async () => {
          const name = route.params.user.given_name;
          navigation.navigate("My Students", { name });
        }}>
        <Text style={{ flex: .315, color: "#fff", fontWeight: "bold" }}>
          Students
        </Text>
        <Image source={require('../assets/people.png')} resizeMode='contain' style={{ flex: .13 }} />
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.genericButton}
        onPress={async () => {
          const name = route.params.user.given_name;
          navigation.navigate("Location List", { name });
        }}>
        <Text style={{ flex: .315, color: "#fff", fontWeight: "bold" }}> Locations/Questions </Text>{/*include a "your answers will be saved" message*/}
        <Image source={require('../assets/checklist.png')} resizeMode='contain' style={{ flex: .1 }} />
      </TouchableOpacity>
    </ImageBackground>
  )
}