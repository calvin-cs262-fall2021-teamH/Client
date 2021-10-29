/* map.js  Screen that contains the map and different points of interest
Team HUH?!
10/6/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
adapted from the navigation tutorial found at: https://reactnavigation.org/docs/navigating
*/

import React, { useState, useEffect } from 'react';
import { Image, Button, View, Text, TouchableOpacity, FlatList, ImageBackground, Touchable } from 'react-native';
import { globalStyles } from '../styles/global';
import { InteractionButton } from "../components/interactionButton";
import * as Location from 'expo-location';
import {getDistance} from 'geolib';

export default function MapScreen({navigation}) {
  // a list of different locations on the map (only 2 for this prototype)
  const locations = [
    { name: 'Whiskey Pond', image: require('../assets/WhiskeyPond.png'),
        description: 'This secluded pond is fed by a seep on the eastern edge. It is home to ducks,' + 
                      'frogs, and plants like Buttonbush, Duckweed, and the tiniest vascular' +
                      'plant in Michigan, water meal. Watch for the Great Blue Heron that often feeds here'},
    { name: 'Crown Gap', image: require('../assets/CrownGap.png'),
        description: 'In 1995, this large maple tree fell, removing branches from several neighboring trees. ' +
                     'The result was a large hole in the canopy, or a crown gap. The gap allows more sunlight to ' +
                     'reach the forest floor, encouraging growth of seedlings. Eventually one or two of the seedlings ' +
                     'you see now will out-compete the others and will fill the canopy gap',
        radius: 15}
  ];

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
      }, ({coords}) => {
        console.log({coords});
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8C2032' }}>
        <Text style={{ fontSize: 25, color: "#fff", padding: 20 } }>Select a point of interest on the map to learn more!</Text>
        <ImageBackground source = { require('../assets/ecomap.png')} style = { globalStyles.map }/>
        <TouchableOpacity style = {[ globalStyles.mapPoint, {top:-240, right: 90} ]} onPress={() => navigation.navigate('PointInfo', locations[0])}></TouchableOpacity>
        <TouchableOpacity style = {[ globalStyles.mapPoint, {top:-360, left: 110} ]} onPress={() => navigation.navigate('PointInfo', locations[1])}></TouchableOpacity>
        
        {currentLocation && currentLocation.latitude && (getDistance(currentLocation, {latitude: 42.9318392, longitude: -85.5875125}) <= .5) && (
          <TouchableOpacity style = { globalStyles.interactionButton }  onPress={() => navigation.navigate('PointInfo', locations[1])}>
            <Image source={require("../assets/PointInteractionButton2.png")} style = {{width: 100, height:100}}/>
          </TouchableOpacity>
        )}


        {currentLocation && currentLocation.latitude && (
          <Text>{currentLocation.latitude}</Text>
        )}

        {currentLocation && currentLocation.longitude && (
          <Text>{currentLocation.longitude}</Text>
        )}
      </View>
    );
}


//((currentLocation.latitude - 42.9318392) <= -0.0007)  && ((currentLocation.longitude - -85.5875125) <= 0.0006)