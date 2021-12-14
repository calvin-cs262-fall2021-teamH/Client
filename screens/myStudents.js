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
  ScrollView,
  Modal,
  Alert,
  Pressable,
  FlatList,
  TextInput,
  RefreshControl,
} from "react-native";
import filter from 'lodash.filter'
import { globalStyles } from "../styles/global";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);

export default function myStudents({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [thoseWhoAreNotStudents, setThoseWhoAreNotStudents] = useState([]);
  const [refreshPage, setRefreshPage] = useState([]);
  const [error, setError] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [addRemoveModalVisible, setAddRemoveModalVisible] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);

    fetch('https://hello-campus.herokuapp.com/allStudentUsers/')
      .then(response => response.json())
      .then((json) => {
        setData(json);
        setFullData(json);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);

    fetch('https://hello-campus.herokuapp.com/allGuestUsers/')
      .then(response => response.json())
      .then((json) => {
        setThoseWhoAreNotStudents(json);

        setIsLoading(false);
      })

  }, []);

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
    if (email.includes(query)) {
      return true;
    }

    return false;
  };

  function removeStudent(email) {
    fetch(`https://hello-campus.herokuapp.com/updateStudentStatus/`,
      {
        method: 'PUT',
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          email: email,
          isstudent: "false",
        })
      })
  }

  function deleteItemByEmail(email) {
    console.log(email, "This is what we are removing!")
    const filteredData = data.filter(item => item.email != email);
    setData(filteredData);
  }

  return (
    <ImageBackground source={require('../assets/good.jpg')}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8C2032'
      }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: "#8C2131", marginTop: 30 }} >
        Select a student to view their answers.
      </Text>
      <ScrollView>
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id.toString()}
          ListHeaderComponent={renderHeader()}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <View style={globalStyles.listButton}>
                <TouchableOpacity onPress={() => { navigation.navigate("Location", { user: item }) }}>
                  <Text style={{ color: "#fff", fontSize: 20 }}> {item.email} </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() => { removeStudent(item.email), deleteItemByEmail(item.email) }}>
                  <Text style={{ color: "#fff", fontSize: 18, borderColor: "#fff", borderWidth: 1, backgroundColor: "maroon", margin: 25, borderRadius: 20 }}> X </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

        />
      </ScrollView>
      <View style={{alignItems:"center", marginBottom:10}}>
        <TouchableOpacity
          style={styles.AddButtonStyle}
          onPress={() =>
            navigation.navigate("Add Students", { name: route.params.name })}
        >
          <Text style={styles.textStyle}> Add Student </Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 30
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  AddButtonStyle: {
    borderRadius: 10,
    backgroundColor: "lime",
    borderWidth: 1,
    borderColor: "#fff",
    bottom: 5,
    alignSelf: "center"
  }
},
);