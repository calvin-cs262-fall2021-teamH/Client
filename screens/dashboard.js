/*
 * Dashboard for the Professor View of the HelloCampus Application
 *
 * @author: Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
 * 10/6/2021
 * adapted page navigation from: https://reactnavigation.org/docs/navigating
 */

import React, { useState, useEffect } from "react";
import {
	View,
	Modal,
	Image,
	Text,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {
	HeaderButtons,
	HeaderButton,
	Item
} from 'react-navigation-header-buttons';
import { globalStyles } from "../styles/global";

export default function myDashBoard({ route, navigation }) {
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

	React.useLayoutEffect(() => {
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

	return (
		<ImageBackground source={require('../assets/good.jpg')} style={{ flex: 1, alignItems: 'center', backgroundColor: '#8C2032' }}>
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
					<Text style={globalStyles.helpText}>Press "Students" to add/remove students.</Text>
					<Text style={globalStyles.helpText}>Press "Location/Question" to edit locations and questions.</Text>
					<TouchableOpacity style={{ backgroundColor: "maroon", margin: 10, borderRadius: 15 }}
						onPress={() => {
							setHelpModalVisible(!helpModalVisible)
						}}
					>
						<Text style={{ color: "#fff", fontSize: 25, margin: 10 }}>EXIT</Text>
					</TouchableOpacity>
				</View>
			</Modal>
			<Text style={{ fontSize: 20, color: "#fff", margin: 25 }}>
				Welcome {route.params.user.given_name}, here you can add students to your course, edit questions, and view student responses.
			</Text>
			<TouchableOpacity style={globalStyles.genericButton}
				onPress={async () => {
					const name = route.params.user.given_name;
					navigation.navigate("My Students", { name });
				}}>
				<Text style={{ flex: .315, color: "#fff", fontWeight: "bold" }}>
					Students
				</Text>
				<Image source={require('../assets/people.png')} resizeMode='contain' style={{ flex: .13 }} />
			</TouchableOpacity>

			<TouchableOpacity style={globalStyles.genericButton}
				onPress={async () => {
					const name = route.params.user.given_name;
					navigation.navigate("Location List", { name });
				}}>
				<Text style={{ flex: .315, color: "#fff", fontWeight: "bold" }}> Locations/Questions </Text>{/*include a "your answers will be saved" message*/}
				<Image source={require('../assets/checklist.png')} resizeMode='contain' style={{ flex: .1 }} />
			</TouchableOpacity>
		</ImageBackground>
	)
}