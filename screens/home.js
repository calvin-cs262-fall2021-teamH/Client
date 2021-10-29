/* home.js  Homepage for Hello Campus
Team HUH?!
10/6/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
adapted page navigation from: https://reactnavigation.org/docs/navigating
*/

import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({navigation}) {
    return (
<<<<<<< HEAD
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8C2032' }}>
          <Image source={ require('../assets/HelloCampusLogo.png')} style={{ width: 300, height: 300 }} />
          <Button
            title="Get Started!"
            onPress={() => navigation.navigate('Map')}
          />
          <Button
            title= "LOG IN"
            onPress={() => navigation.navigate('Login')}
            />
          <Button
            title="Geolocation prototype"
            onPress={() => navigation.navigate('GeoPrototype')}
          />
=======
        <View style={styles.container}>
          
          <Image source={ require('../assets/truelogow_o_background.png')} style={{ width: 300, height: 300 }} />
          
          <TouchableOpacity style={styles.genericButton} onPress={() => navigation.navigate('Map')}>
            <Text style={styles.loginText}>Take a Tour!</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.genericButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Sign In / Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('About')}>
            <Text style={styles.aboutText}>About</Text>
          </TouchableOpacity>
>>>>>>> main
        </View>
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
    color: "#000000"
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
  color: "#d9aa00"
},


genericButton: {
  width: "80%",
  borderRadius: 10,
  height: 25,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 10,
  backgroundColor: "#fff",
},
});
