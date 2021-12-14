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

//import Header from './shared/header';
import Login from './screens/Login';
import About from './screens/about';
import DrawerScreen from './screens/Navigator2'
import myStudents from './screens/myStudents'
import QuestionScreen from './screens/questions';
import myDashBoard from './screens/dashboard';
import locationQuestion from './screens/locationlist';
import SignedOutLocationList from './screens/signedOutLocations';
import addStudentsToCourse from './screens/addStudent';
import AddQuestionsScreen from './screens/addQuestions';
import AddLocationScreen from './screens/addLocation';
import LogBox from 'react-native';
//import Icon from 'react-native-ionicons';


import ListScreen from './screens/list';

import Prompt from './screens/prompt';
import { TouchableOpacity, Text, Header } from 'react-native';


const Stack = createNativeStackNavigator();
const Stack1 = createNativeStackNavigator();



//LogBox.ignoreAllLogs(); //Disables warnings


function App() {

  Stack.navigationOptions = (
    {
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => alert('Left Menu Clicked')}
          style={{ marginLeft: 10 }}>
          <Text style={{ color: 'white' }}>Left Menu</Text>
        </TouchableOpacity>
      )
    }
  )
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#8C2131',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{
            headerShown: true,
            headerTitleAlign: "center",
            headerTintColor: "maroon",
          }
          }

        />
        <Stack.Screen
          name="PointInfo"
          component={PointInfoScreen}
          options={{
            headerShown: true,
            headerTitleAlign: "center",
            headerTintColor: "maroon",
          }}
        />
        <Stack.Screen name="About" component={About} options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTintColor: "maroon",
        }} />
        <Stack.Screen name="Questions" component={QuestionScreen} options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTintColor: "maroon",
        }} />
        <Stack.Screen name="Location" component={ListScreen} options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTintColor: "maroon",
        }} />
        <Stack.Screen name="Prompt" component={Prompt} options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTintColor: "maroon",
        }} />
        <Stack.Screen name="Navigator2" component={DrawerScreen} options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTintColor: "maroon",
        }} />
        <Stack.Screen name="My Students" component={myStudents} options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTintColor: "maroon",
        }} />
        <Stack.Screen name="Dashboard" component={myDashBoard} options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTintColor: "maroon",
        }} />
        <Stack.Screen name="Location List" component={locationQuestion} options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTintColor: "maroon",
        }} />
        <Stack.Screen name="Points of Interest" component={SignedOutLocationList} options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTintColor: "maroon",
        }} />
        <Stack.Screen name="Add Students" component={addStudentsToCourse} options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTintColor: "maroon"
        }} />
        <Stack.Screen name="Add Question" component={AddQuestionsScreen} options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTintColor: "maroon"
        }} />
        <Stack.Screen name="Add Location" component={AddLocationScreen} options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTintColor: "maroon"
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


