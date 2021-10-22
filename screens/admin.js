import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  StyleSheet } 
  from 'react-native';

export default function Admin ({navigation}) {
    return (
        <View style={styles.container}>
          
          <Text style= {styles.textStyle}> Welcome, to your course administration page. 
              {('\n')} Select or create a course to continue.</Text>
          <TouchableOpacity style={styles.genericButton}>
            <Text style={styles.loginText}>Bio 123</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.genericButton}>
            <Text style={styles.loginText}>Add Course</Text>
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
  
    loginText: {
      fontWeight: 'bold'
    },

   textStyle: {
      color: '#fff',
      fontWeight: 'bold'
  },
  
  aboutButton: {
    width : "20%",
    borderRadius: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#8C2131",
  
  },
  
  genericButton: {
    width: "20%",
    borderRadius: 10,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#fff",
  },
  });