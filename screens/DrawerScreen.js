/*
DrawerScreen.js  Second Prototype of app for project deliverable #2
Team HUH?!
9/17/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
adapted from the navigation tutorial found at: https://reactnavigation.org/docs/navigating
*/
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem
}
	from '@react-navigation/drawer';
import HomeScreen from "./home";
import About from './about';


const DrawerScreen = ({ route, navigation }) => {
	const Drawer = createDrawerNavigator();
	console.log('my params', route.params);
	return (
		<Drawer.Navigator initialRouteName="Home" backBehavior="initialRoute">
			<Drawer.Screen
				name=" Home"
				component={HomeScreen}
				options={({ navigation }) => ({
					headerStyle: {
						backgroundColor: '#fff',
					},
					headerTintColor: '#8C2131',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				})}
			/>

			<Drawer.Screen name="About" component={About} />
		</Drawer.Navigator>
	)
}

export default DrawerScreen;


