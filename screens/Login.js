//Login screen 
//From: https://inaguirre.medium.com/react-native-login-with-google-quick-guide-fe351e464752
import React from "react";
import { StyleSheet, View, TouchableOpacity, Text} from "react-native";
import * as Google from "expo-google-app-auth";
import { globalStyles } from '../styles/global';

const LoginScreen = ({ navigation }) => {
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
        navigation.navigate("ProfileScreen", { user });
      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={globalStyles.genericButton} onPress={signInAsync}>
        <Text style={{fontWeight: 'bold'}}> Login with Google </Text>
    </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});