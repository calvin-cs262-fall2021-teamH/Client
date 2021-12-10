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
 * ProfessorHome is the main screen of the Hello Campus app.
 * @param {navigation} navigation makes sure navigation is correct for getting to the screen and navigating other screens.
 */
export default function ProfessorHome({ navigation }) {
	
	return (
		<ImageBackground
			source={require("../assets/fall_woods_scene.jpg")}
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
