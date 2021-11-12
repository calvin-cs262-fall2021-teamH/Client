import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
 
} from "react-native";



export default function App() {
  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        await AuthManager.signInAsync();
        const token = await AuthManager.getAccessTokenAsync();
        dispatch({type: 'SIGN_IN', token: token});
      },
      signOut: async () => {
        await AuthManager.signOutAsync();
        dispatch({type: 'SIGN_OUT'});
      },
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <Image source={ require('../assets/truelogow_o_background.png')} style={{ width: 100, height: 100 }} />

     

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#ffe970"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#ffe970"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Create Account</Text>
      </TouchableOpacity>


      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8ff",
    alignItems: "center",
    justifyContent: "center",

  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#8C2131",
    borderRadius: 5,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 loginText:{
   color: '#fff',
 },
  forgot_button: {
    height: 30,
    marginBottom: 20,
  },

  loginBtn: {
    width: "70%",
    borderRadius: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: "#8C2131",
  },

  aboutButton: {
    width : "80%",
    borderRadius: 10,
    height: 10,
    alignItems: "center",
    justifyContent: "center",
  
  },

  guestButton: {
    width : "80%",
    borderRadius: 10,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  
  },
});
