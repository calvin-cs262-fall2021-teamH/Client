/* App.js  Second Prototype of app for project deliverable #2
Team HUH?!
9/17/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
adapted from the navigation tutorial found at: https://reactnavigation.org/docs/navigating
*/

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./screens/home";
import MapScreen from "./screens/map";
import PointInfoScreen from './screens/pointInfo';

import Header from './shared/header';
import Login from './screens/Login';
import About from './screens/about';
import DrawerScreen from './screens/DrawerScreen'
import myStudents from './screens/myStudents'
import QuestionScreen from './screens/questions';
import myDashBoard from './screens/dashboard';
import locationQuestion from './screens/locationlist';
import AddQuestionsScreen from './screens/addQuestions';
//import Icon from 'react-native-ionicons';

import ListScreen from './screens/list';

import Prompt from './screens/prompt';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={DrawerScreen}
          options={{ headerShown: false  }}
          />
        <Stack.Screen 
          name="Map" 
          component={MapScreen}
          options={{ headerShown: true }}
          />
        <Stack.Screen 
          name="PointInfo" 
          component={PointInfoScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Header navigation={navigation}/>
            )
          })} />
        <Stack.Screen name = "Login" component = {Login}/>
        <Stack.Screen name = "About" component = {About}/>
        <Stack.Screen name = "Questions" component = {QuestionScreen}/>
        <Stack.Screen name = "Location" component = {ListScreen}/>
        <Stack.Screen name = "Prompt" component = {Prompt}/>
        <Stack.Screen name = "DrawerScreen" component = {DrawerScreen}/>
        <Stack.Screen name = "My Students" component = {myStudents} />
        <Stack.Screen name = "Dashboard" component = {myDashBoard}/>
        <Stack.Screen name = "Location List" component = {locationQuestion}/>
        <Stack.Screen name = "Add Question" component = {AddQuestionsScreen}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


