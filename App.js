/* hello-campus-d1.js  First Prototype of app for project deliverable #1
Team HUH?!
9/17/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
*/

import React from 'react';
import { Image,  StyleSheet, Text, View } from 'react-native';  
import logo from './assets/hclogoV1.png';                       // import prototype logo

// Display the prototype logo, small amount of text, and background color
// Adapted code from: https://docs.expo.dev/tutorial/image/
export default function App() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 305, height: 300 }} />

      <Text style={{color: '#fff', fontSize: 18}}> 
        Created by team HUH?!
      </Text>
    </View>
  );
}

// Styles for prototype #1
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8C2032',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
