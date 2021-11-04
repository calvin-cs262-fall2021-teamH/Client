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
  const MAP_WIDTH = 400;
  const MAP_HEIGHT = 461.487;
  const MAP_Y = 90;
  const MAP_X = 0;

  const POINT_WIDTH = 50;
  const POINT_HEIGHT = 50;

  const REAL_UPPER_LEFT_CORNER_COORD = { lat: 42.93532617951739, long: -85.58525936106732 };
  const REAL_LOWER_RIGHT_CORNER_COORD = { lat: 42.9297585579178, long: -85.57842713530987 };

  function realToPixelCoords(lat, long) {
    // the real coords increase left to right and increase bottom to top
    
    let pixelX = MAP_WIDTH - scaleValue(-long, -REAL_UPPER_LEFT_CORNER_COORD.long, -REAL_LOWER_RIGHT_CORNER_COORD.long, MAP_X, MAP_WIDTH);
    pixelX -= POINT_WIDTH / 2;

    let pixelY = MAP_HEIGHT - scaleValue(lat, REAL_LOWER_RIGHT_CORNER_COORD.lat, REAL_UPPER_LEFT_CORNER_COORD.lat, 0, MAP_HEIGHT);
    pixelY += MAP_Y;
    pixelY -= POINT_HEIGHT / 2;

    return { x: pixelX, y: pixelY };
  }

  // for testing
  const PRINCE_CONFERENCE_CENTER_COORDS = { lat: 42.930270650358146, long: -85.5834892691921 };
  const PRINCE_SCREEN_COORDS = realToPixelCoords(PRINCE_CONFERENCE_CENTER_COORDS.lat, PRINCE_CONFERENCE_CENTER_COORDS.long);

  // a list of different locations on the map (only 2 for this prototype)
  const WHISKEY_POND_COORDS = { lat: 42.93264295748676, long: -85.5831781329471 };
  const CROWN_GAP_COORDS = { lat: 42.93374267151409, long: -85.58030280488913 };
  const locations = [
    { name: 'Whiskey Pond', image: require('../assets/WhiskeyPond.png'),
        description: 'This secluded pond is fed by a seep on the eastern edge. It is home to ducks,' + 
                      'frogs, and plants like Buttonbush, Duckweed, and the tiniest vascular' +
                      'plant in Michigan, water meal. Watch for the Great Blue Heron that often feeds here',
        lat: WHISKEY_POND_COORDS.lat, long: WHISKEY_POND_COORDS.long,
        pixelCoords: realToPixelCoords(WHISKEY_POND_COORDS.lat, WHISKEY_POND_COORDS.long),
        radius: 40},
    { name: 'Crown Gap', image: require('../assets/CrownGap.png'),
        description: 'In 1995, this large maple tree fell, removing branches from several neighboring trees. ' +
                     'The result was a large hole in the canopy, or a crown gap. The gap allows more sunlight to ' +
                     'reach the forest floor, encouraging growth of seedlings. Eventually one or two of the seedlings ' +
                     'you see now will out-compete the others and will fill the canopy gap',
        lat: CROWN_GAP_COORDS.lat, long: CROWN_GAP_COORDS.long,
        pixelCoords: realToPixelCoords(CROWN_GAP_COORDS.lat, CROWN_GAP_COORDS.long),
        radius: 15}
  ];

  const [watcher, setWatcher] = useState(null);
 // const [currentLocation, setCurrentLocation] = useState({x: 0, y: 0});
  const [errorMsg, setErrorMsg] = useState(null);
  const [userCoords, setUserCoords] = useState({pixelCoords: {x: 0, y: 0}, coords: {latitude:0, longitude:0}});
  
  // let currentLocation = {x:0, y:0};
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      await Location.watchPositionAsync({
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 0.5
        //timeInterval: 1
      }, ({coords}) => {
        //setCurrentLocation(coords);
        let pixelCoords = realToPixelCoords(coords.latitude, coords.longitude);
        console.log(pixelCoords.x + ", " + pixelCoords.y);
        
        //setCurrentLocation(coords);
        setUserCoords({coords:coords, pixelCoords:pixelCoords});
      }).then((locationWatcher) => {
        setWatcher(locationWatcher);
      }).catch((err) => {
        console.log(err);
      });
      return () => {
        // watcher.remove();
        // TODO: make sure this is getting called when the screen is left.
        // If it's not called then we could have a memory leak.
      }
    })()
  }, [])

  function getClosePoint() {
    let currentLocation = userCoords.coords;
    if (currentLocation == null)
      return null;

    let sortedByDistance = locations.sort((a, b) => {
      let distance = getDistance(currentLocation, {latitude: a.lat, longitude: a.long});
      let distanceB = getDistance(currentLocation, {latitude: b.lat, longitude: b.long});
      console.log(a.name + ", " + distance);
      console.log(b.name + ", " + distanceB);
      return distance > distanceB ? 1 : -1
    });
    let closePoint = sortedByDistance[0];
    if (getDistance(currentLocation, {latitude: closePoint.lat, longitude: closePoint.long}) <= closePoint.radius) {
      return closePoint;
    }
    return null;
  }

  const CLOSEST_POINT = getClosePoint();
  

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8C2032' }}>
        <Text style={{ fontSize: 25, color: "#fff", padding: 15, position: 'absolute', top: 0 } }>Walk towards a point on the map to learn more!</Text>
        <ImageBackground source = { require('../assets/ecomap.png')} style = {{position: 'absolute', top: 100, width: MAP_WIDTH, height: MAP_HEIGHT}}/>

        <TouchableOpacity style = {[ styles.mapPoint, {position: 'absolute', top:locations[0].pixelCoords.y, right: locations[0].pixelCoords.x} ]} onPress={() => navigation.navigate('PointInfo', locations[0])}></TouchableOpacity>
        <TouchableOpacity style = {[ styles.mapPoint, {position: 'absolute', top:locations[1].pixelCoords.y, right: locations[1].pixelCoords.x} ]} onPress={() => navigation.navigate('PointInfo', locations[1])}></TouchableOpacity>

        { /* the point of the user on the map using the current latitude and longitude */ }
        <TouchableOpacity style = {[ styles.userPoint, {position: 'absolute', top: userCoords.pixelCoords.y, right: userCoords.pixelCoords.x} ]}></TouchableOpacity>

        <TouchableOpacity
          style={[{ bottom: 0, position: 'absolute', alignItems: 'center' }, globalStyles.noInteractionButton ]}
          onPress={() => {
            if (CLOSEST_POINT == null)
              return;
            navigation.navigate('PointInfo', CLOSEST_POINT);
          }}>
          <Image source={CLOSEST_POINT == null ? require('../assets/PointInteractionButton.png') : require("../assets/PointInteractionButton2.png")} style = {{width: 170, height:170 }}/>
        </TouchableOpacity>

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
