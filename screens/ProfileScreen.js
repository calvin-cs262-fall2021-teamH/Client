import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from '../styles/global';




const ProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;
  console.log("user from google", user);

  
  return (
    
    <View style={{alignItems: 'center'}}>
      
      <Text>Welcome {user.name} </Text>

      <Text> Take Quiz </Text>
      <TouchableOpacity style={globalStyles.genericButton} onPress={() => navigation.navigate ("Map")}>
        <Text style={{fontWeight: 'bold'}}> Take Quiz </Text>
    </TouchableOpacity>

    
    <TouchableOpacity style={globalStyles.genericButton} onPress={signOutAsync}>
        <Text style={{fontWeight: 'bold'}}> Logout </Text>
    </TouchableOpacity>
  </View>   
  
  //the logout button above must be put into the settings bar
  //the logout button (we should do authentication ourselves)
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

