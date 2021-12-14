/*
 * Add Student Page for Hello Campus
 *
 * @author: Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
 * 10/6/2021
 * adapted page navigation from: https://reactnavigation.org/docs/navigating
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  FlatList,
  TextInput,
  Modal
} from "react-native";
import filter from 'lodash.filter'
import { Ionicons } from '@expo/vector-icons';
import {
  HeaderButtons,
  HeaderButton,
  Item
} from 'react-navigation-header-buttons';
import { globalStyles } from "../styles/global";

export default function addStudentsToCourse({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [thoseWhoAreNotStudents, setThoseWhoAreNotStudents] = useState([]);
  const [refreshPage, setRefreshPage] = useState([]);
  const [textColor, setTextColor] = useState("white");
  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState('');

  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [DBuser, setDBuser] = useState([]);
  const IoniconsHeaderButton = (props) => (
    <HeaderButton IconComponent={Ionicons} iconSize={40} {...props} />
  );

  //https://docs.expo.dev/versions/v43.0.0/sdk/app-auth/#usage
  let [authState, setAuthState, userId] = useState(null);
  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        setAuthState(cachedAuth);
      }
    })();
  }, []);


  //let myclientId = Platform.OS =="android" ? andoidClientId : iosClientId;
  //location screen is logged in
  //points of interest is what the general user should see

  let isSignedIn = authState == null ? false : true;
  let screenToNavigateTo = isSignedIn == true ? "Location" : "Points of Interest";
  //console.log(isSignedIn, "THIS IS WHERE I AM");//this is updating just fine!
  //console.log(screenToNavigateTo);

  React.useLayoutEffect(() => {
    console.log("GOT HERE AND ")
    /*(async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth == null) {
        screenToNavigateTo = "Points of Interest";
      }else{
        screenToNavigateTo = "Location";
      }
      })(screenToNavigateTo);
  */
    //let isSignedIn = authState == null ? false : true;
    //let screenToNavigateTo = isSignedIn == true ? "Location" : "Points of Interest";
    let myScreen = screenToNavigateTo;
    console.log(screenToNavigateTo);
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
    fetch('https://hello-campus.herokuapp.com/allGuestUsers/')
      .then(response => response.json())
      .then((json) => {
        setThoseWhoAreNotStudents(json);
        setIsLoading(false);
      })
  }, []);

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

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          borderRadius: 20,
          alignSelf: "center",
          width: "100%"
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

  function addStudent(email) {
    console.log(email);
    console.log(setRefreshPage);

    fetch(`https://hello-campus.herokuapp.com/updateStudentStatus/`,
      {
        method: 'PUT',
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          email: email,
          isstudent: "true",
        })
      })
  } [refreshPage]




  function deleteItemById(email) {
    console.log(email, "This is what we are removing!")
    const filteredData = thoseWhoAreNotStudents.filter(item => item.email != email);
    setThoseWhoAreNotStudents(filteredData);
  }


  return (
    <ImageBackground source={require('../assets/good.jpg')}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8C2032'
      }}>
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
          <Text style={globalStyles.helpText}>Press search bar to find a student in the database.</Text>
          <Text style={globalStyles.helpText}>Press on the student to add it to your list.</Text>
          <Text style={globalStyles.helpText}>Press "DONE" to finish.</Text>
          <TouchableOpacity style={{ backgroundColor: "maroon", margin: 10, borderRadius: 15 }}
            onPress={() => {
              setHelpModalVisible(!helpModalVisible)
            }}
          >
            <Text style={{ color: "#fff", fontSize: 25, margin: 10 }}>EXIT</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: "maroon", marginTop: 75 }} >
        Select a student to add to your course.
      </Text>
      <FlatList
        data={thoseWhoAreNotStudents}
        keyExtractor={({ id }, index) => id.toString()}
        ListHeaderComponent={renderHeader()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { addStudent(item.email), deleteItemById(item.email) }}>
            <Text style={{ color: textColor, fontSize: 18, marginLeft: '20%', marginRight: '20%' }}> {item.name}, {item.email} {"\n"} </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.AddButtonStyle}
        onPress={() => navigation.replace("My Students", { name: route.params.name }, navigation.navigate("My Students", { name: route.params.name }))}
      >
        <Text style={styles.textStyle}> DONE </Text>
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
    fontSize: 20,
    margin: 20
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  AddButtonStyle: {
    borderRadius: 10,
    backgroundColor: "#8C2131",
    borderWidth: 2,
    borderColor: "#fff",
    bottom: 12,
    position: 'absolute'
  }
},
);