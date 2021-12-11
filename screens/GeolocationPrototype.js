import React, { useState, useEffect } from 'react';
import { Image, Button, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Location from 'expo-location';

// A good reference example: https://snack.expo.dev/@chronsyn/watchpositionasync-example
export default function GeolocationPrototype({ navigation }) {
	const [watcher, setWatcher] = useState(null);
	const [currentLocation, setCurrentLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			await Location.watchPositionAsync({
				accuracy: Location.Accuracy.Highest,
				distanceInterval: 1,
				timeInterval: 1000
			}, ({ coords }) => {
				console.log({ coords });
				setCurrentLocation(coords);
			}).then((locationWatcher) => {
				setWatcher(locationWatcher);
			}).catch((err) => {
				console.log(err);
			});
			return () => {
				watcher.remove();
				// TODO: make sure this is getting called when the screen is left.
				// If it's not called then we could have a memory leak.
			}
		})()
	}, [])
	return (
		<View style={styles.container}>
			{currentLocation && currentLocation.latitude && (
				<Text>{currentLocation.latitude}</Text>
			)}

			{currentLocation && currentLocation.longitude && (
				<Text>{currentLocation.longitude}</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paragraph: {
		color: '#888',
		fontSize: 18,
	},
	logo: {
		width: 305,
		height: 159,
	},
	button: {
		backgroundColor: 'blue',
		padding: 20,
		borderRadius: 5,
	},
	title: {
		fontSize: 20,
		color: '#fff',
	},
	buttonLabel: {
		color: "white",
		textAlign: "center"
	}
});
