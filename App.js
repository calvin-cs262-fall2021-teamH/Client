/* hello-campus-d1.js  Second Prototype of app for project deliverable #2
Team HUH?!
9/17/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
adapted from the navigation tutorial found at: https://reactnavigation.org/docs/navigating
*/

import * as React from 'react';
import { Image, Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import logo from './assets/Calvinsource.png';  
import map from './assets/campusmapD1.PNG';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8C2032' }}>
      <Image source={logo} style={{ width: 305, height: 300 }} />
      <Button
        title="Get Started!"
        onPress={() => navigation.navigate('Map')}
      />
    </View>
  );
}

function MapScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8C2032' }}>
      <Text>Map</Text>
      <Image source = {map} style = {{ width: 700, height : 700}}/>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Team HUH!" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


