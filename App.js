/* hello-campus-d1.js  First Prototype of app for project deliverable #1
Team HUH?!
9/17/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
*/

import React from 'react';
import { Image,  StyleSheet, Text, View } from 'react-native';  
import logo from './assets/Calvinsource.png';                       // import prototype logo

// Display the prototype logo, small amount of text, and background color
// Adapted code from: https://docs.expo.dev/tutorial/image/
export default function App() {
  return (
    <View style={styles.frontScreen}>
      <View style = {styles.logo}>
      <Image source={logo} style={{ width: 305, height: 300 }} />
      <Text style={styles.text}> 
        Team Huh!?
      </Text>
      </View>
      
      
      <View style = {styles.letsGetStarted}>
        {/*this is where the button stuff will go*/}

      </View>
    </View>
  );
}

// Styles for prototype #1
const styles = StyleSheet.create({
  frontScreen: {
    flex: 1,
    backgroundColor: '#8C2032',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    paddingTop: 80,
    paddingHorizantal:20
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
    
  },
  letsGetStarted:{}

});
