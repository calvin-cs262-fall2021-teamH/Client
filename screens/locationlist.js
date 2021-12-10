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


export default function locationQuestion({route, navigation}) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);
    const [error, setError] = useState(null);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [locName, setLocName] = useState("");
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
      
        fetch('https://hello-campus.herokuapp.com/pointsofinterest/')
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
    const [questionModalVisible, setQuestionModalVisible] = useState(false);
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState();

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
      
      const contains = ({ name }, query) => {
        if  (name.includes(query)) {
          return true;
        }
      
        return false;
      };

      submit = () => {
          fetch(`https://hello-campus.herokuapp.com/locations/`,
              { method: 'POST',
              headers: new Headers({
                  "Content-Type":"application/json"
              }),
              body: JSON.stringify({
     
                  email: route.params.user.email,
             
                  questionID: questions[i].id,
             
                  answer: answer["answer_" + questions[i].id]
             
              })
            })
        }


    return (
        <ImageBackground source = {require('../assets/light_background.jpg')} style={{ flex: 1, justifyContent: 'center', backgroundColor: '#8C2032', alignItems: 'center' }}>
          <Text style = {{fontSize: 25, fontWeight: 'bold', color: "#FFF", top: 10}} > Select a location to edit.</Text>
            <FlatList
                    data={data}
                    keyExtractor={({ id }, index) => id.toString()} 
                    renderItem={({ item }) => (
                    <TouchableOpacity style={styles.locationButton} onPress={() => {setQuestionModalVisible(true), setLocation({location: item})}}>
                    <Text style={{fontSize: 20, color: "#fff", fontWeight: "bold"}}> {item.name} </Text>
                    </TouchableOpacity>
                 )}
                 
            />
        <Modal
            animationType = "slide"
            transparent = {true}
            visible = {questionModalVisible}
            onRequestClose={() =>{
                Alert.alert("Modal has been closed.");
                setQuestionModalVisible(!questionModalVisible)
            }}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <TouchableOpacity onPress={() => {navigation.navigate("Add Question", location), setQuestionModalVisible(!questionModalVisible)}}
             style={{backgroundColor:"#8C2131", margin:15, borderRadius:5}}>
                    <Text style={{ color: "#8C2131" , fontSize: 18, color: "#fff", margin: 15}}>Edit Questions</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setQuestionModalVisible(!questionModalVisible)}} 
                              style={{backgroundColor:"red", margin:10, borderRadius:5}}>
                    <Text style={{fontSize: 18, color: "#fff", margin: 15}}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{backgroundColor:"#8C2131", marginTop:50, borderRadius:5}}
              onPress={() => {
                setQuestionModalVisible(!questionModalVisible)}}
            >
              <Text style={{fontSize: 18, color: "#fff", margin: 15}}>Return</Text>
            </TouchableOpacity>
            </View>
            </View>
        </Modal>

        <Modal
          animationType = "slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style = {{fontWeight: "bold", color: "#8C2131"}}>Add A New Location</Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Location Name"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               />{/*on change text*/}
               <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Longitude"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               />
               <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Latitude"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               />
            

            <TouchableOpacity
                style={{backgroundColor:"#8C2131", margin:10, borderRadius:5}}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={{fontSize: 18, fontWeight:'bold', color: '#fff', margin:10}}>Use Current Location?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{backgroundColor:"#8C2131", margin:10, borderRadius:5}}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={{fontSize: 18, fontWeight:'bold', color: '#fff', margin:10}}>Set</Text>
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
    input: {
        margin: 10,
        height: 50,
        borderColor: '#8C2131',
        borderWidth: 3,
        borderRadius: 10,
        padding:5
     },

    modalView: {
      margin: 0,
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 40,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 10,
        height: 20
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
      fontSize: 70
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    AddButtonStyle: {
        borderRadius: 20,
        backgroundColor: "#32CD30",
        borderWidth:2,
        borderColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 30,
        position: 'absolute'
    },
    locationButton: {
      width: "100%",
      borderRadius: 20,
      borderColor: "#fff",
      borderWidth: 1,
      height: 60,
      flexDirection:"row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
      backgroundColor: "#8C2131",
    }
    },
  );