
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

export default function About ({navigation}) {
    return (
        <View style={styles.container}>
          
          <Image source={ require('../assets/HelloCampusLogo_NoBackground.png')} style={{ width: 300, height: 300 }} />
          <Text style = {styles.descriptionText}> The HelloCampus application allows students to answer quiz questions based on locations,
               and to explore their college campus.</Text>
          <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Setting')}>
            <Text style={styles.descriptionText}>Back to Setting</Text>
          </TouchableOpacity>
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
    descriptionText: {
        color: '#fff',
        fontWeight: 'bold'
    },
  loginBtn: {
    width: "20%",
    borderRadius: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#8C2131",
  },
  });
