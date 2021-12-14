
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
import filter from 'lodash.filter';
import { globalStyles } from "../styles/global";
import * as Google from "expo-google-app-auth";
import { useRoute } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
import AddLocationScreen from "./addLocation";
import { Ionicons } from '@expo/vector-icons';
import {
  HeaderButtons,
  HeaderButton,
  Item
} from 'react-navigation-header-buttons';
//import @react-native-async-storage/async-storage;


export default function locationQuestion({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [error, setError] = useState(null);

  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [DBuser, setDBuser] = useState([]);
  const IoniconsHeaderButton = (props) => (
    <HeaderButton IconComponent={Ionicons} iconSize={40} {...props} />
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title={"help"}
            iconName={"help-circle"}
            color="maroon"
            onPress={() => {
              setHelpModalVisible(!helpModalVisible)
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation])

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
    if (name.includes(query)) {
      return true;
    }

    return false;
  };

  const remove = (locationID) => {
    fetch(`https://hello-campus.herokuapp.com/pointOfInterest/${locationID}/`, { method: 'DELETE' })
      .then(() => {
        reloadLocations()
      })
  }

  const reloadLocations = () => {
    setIsLoading(true);

    fetch('https://hello-campus.herokuapp.com/pointsofinterest/')
      .then(response => response.json())
      .then((json) => {
        setData(json)
        setFullData(json);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
  }

  const createFlatlist = () => {
    return (
      <FlatList
        contentContainerStyle={{ paddingBottom: 300, flexGrow: 1, justifyContent: 'flex-end', flexDirection: 'column' }}
        data={data}
        keyExtractor={({ id }, index) => id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.locationButton} onPress={() => { setQuestionModalVisible(true), setLocation({ location: item }) }}>
            <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}> {item.name} </Text>
          </TouchableOpacity>
        )}
      />
    )
  }


  return (
    <ImageBackground source={require('../assets/light_background.jpg')} style={{ flex: 1, justifyContent: 'center', backgroundColor: '#8C2032', alignItems: 'center' }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={helpModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setHelpModalVisible(!helpModalVisible);
        }}
      >
        <View style={globalStyles.helpModal}>
          <Text style={globalStyles.helpText}>Press location's name to edit its questions or remove it.</Text>
          <Text style={globalStyles.helpText}>Press "Add Location" to add a location point.</Text>
          <TouchableOpacity style={{ backgroundColor: "maroon", margin: 10, borderRadius: 15 }}
            onPress={() => {
              setHelpModalVisible(!helpModalVisible)
            }}
          >
            <Text style={{ color: "#fff", fontSize: 25, margin: 10 }}>EXIT</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Text style={{ fontSize: 25, fontWeight: 'bold', color: "#FFF", top: 10, marginBottom: 20 }} > Select a location to edit.</Text>
      {createFlatlist()}
      <TouchableOpacity
        style={styles.AddButtonStyle}
        onPress={() => navigation.navigate("Add Location")}
      >
        <Text style={styles.textStyle}> Add Location </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={questionModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setQuestionModalVisible(!questionModalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => { navigation.navigate("Add Question", location), setQuestionModalVisible(!questionModalVisible) }}
              style={{ backgroundColor: "#8C2131", margin: 15, borderRadius: 5 }}>
              <Text style={{ color: "#8C2131", fontSize: 18, color: "#fff", margin: 15 }}>Edit Questions</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { remove(location.location.id), setQuestionModalVisible(!questionModalVisible) }}
              style={{ backgroundColor: "red", margin: 10, borderRadius: 5 }}>
              <Text style={{ fontSize: 18, color: "#fff", margin: 15 }}>Delete</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 11 }}>Warning: remove all questions from location before deletion!</Text>
            <TouchableOpacity
              style={{ backgroundColor: "#8C2131", marginTop: 50, borderRadius: 5 }}
              onPress={() => { setQuestionModalVisible(!questionModalVisible) }}
            >
              <Text style={{ fontSize: 18, color: "#fff", margin: 15 }}>Return</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
            <Text style={{ fontWeight: "bold", color: "#8C2131" }}>Add A New Location</Text>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Location Name"
              placeholderTextColor="grey"
              autoCapitalize="none"
            />{/*on change text*/}
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Longitude"
              placeholderTextColor="grey"
              autoCapitalize="none"
            />
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Latitude"
              placeholderTextColor="grey"
              autoCapitalize="none"
            />
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Description"
              placeholderTextColor="grey"
              autoCapitalize="none"
              multiline={true}
              numberOfLines={3}
            />
            <TouchableOpacity
              style={{ backgroundColor: "#8C2131", margin: 10, borderRadius: 5 }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff', margin: 10 }}>Set</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: "#8C2131", marginTop: 50, borderRadius: 5 }}
              onPress={() => { setModalVisible(!modalVisible) }}
            >
              <Text style={{ fontSize: 18, color: "#fff", margin: 15 }}>Return</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    padding: 5
  },

  modalView: {
    margin: 0,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
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
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 35
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  AddButtonStyle: {
    borderRadius: 20,
    backgroundColor: "#32CD30",
    borderWidth: 2,
    borderColor: "#fff",
    padding: 25,
    marginBottom: 10,
    marginTop: 12
  },
  locationButton: {
    width: "100%",
    borderRadius: 20,
    borderColor: "#fff",
    borderWidth: 1,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#8C2131",
  }
},
);