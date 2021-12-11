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
import { AsyncStorage } from 'react-native';
import { checkIfTokenExpired, refreshAuthAsync, getCachedAuthAsync, authState } from './home';
import { Ionicons } from '@expo/vector-icons';
import {
	HeaderButtons,
	HeaderButton,
	Item
} from 'react-navigation-header-buttons';
//import @react-native-async-storage/async-storage;


export default function myDashBoard({ route, navigation }) {
	const [helpModalVisible, setHelpModalVisible] = useState(false);
	const IoniconsHeaderButton = (props) => (
		<HeaderButton IconComponent={Ionicons} iconSize={45} {...props} />
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
						title={"location-list"}
						iconName={"md-list-circle"}
						color="maroon"
						onPress={() => {
							navigation.navigate("Points of Interest")
						}}
					/>
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

	return (
		<ImageBackground source={require('../assets/light_background.jpg')} style={{ flex: 1, alignItems: 'center', backgroundColor: '#8C2032' }}>
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
					<Text style={globalStyles.helpText}>
						Press "Your Students" to edit students.
					</Text>
					<Text style={globalStyles.helpText}>
						Press "Locations/Questions" to edit locations and questions.
					</Text>
					<TouchableOpacity style={{ backgroundColor: "maroon", margin: 10, borderRadius: 15 }}
						onPress={() => {
							setHelpModalVisible(!helpModalVisible)
						}
						}>
						<Text style={{ color: "#fff", fontSize: 25, margin: 10 }}>EXIT</Text>
					</TouchableOpacity>
				</View>
			</Modal>
			<Text style={{ fontSize: 20, color: "#fff", margin: 25 }}>Welcome {route.params.user.given_name}, here you can add students to your course, edit questions, and view student responses.
			</Text>
			<TouchableOpacity style={globalStyles.genericButton} onPress={async () => {
				const name = route.params.user.given_name;
				navigation.navigate("My Students", { name });
			}}>
				<Text style={{ flex: .315, color: "#fff", fontWeight: "bold" }}> Your Students </Text>{/*include a "your answers will be saved" message*/}
				<Image source={require('../assets/people.png')} resizeMode='contain' style={{ flex: .13 }} />
			</TouchableOpacity>
			<TouchableOpacity style={globalStyles.genericButton} onPress={async () => {
				const name = route.params.user.given_name;
				navigation.navigate("Location List", { name });
			}}>
				<Text style={{ flex: .315, color: "#fff", fontWeight: "bold" }}> Locations/Questions </Text>{/*include a "your answers will be saved" message*/}
				<Image source={require('../assets/checklist.png')} resizeMode='contain' style={{ flex: .1 }} />
			</TouchableOpacity>
		</ImageBackground>
	)
}