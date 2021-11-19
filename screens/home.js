

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest, useAutoDiscovery} from 'expo-auth-session';
import { TouchableOpacity, StyleSheet, Image, Text, ImageBackground, TouchableHighlight} from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const HomeScreen =({navigation}) => {
  // Endpoint
  const discovery = useAutoDiscovery('https://login.microsoftonline.com/756349b9-0610-4b01-917b-2a4ac10df947/v2.0');
  // Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'f1cd0087-3639-4bb6-a3ac-7a859abae009',
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      redirectUri: 'exp://192.168.0.106:19000',
    },
    discovery
  );
  return (

    <ImageBackground source={ require('../assets/home_background.jpg')} style ={styles.imageStyle}>
      <TouchableHighlight onPress = {()=> navigation.navigate('About')}>
              <Image source={ require('../assets/truelogow_o_background.png')} style={styles.imagest}/> 
          </TouchableHighlight>

      <TouchableOpacity style={styles.loginBtn} 
        disabled={!request}
        onPress={() => {
        promptAsync()
       if (type === "success") {
        console.log("LoginScreen.js 17 | success, navigating to profile");
        navigation.navigate("Map", { user });
      }
        }}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress ={() => navigation.navigate ('Map')}>
        <Text style={styles.loginText}>CONTINUE AS GUEST</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({

  imageStyle: {
    flex: 1,
  width: '100%',
  height: '100%',
  resizeMode: 'contain',
  justifyContent: 'center',
  alignItems: "center"
  },
  imagest:{
    width : 150,
    height: 150,
    justifyContent: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8ff",
    alignItems: "center",
    justifyContent: "center",

  },
  loginText:{
    color: '#fff',
  },
  loginBtn: {
    width: "70%",
    borderRadius: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "#8C2131",
  },

});
