/* App.js  Second Prototype of app for project deliverable #2
Team HUH?!
9/17/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
adapted from the navigation tutorial found at: https://reactnavigation.org/docs/navigating
*/

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/home";
import MapScreen from "./screens/map";
import PointInfoScreen from './screens/pointInfo';
import SettingScreen from './screens/setting';
import Header from './shared/header';
import Login from './screens/Login';
import About from './screens/about';
import ProfileScreen from './screens/ProfileScreen';
import ListScreen from './screens/list';
import AuthenticatedMapScreen from './screens/studentView';
import Prompt from './screens/prompt';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{header: () => null}}
        />
        <Stack.Screen 
          name="Map" 
          component={MapScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Header navigation={navigation}/>
            ),
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#8C2131',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          })} />
        <Stack.Screen 
          name="PointInfo" 
          component={PointInfoScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Header navigation={navigation}/>
            )
          })} />
        <Stack.Screen name = "Setting" component = {SettingScreen}/>
        <Stack.Screen name = "Login" component = {Login}/>
        <Stack.Screen name = "About" component = {About}/>
        <Stack.Screen name = "ProfileScreen" component = {ProfileScreen}/>
        <Stack.Screen name = "Location" component = {ListScreen}/>
        <Stack.Screen name = "Prompt" component = {Prompt}/>

        <Stack.Screen name = "StudentView" 
        component = {AuthenticatedMapScreen} 
        options={{header: () => null}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


