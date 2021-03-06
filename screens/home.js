/*Home page for Hello Campus
 *
 * @author: Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
 * 10/6/2021
 * adapted page navigation from: https://reactnavigation.org/docs/navigating
 */

import React, { useEffect, useState } from 'react';
import {
	Text,
	Modal,
	View,
	Image,
	ImageBackground,
	TouchableHighlight,
	TouchableOpacity,
	Platform,
	AsyncStorage
} from 'react-native';
import { globalStyles } from '../styles/global';
import * as AppAuth from 'expo-app-auth';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {
	HeaderButtons,
	HeaderButton,
	Item
} from 'react-navigation-header-buttons';

//getting our clientId into the app(Probably should put into the DB to hide from the user)
let andoidClientId = "2260489795-b82e25fatl0ih72e43ii5q6q858fb6ql.apps.googleusercontent.com";//androidclientID
let iosClientId = "2260489795-nvs04mkpqbhrjbd7ne2jb560e2a3dhdm.apps.googleusercontent.com";//iosclientID

let myclientId = Platform.OS == "android" ? andoidClientId : iosClientId;

let config = {
	issuer: 'https://accounts.google.com',
	scopes: ['openid', 'profile', 'email'],
	clientId: myclientId,
};



StorageKey = '@MyApp:CustomGoogleOAuthKey';

export async function signInAsync() {
	let authState = await AppAuth.authAsync(config);
	await cacheAuthAsync(authState);
	const user = await fetchUserInfo(authState.accessToken);
	if (await isInDB(user.email) == false) {//this is for new users
		addUser(user);
	} else {//this is for returning users, ie isInDB returns true
		var returningUserID = await getID(user.email);
	}
	return authState;
}

//returns boolean, true if email is in the db already, false otherwise
async function isInDB(email) {
	try {
		const resp = await fetch(`https://hello-campus.herokuapp.com/usersByEmail/` + email);
		const data = await resp.json();
		return true; //should be only if the User is in the database!
	} catch (e) {
		return false;//returns false signaling that we should add the user to the db
	}
}


async function getUserFromDB(email) {
	const resp = await fetch(`https://hello-campus.herokuapp.com/usersByEmail/` + email);
	const data = await resp.json();
	return data; //should be only if the User is in the database
}

async function addUser(userFromGoogle) {
	fetch(`https://hello-campus.herokuapp.com/users/`,
		{
			method: 'POST',
			headers: new Headers({
				"Content-Type": "application/json",
			}),

			body: JSON.stringify({
				email: userFromGoogle.email,
				name: userFromGoogle.given_name
			})
		})
}

//should return the ID of a given user from the DB.
async function getID(email) {
	const resp = await fetch(`https://hello-campus.herokuapp.com/usersByEmail/` + email);
	const data = await resp.json();
	var userID = data.id;
	return userID;
}


async function cacheAuthAsync(authState) {
	return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
}

//Gets user info from Google, uses the auth token to do this.
async function fetchUserInfo(token) {
	const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
	});
	return await response.json();
}



export async function getCachedAuthAsync() {
	let value = await AsyncStorage.getItem(StorageKey);
	let authState = JSON.parse(value);
	if (authState) {
		if (checkIfTokenExpired(authState)) {
			return refreshAuthAsync(authState);
		} else {
			return authState;
		}
	}
	return null;
}

function checkIfTokenExpired({ accessTokenExpirationDate }) {
	return new Date(accessTokenExpirationDate) < new Date();
}

async function refreshAuthAsync({ refreshToken }) {
	let authState = await AppAuth.refreshAsync(config, refreshToken);
	await cacheAuthAsync(authState);
	return authState;
}

export async function signOutAsync({ accessToken }) {
	try {
		await AppAuth.revokeAsync(config, {
			token: accessToken,
			isClientIdProvided: true,
		});
		await AsyncStorage.removeItem(StorageKey);
		return null;
	} catch (e) {
		alert(`Failed to revoke token: ${e.message}`);
	}
}

/*
 * HomeScreen is the main screen of the Hello Campus app.
 * @param {navigation} navigation makes sure navigation is correct for getting to the screen and navigating other screens.
 */
export default function HomeScreen({ navigation }) {
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
						title={"location-list"}
						iconName={"md-list-circle"}
						color="maroon"
						onPress={() => {
							navigation.navigate("Points of Interest")
						}}
					/>
					<Item
						title={"About"}
						iconName={"information-circle"}
						color="maroon"
						onPress={() => {
							navigation.navigate("About")
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


	if (authState == null) {
		return (
			<ImageBackground
				source={require("../assets/woods_scene.jpg")}
				style={globalStyles.imageBackGround}
			>
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
						<Text>Press "i" icon to go to the about page.</Text>
						<Text>Press "EXPLORE" to continue as a guest.</Text>
						<Text>Press "SIGN IN" to login.</Text>
						<Text>Press the list icon to gain access to all the locations.</Text>
						<TouchableOpacity style={{ backgroundColor: "maroon", margin: 10, borderRadius: 15 }}
							onPress={() => {
								setHelpModalVisible(!helpModalVisible)
							}}
						>
							<Text style={{ color: "#fff", fontSize: 25, margin: 10 }}>EXIT</Text>
						</TouchableOpacity>

					</View>
				</Modal>
				<View style={globalStyles.body}>
					<TouchableHighlight
						onPress={() => navigation.navigate("About")}
						style={globalStyles.touchableHighlight}
					>
						<Image
							source={require("../assets/HelloCampusLogo_NoBackground.png")}
							style={globalStyles.logo}
						/>
					</TouchableHighlight>
					<TouchableOpacity
						style={globalStyles.genericButton}
						onPress={() => navigation.navigate("Map", null)}
					>
						<Text style={globalStyles.genericButtonText}>
							EXPLORE
						</Text>
						<Image
							source={require("../assets/map_white.png")}
							resizeMode="contain"
							style={{ flex: 0.15 }}
						/>
					</TouchableOpacity>

					<TouchableOpacity style={globalStyles.genericButton}
						onPress={async () => {
							const _authState = await signInAsync();
							setAuthState(_authState);
							const user = await fetchUserInfo(_authState.accessToken);
							getUserFromDB(user.email).then(res => setDBuser(res));
							navigation.navigate("Map", { user, _authState });
						}}
					>
						<Text style={globalStyles.genericButtonText}>SIGN IN</Text>
						<Image
							source={require("../assets/login_white.png")}
							resizeMode="contain"
							style={{ flex: 0.1 }}
						/>
					</TouchableOpacity>
				</View>
			</ImageBackground>


		);

	}
	//If we are logged in, the Homescreen changes to include
	// the logout button and the "back to map button, navigation goes directly to the student map on login"

	else if (DBuser.isstudent == true) {
		return (
			<ImageBackground
				source={require("../assets/woods_scene.jpg")}
				style={globalStyles.imageBackGround}
			>
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
						<Text style={globalStyles.helpText}>Press "i" or logo icon to go to the about screen.</Text>
						<Text style={globalStyles.helpText}>Press "BACK TO MAP" to open map again.</Text>
						<Text style={globalStyles.helpText}>Press "SIGN OUT" to logout from account.</Text>
						<Text style={globalStyles.helpText}>Press the list icon to gain access to all the locations.</Text>
						<Text style={globalStyles.helpText}>Press "ASSIGNMENT" to access all your questions and answers for each location.</Text>
						<TouchableOpacity
							style={{ backgroundColor: "maroon", margin: 10, borderRadius: 15 }}
							onPress={() => {
								setHelpModalVisible(!helpModalVisible)
							}}
						>
							<Text style={{ color: "#fff", fontSize: 25, margin: 10 }}>EXIT</Text>
						</TouchableOpacity>
					</View>
				</Modal>

				<View style={globalStyles.body}>
					{/*Navigates to student map screen*/}
					<TouchableHighlight
						onPress={() => navigation.navigate("About")}
						style={globalStyles.touchableHighlight}
					>
						<Image
							source={require("../assets/HelloCampusLogo_NoBackground.png")}
							style={globalStyles.logo}
						/>
					</TouchableHighlight>
					<TouchableOpacity
						style={globalStyles.genericButton}
						onPress={async () => {
							const user = await fetchUserInfo(authState.accessToken);
							navigation.navigate("Map", { user, authState });
						}}
					>
						<Text style={globalStyles.genericButtonText}>
							BACK TO MAP
						</Text>
						<Image
							source={require("../assets/map_white.png")}
							resizeMode="contain"
							style={{ flex: 0.15 }}
						/>
					</TouchableOpacity>

					<TouchableOpacity style={globalStyles.genericButton}
						onPress={async () => {
							await
								signOutAsync(authState);
							setAuthState(null);
							navigation.navigate("Home");
						}}
					>
						<Text style={globalStyles.genericButtonText}>SIGN OUT </Text>{/*include a "your answers will be saved" message*/}
						<Image source={require('../assets/logout_white.png')} resizeMode='contain' style={{ flex: .1 }} />
					</TouchableOpacity>

					<TouchableOpacity style={globalStyles.genericButton}
						onPress={async () => {
							const userFromGoogle = await fetchUserInfo(authState.accessToken);
							const myUser = await getUserFromDB(userFromGoogle.email);
							navigation.navigate("Location", { user: myUser });
						}}>
						<Text style={globalStyles.genericButtonText}>ASSIGNMENT </Text>{/*Location get the user stuff*/}
						<Image source={require('../assets/course_icon.png')} resizeMode='contain' style={{ flex: .135 }} />
					</TouchableOpacity>
				</View>
			</ImageBackground>
		)
	}
	else if (DBuser.isprofessor == true) {
		return (
			<ImageBackground
				source={require("../assets/woods_scene.jpg")}
				style={globalStyles.imageBackGround}
			>
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
						<Text style={globalStyles.helpText}>Press "i" or logo icon to go to the about screen.</Text>
						<Text style={globalStyles.helpText}>Press "BACK TO MAP" to open map again.</Text>
						<Text style={globalStyles.helpText}>Press "SIGN OUT" to logout from account.</Text>
						<Text style={globalStyles.helpText}>Press the list icon to gain access to all the locations.</Text>
						<Text style={globalStyles.helpText}>Press "MANAGE COURSE" to edit locations, questions, and students.</Text>
						<TouchableOpacity
							style={{ backgroundColor: "maroon", margin: 10, borderRadius: 15 }}
							onPress={() => {
								setHelpModalVisible(!helpModalVisible)
							}}
						>
							<Text style={{ color: "#fff", fontSize: 25, margin: 10 }}>EXIT</Text>
						</TouchableOpacity>
					</View>
				</Modal>

				<View style={globalStyles.body}>
					{/*Navigates to student map screen*/}
					<TouchableOpacity
						style={globalStyles.genericButton}
						onPress={async () => {
							const user = await fetchUserInfo(authState.accessToken);
							navigation.navigate("Map", { user, authState });
						}}
					>
						<Text style={globalStyles.genericButtonText}>
							BACK TO MAP
						</Text>
						<Image
							source={require("../assets/map_white.png")}
							resizeMode="contain"
							style={{ flex: 0.15 }}
						/>
					</TouchableOpacity>

					<TouchableOpacity style={globalStyles.genericButton}
						onPress={async () => {
							await
								signOutAsync(authState);
							setAuthState(null);
							navigation.navigate("Home");
						}}
					>
						<Text style={globalStyles.genericButtonText}>SIGN OUT </Text>{/*include a "your answers will be saved" message*/}
						<Image source={require('../assets/login_white.png')} resizeMode='contain' style={{ flex: .1 }} />
					</TouchableOpacity>

					<TouchableOpacity style={globalStyles.genericButton}
						onPress={async () => {
							const user = await fetchUserInfo(authState.accessToken);
							navigation.navigate("Dashboard", { user });
						}}>
						<Text style={globalStyles.genericButtonText}>MANAGE COURSE </Text>{/*include a "your answers will be saved" message*/}
						<Image source={require('../assets/course_icon.png')} resizeMode='contain' style={{ flex: .135 }} />
					</TouchableOpacity>
				</View>
			</ImageBackground>
		)
	}
	else {
		return (
			<ImageBackground
				source={require("../assets/woods_scene.jpg")}
				style={globalStyles.imageBackGround}
			>
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
						<Text style={globalStyles.helpText}>Press "i" or logo icon to go to the about screen.</Text>
						<Text style={globalStyles.helpText}>Press "BACK TO MAP" to open map again.</Text>
						<Text style={globalStyles.helpText}>Press "SIGN OUT" to logout from account.</Text>
						<Text style={globalStyles.helpText}>Press the list icon to gain access to all the locations.</Text>
						<TouchableOpacity
							style={{ backgroundColor: "maroon", margin: 10, borderRadius: 15 }}
							onPress={() => {
								setHelpModalVisible(!helpModalVisible)
							}}
						>
							<Text style={{ color: "#fff", fontSize: 25, margin: 10 }}>EXIT</Text>
						</TouchableOpacity>
					</View>
				</Modal>

				<View style={globalStyles.body}>
					{/*Navigates to student map screen*/}
					<TouchableOpacity
						style={globalStyles.genericButton}
						onPress={async () => {
							const user = await fetchUserInfo(authState.accessToken);
							navigation.navigate("Map", { user, authState });
						}}
					>
						<Text style={globalStyles.genericButtonText}>
							BACK TO MAP
						</Text>
						<Image
							source={require("../assets/map_white.png")}
							resizeMode="contain"
							style={{ flex: 0.15 }}
						/>
					</TouchableOpacity>

					<TouchableOpacity style={globalStyles.genericButton}
						onPress={async () => {
							await
								signOutAsync(authState);
							setAuthState(null);
							navigation.navigate("Home");
						}}
					>
						<Text style={globalStyles.genericButtonText}>SIGN OUT </Text>{/*include a "your answers will be saved" message*/}
						<Image source={require('../assets/login_white.png')} resizeMode='contain' style={{ flex: .1 }} />
					</TouchableOpacity>
				</View>
			</ImageBackground>
		)
	}
}




