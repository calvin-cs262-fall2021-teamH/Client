/* App.js  Second Prototype of app for project deliverable #2
Team HUH?!
9/17/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
adapted from the navigation tutorial found at: https://reactnavigation.org/docs/navigating
*/

//import * as React from 'react';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./screens/home";
import MapScreen from "./screens/map";
import GeoPrototype from './screens/GeolocationPrototype';
import PointInfoScreen from './screens/pointInfo';
import Header from './shared/header';
import Login from './screens/Login';
import About from './screens/about';
import Prompt from './screens/prompt';
import QuestionScreen from './screens/questions';
import ListScreen from './screens/list';

//import AuthenticatedMapScreen from './screens/studentView';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {
    return (
    <Drawer.Navigator initialRouteName="Home " backBehavior="initialRoute">
        <Drawer.Screen 
          name="Home " 
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
        <Drawer.Screen name="List" component={ListScreen} />
        <Drawer.Screen name = "Map" component = {MapScreen}/>
    </Drawer.Navigator>
    )
}

// const DrawerNavigatorStdt = (parentProps) => {
//   return (
//     <Drawer.Navigator initialRouteName="Home " backBehavior="initialRoute">
//         <Drawer.Screen 
//           name="Back to Home" 
//           //component={AuthenticatedMapScreen}
//           options={({ navigation }) => ({
//             headerStyle: {
//               backgroundColor: '#fff',
//             },
//             headerTintColor: '#8C2131',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//           })}
//           >{(props) => <AuthenticatedMapScreen {...props} route={parentProps.route}/>}</Drawer.Screen>
//         <Drawer.Screen name = "Map" component = {MapScreen}/>
//         <Drawer.Screen name="List" component={ListScreen} />
//     </Drawer.Navigator>
//     )
// }

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={DrawerNavigator}
          options={{ headerShown: false }}
          />
        <Stack.Screen 
          name="Map" 
          //component = {MapScreen}
          component = {DrawerNavigator}
          //component={DrawerNavigator}
          options={{ headerShown: false }}
          />
        <Stack.Screen 
          name="PointInfo" 
          component={PointInfoScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Header navigation={navigation}/>
            )
          })} />
        <Stack.Screen name = "Login"     component = {Login}/>
        <Stack.Screen name = "About"     component = {About}/>
        <Stack.Screen name = "Questions" component = {QuestionScreen}/>
        <Stack.Screen name = "Location"  component = {ListScreen}/>
        <Stack.Screen name = "Prompt"    component = {Prompt}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


