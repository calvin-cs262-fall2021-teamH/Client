/* home.js  Homepage for Hello Campus
Team HUH?!
10/6/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
adapted page navigation from: https://reactnavigation.org/docs/navigating
*/

import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';

export default function HomeScreen({ navigation }) {
	return (
		<View style={styles.container}>

			<Image source={require('../assets/truelogow_o_background.png')} style={{ width: 300, height: 300 }} />

			<TouchableOpacity style={globalStyles.genericButton} onPress={() => navigation.navigate('Map')}>
				<Text style={styles.loginText}>Take a Tour!</Text>
			</TouchableOpacity>

			<TouchableOpacity style={globalStyles.genericButton} onPress={() => navigation.navigate('Login')}>
				<Text style={styles.loginText}>Sign In</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('About')}>
				<Text style={styles.aboutText}>About</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#8C2131",
		alignItems: "center",
		justifyContent: "center",
	},

	loginText: {
		fontWeight: 'bold',
		color: "#000000"
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
		fontWeight: 'bold',
		color: "#d9aa00"
	},
});
