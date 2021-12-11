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
import myDashBoard from './dashboard'
import addStudentsToCourse from './addStudent'

const DrawerScreen = ({route, navigation}) => {
    const Stack1= createNativeStackNavigator();
  console.log('my params', route.params);
    return (

<Stack1.Navigator initialRouteName="addStudentsToCourse">
  <Stack1.Screen 
    name="Add Students" 
    component={addStudentsToCourse}
    options={{ headerShown: true,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#8C2131',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
    />
     <Stack.Screen name = "Dashboard" component = {myDashBoard} options={{ footerShown: true,
          headerTitleAlign: "center",
          headerTintColor: "maroon",
        }}/>
</Stack1.Navigator>

    )
}

export default DrawerScreen;







