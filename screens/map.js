/* map.js  Screen that contains the map and different points of interest
Team HUH?!
10/6/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
adapted from the navigation tutorial found at: https://reactnavigation.org/docs/navigating
*/

import React, { useState, useEffect } from 'react';
import { Image, Button, View, Text, TouchableOpacity, FlatList, ImageBackground, Touchable, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';
import { InteractionButton } from "../components/interactionButton";
import * as Location from 'expo-location';
import {getDistance} from 'geolib';

function scaleValue(value, oldMin, oldMax, newMin, newMax) {
  return ((value - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
}

export default function MapScreen({navigation}) {
  // 42.93604524494348, -85.58066210952111
  // 42.92751441040437, -85.59027514660808
  const minLatitude = 42.92751441040437;
  const minLongitude = -85.59027514660808;
  const maxLatitude = 42.93604524494348;
  const maxLongitude = -85.58066210952111;

  const minX = 85;//0;
  const minY = -160;//0;
  const maxX = 110;//400;
  const maxY = -270;//400;

  // a list of different locations on the map (only 2 for this prototype)
  const locations = [
    { name: 'Whiskey Pond', image: require('../assets/WhiskeyPond.png'),
        description: 'This secluded pond is fed by a seep on the eastern edge. It is home to ducks,' + 
                      'frogs, and plants like Buttonbush, Duckweed, and the tiniest vascular' +
                      'plant in Michigan, water meal. Watch for the Great Blue Heron that often feeds here',
        radius: 15},
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
  const [currentXYPosition, setCurrentXYPosition] = useState({ x: 0, y: 0 });
  
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
        // console.log({coords});
        let x = scaleValue(coords.longitude, minLongitude, maxLongitude, minX, maxX);
        // y = -y; // is this correct?
        // y += 90

        let y = scaleValue(coords.latitude, minLatitude, maxLatitude, minY, maxY);

        let xyCoords = { x: x, y: y };
        console.log(xyCoords);
        setCurrentXYPosition(xyCoords);
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
        <Text style={{ fontSize: 25, color: "#fff", padding: 15, top: 100 } }>Walk towards a point on the map to learn more!</Text>
        <ImageBackground source = { require('../assets/ecomap.png')} style = { styles.map}/>
        <TouchableOpacity style = {[ styles.mapPoint, {top:-160, right: 85} ]} onPress={() => navigation.navigate('PointInfo', locations[0])}></TouchableOpacity>
        <TouchableOpacity style = {[ styles.mapPoint, {top:-270, left: 110} ]} onPress={() => navigation.navigate('PointInfo', locations[1])}></TouchableOpacity>

        { /* the point of the user on the map using the current latitude and longitude */ }
        <TouchableOpacity style = {[ styles.userPoint, {top: currentXYPosition.y, left: currentXYPosition.x} ]}></TouchableOpacity>

        {currentLocation && currentLocation.latitude && (
          <Text style = {{color: "white"}}>{currentLocation.latitude}</Text>
        )}

        {currentLocation && currentLocation.longitude && (
          <Text style = {{color: "white"}}>{currentLocation.longitude}</Text>
        )}

        <ImageBackground source = { require('../assets/PointInteractionButton.png')} style = { globalStyles.noInteractionButton}/>
        {currentLocation && currentLocation.latitude && (getDistance(currentLocation, {latitude: 42.9318392, longitude: -85.5875125}) <= 3) && (
          <TouchableOpacity style = { globalStyles.interactionButton }  onPress={() => navigation.navigate('PointInfo', locations[1])}>
            <Image source={require("../assets/PointInteractionButton2.png")} style = {{width: 170, height:170 }}/>
          </TouchableOpacity>
        )}

        {currentLocation && currentLocation.latitude && (getDistance(currentLocation, {latitude: 42.932596, longitude: -85.578920}) <= 30) && (
          <TouchableOpacity style = { globalStyles.interactionButton }  onPress={() => navigation.navigate('PointInfo', locations[0])}>
            <Image source={require("../assets/PointInteractionButton2.png")} style = {{width: 170, height:170 }}/>
          </TouchableOpacity>
        )}

        {currentLocation && currentLocation.latitude && (getDistance(currentLocation, {latitude: 42.934345, longitude: -85.583079}) <= 15) && (
          <TouchableOpacity style = { globalStyles.interactionButton }  onPress={() => navigation.navigate('PointInfo', locations[1])}>
            <Image source={require("../assets/PointInteractionButton2.png")} style = {{width: 170, height:170 }}/>
          </TouchableOpacity>
        )}  



      </View>
    );
}

const styles = StyleSheet.create({
  map: {
    width: 400, 
    height : 400,
    top: 90
  },
  mapPoint: {
      width: 50,
      height: 50,
      borderRadius: 100,
      backgroundColor: 'yellow',
      borderWidth: 3,
      borderColor: '#ced20c',
      opacity: 0.5,
  },
  userPoint: {
      width: 10,
      height: 10,
      borderRadius: 100,
      backgroundColor: 'blue',
      borderWidth: 1,
      borderColor: 'grey'
  }
});