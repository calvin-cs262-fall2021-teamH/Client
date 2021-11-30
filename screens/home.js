/**
 * Homepage for Hello Campus
 *
 * @author: Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
 * 10/6/2021
 * adapted page navigation from: https://reactnavigation.org/docs/navigating
 */

import React, { useState } from "react";
import {
	Image,
	View,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	StyleSheet,
	ImageBackground,
} from "react-native";
import { globalStyles } from "../styles/global";
import * as Google from "expo-google-app-auth";

/**
 * HomeScreen is the main screen of the Hello Campus app.
 * @param {navigation} navigation makes sure navigation is correct for getting to the screen and navigating other screens.
 */
export default function HomeScreen({ navigation }) {
	const [userId, setUserId] = useState();
	const signInAsync = async () => {
		console.log("LoginScreen.js 6 | loggin in");
		try {
			const { type, user } = await Google.logInAsync({
				iosClientId:
					"2260489795-nvs04mkpqbhrjbd7ne2jb560e2a3dhdm.apps.googleusercontent.com",
				androidClientId:
					"2260489795-b82e25fatl0ih72e43ii5q6q858fb6ql.apps.googleusercontent.com",
			});

			if (type === "success") {
				// Then you can use the Google REST API
				console.log("LoginScreen.js 17 | success, navigating to profile");
				loggedIn = true;

				const response = fetch(`https://hello-campus.herokuapp.com/users/`, {
					method: "POST",
					headers: new Headers({
						"Content-Type": "application/json",
					}),
					body: JSON.stringify({
						//personID: userId,

						email: user.email,

						name: user.givenName,
					}),
				})
					.then(() => {
						const response2 = JSON.stringify(response);
						setUserId(response2);
					})
					.finally(() => {
						console.log("response: " + userId);
						navigation.navigate("Student Map", { user, userId });
					});
			}
		} catch (error) {
			console.log("LoginScreen.js 19 | error with login", error);
		}
	};

	return (
		<ImageBackground
			source={require("../assets/woods_scene.jpg")}
			style={styles.container}
		>
			<View style={styles.body}>
				<TouchableOpacity
					onPress={() => navigation.navigate("Setting")}
					style={styles.container1}
				>
					<ImageBackground
						source={require("../assets/menuIcon.png")}
						style={globalStyles.settingIcon}
					/>
				</TouchableOpacity>

				<TouchableHighlight
					onPress={() => navigation.navigate("About")}
					style={styles.touchableHighlight}
				>
					<Image
						source={require("../assets/HelloCampusLogo_NoBackground.png")}
						style={styles.imagest}
					/>
				</TouchableHighlight>

				<TouchableOpacity
					style={globalStyles.genericButton}
					onPress={() => navigation.navigate("Map")}
				>
					<Text style={{ flex: 0.3, color: "#fff", fontWeight: "bold" }}>
						EXPLORE
					</Text>
					<Image
						source={require("../assets/map_white.png")}
						resizeMode="contain"
						style={{ flex: 0.15 }}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					style={globalStyles.genericButton}
					onPress={() => signInAsync()}
				>
					<Text style={{ flex: 0.315, color: "#fff", fontWeight: "bold" }}>
						SIGN IN
					</Text>
					<Image
						source={require("../assets/login_white.png")}
						resizeMode="contain"
						style={{ flex: 0.1 }}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.footer}>
				<TouchableOpacity
					style={globalStyles.genericButton}
					onPress={() => navigation.navigate("About")}
				>
					<Text style={{ flex: 0.315, color: "#fff", fontWeight: "bold" }}>
						ABOUT
					</Text>
					<Image
						source={require("../assets/question_mark.png")}
						resizeMode="contain"
						style={{ flex: 0.1 }}
					/>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	footer: {
		alignItems: "center",
		marginBottom: 15,
	},
	container: {
		flex: 1,
		backgroundColor: "#8C2131",
	},
	container1: {
		flex: 1,
		...StyleSheet.absoluteFillObject,
		alignSelf: "flex-end",
		marginTop: 25,
		marginRight: 10,
		left: 300,
		right: 10,

		// position: 'absolute', // add if dont work with above
	},
	loginText: {
		fontWeight: "bold",
		color: "#fff",
	},

	aboutButton: {
		width: "80%",
		borderRadius: 75,
		height: 75,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		backgroundColor: "#8C2131",
	},

	aboutText: {
		fontWeight: "bold",
		color: "#d9aa00",
	},

	touchableHighlight: {
		borderRadius: 100,
	},

	imagest: {
		width: 150,
		height: 150,
	},
});
