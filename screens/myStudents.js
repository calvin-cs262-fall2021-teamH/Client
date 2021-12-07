/*
 * Homepage for Hello Campus
 *
 * @author: Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
 * 10/6/2021
 * adapted page navigation from: https://reactnavigation.org/docs/navigating
 */

import React, { useState, useEffect } from "react";
import {
	Image,
	View,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	StyleSheet,
    ImageBackground,
    Modal,
    Alert,
    Pressable,
    FlatList,
    TextInput,
} from "react-native";
import filter from 'lodash.filter'
import { globalStyles } from "../styles/global";
import * as Google from "expo-google-app-auth";
import { useRoute } from '@react-navigation/native';
import { AsyncStorage} from 'react-native';
import {checkIfTokenExpired, refreshAuthAsync,getCachedAuthAsync, authState} from './home';
//import @react-native-async-storage/async-storage;


export default function myStudents({route, navigation}) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);
    const [error, setError] = useState(null);
    //const [isLoading, setIsLoading] = useState(false);
    /*useEffect(() => {
        fetch('https://hello-campus.herokuapp.com/users/')
            .then((response) => response.json())
            .then((json) => {setData(json)
                setFullData(response.results);

                 setIsLoading(false)})
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
      }, []);*/

      useEffect(() => {
        setIsLoading(true);
      
        fetch('https://hello-campus.herokuapp.com/users/')
          .then(response => response.json())
          .then((json) => {
            setData(json);
      
            // ADD THIS
            setFullData(json);
      
            setIsLoading(false);
          })
          .catch(err => {
            setIsLoading(false);
            setError(err);
          });
      }, []);

    const [modalVisible, setModalVisible] = useState(false);
    const [addRemoveModalVisible, setAddRemoveModalVisible] = useState(false);
    const [query, setQuery] = useState('');

    function renderHeader() {
        return (
          <View
            style={{
              backgroundColor: '#fff',
              padding: 10,
              marginVertical: 10,
              borderRadius: 20
            }}
          >
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              value={query}
              onChangeText={queryText => handleSearch(queryText)}
              placeholder="Search"
              style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
            />
          </View>
        );
      }
      const handleSearch = text => {
        const formattedQuery = text.toLowerCase();
        const filteredData = filter(fullData, user => {
          return contains(user, formattedQuery);
        });
        setData(filteredData);
        setQuery(text);
      };
      
      const contains = ({ email }, query) => {
        if  (email.includes(query)) {
          return true;
        }
      
        return false;
      };


    return (
        <ImageBackground source = {require('../assets/light_background.jpg')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8C2032' }}>
          <Text style = {{fontSize: 18, fontWeight: 'bold', color: "#8C2131"}} > Select a student to view their answers.</Text>
            <FlatList
                    data={data}
                    keyExtractor={({ id }, index) => id.toString()}
                    ListHeaderComponent={renderHeader()} 
                    renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {navigation.navigate("Location")}}>
                    <Text style={{ color: "#8C2131" , fontSize: 18}}> {item.email} {"\n"} </Text>
                    </TouchableOpacity>
                 )}
                 
            />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text>Add Student</Text>
            <FlatList
                    data={data}
                    keyExtractor={({ id }, index) => id.toString()}
                    ListHeaderComponent={renderHeader()} 
                    renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setAddRemoveModalVisible(!addRemoveModalVisible)}>
                    <Text style={{ color: "#8C2131" , fontSize: 18}}> {item.email} {"\n"} </Text>
                    </TouchableOpacity>

         
                 )}
                 
            />
            <Modal animationType = "slide"
                    transparent = {false}
                    visible = {addRemoveModalVisible}
                    onRequestClose={()=>{Alert.alert("ADD/Remove was closed");
                    setAddRemoveModalVisible(!addRemoveModalVisible)
                    }}
            >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={{ color: "#8C2131" , fontSize: 18}}>Do you wish to add or remove?{"\n"} </Text>
            <TouchableOpacity onPress={() => setAddRemoveModalVisible(!addRemoveModalVisible)}>
                    <Text style={{ color: "#8C2131" , fontSize: 18}}> ADD </Text>
            </TouchableOpacity>
            </View>
            </View>
            </Modal>
              <TouchableOpacity
                style={{backgroundColor:"#8C2131", margin:10, borderRadius:5}}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={{fontSize: 18, fontWeight:'bold', color: '#fff', margin:10}}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style= {styles.AddButtonStyle}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}> + </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },

    modalView: {
      margin: 0,
      backgroundColor: "white",
      borderRadius: 3,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 5,
      padding: 12,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#8C2131",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 50
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    AddButtonStyle: {
        borderRadius: 10,
        backgroundColor: "#8C2131",
        borderWidth:1,
        borderColor: "#fff",
        bottom: 5,
        left: 5,
        position: 'absolute'
}
    },
  );