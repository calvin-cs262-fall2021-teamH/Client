import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from '../styles/global';

const ProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;
  console.log("user from google", user);
  return (
    
    <View style={{alignItems: 'center'}}>
      <Text>Profile Screen</Text>
      <Text>Welcome {user.name} !</Text>
    <TouchableOpacity style={globalStyles.genericButton} onPress={() => navigation.popToTop()}>
        <Text style={{fontWeight: 'bold'}}> Logout </Text>
    </TouchableOpacity>
  </View>    
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});