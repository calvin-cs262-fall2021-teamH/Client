
import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableHighlight,
} from "react-native";

export default function About ({navigation}) {
    return (
      <ImageBackground source = {require('../assets/woods_scene.jpg')} style={styles.container}>
          
          
          <TouchableHighlight onPress = {()=> navigation.goBack()} style ={styles.touchableHighlight}>
              <Image source={ require('../assets/HelloCampusLogo_NoBackground.png')} style={styles.imagest}/> 
          </TouchableHighlight>
          <Text style={styles.descriptionText}> Through this application, users will gain a deeper understanding of Calvin University’s Ecosystem Preserve, including historical facts, current activities, and services provided by the university. Based on GPS navigation, our application will provide information pertaining to the user’s location and nearby points of interest.</Text>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    descriptionText: {
        color: '#9C1D37',
        fontWeight: 'bold',
        fontSize: 20
    },
    touchableHighlight: {
        borderRadius: 100,
    },
  imagest:{
    width : 150,
    height: 150,
    justifyContent: "center",
  },
  });
