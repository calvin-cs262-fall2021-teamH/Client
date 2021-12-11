
import React from "react";
import {
	StyleSheet,
	Text,
	Image,
	ImageBackground,
	TouchableHighlight,
} from "react-native";

export default function About({ navigation }) {
	return (
		<ImageBackground source={require('../assets/woods_scene.jpg')} style={styles.container}>
			<Text style={styles.descriptionText}> Through this application, users will gain a deeper understanding of Calvin University’s Ecosystem Preserve, including historical facts, current activities, and services provided by the university. Based on GPS navigation, our application will provide information pertaining to the user’s location and nearby points of interest.</Text>
			<TouchableHighlight onPress={() => navigation.goBack()} style={styles.touchableHighlight}>
				<Image source={require('../assets/HelloCampusLogo_NoBackground.png')} style={styles.imagest} />
			</TouchableHighlight>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	descriptionText: {
		color: '#9C1D37',
		fontWeight: 'bold',
		fontSize: 24,
		textAlign: "center",
		margin: 30,
		backgroundColor: "#fff",
		borderRadius: 10
	},
	touchableHighlight: {
		borderRadius: 100,
		margin: 10
	},
	imagest: {
		width: 120,
		height: 120,
		justifyContent: "center",
	},
});
