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

const LOCATION_TASK_NAME = "ecopreserve-location-task";

const MAP_WIDTH = 400;
const MAP_HEIGHT = 461.487;
const MAP_Y = 90;
const MAP_X = 0;

const POINT_WIDTH = 50;
const POINT_HEIGHT = 50;

const REAL_UPPER_LEFT_CORNER_COORD = { lat: 42.93532617951739, long: -85.58525936106732 };
const REAL_LOWER_RIGHT_CORNER_COORD = { lat: 42.9297585579178, long: -85.57842713530987 };

// for testing
const PRINCE_CONFERENCE_CENTER_COORDS = { lat: 42.930270650358146, long: -85.5834892691921 };
const PRINCE_SCREEN_COORDS = realToPixelCoords(PRINCE_CONFERENCE_CENTER_COORDS.lat, PRINCE_CONFERENCE_CENTER_COORDS.long);

// a list of different locations on the map (only 2 for this prototype)
// TODO: there should be a better way of setting up these points of interest. having a variable for the coords and then a list entry is lame
const WHISKEY_POND_COORDS = { lat: 42.93264295748676, long: -85.5831781329471 };
const CROWN_GAP_COORDS = { lat: 42.93374267151409, long: -85.58030280488913 };
const POINTS_OF_INTEREST = [
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

function scaleValue(value, oldMin, oldMax, newMin, newMax) {
  return ((value - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
}

function realToPixelCoords(lat, long) {
  let pixelX = MAP_WIDTH - scaleValue(-long, -REAL_UPPER_LEFT_CORNER_COORD.long, -REAL_LOWER_RIGHT_CORNER_COORD.long, MAP_X, MAP_WIDTH);
  pixelX -= POINT_WIDTH / 2;

  let pixelY = MAP_HEIGHT - scaleValue(lat, REAL_LOWER_RIGHT_CORNER_COORD.lat, REAL_UPPER_LEFT_CORNER_COORD.lat, 0, MAP_HEIGHT);
  pixelY += MAP_Y;
  pixelY -= POINT_HEIGHT / 2;

  return { x: pixelX, y: pixelY };
}

export default function MapScreen({navigation}) {
  const [watcher, setWatcher] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userLocation, setUserLocation] = useState({ pixelCoords: { x: null, y: null }, realCoords: { latitude: null, longitude: null } });
    
  useEffect(() => {
    // better pattern for async stuff in useEffect as per https://stackoverflow.com/a/53572588
    async function updateLocation() {
      // lots of good location stuff from https://stackoverflow.com/a/58878212
      // await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      //   accuracy: Location.Accuracy.Highest,
      //   distanceInterval: 1,
      //   timeInterval: 1000
      // });

      // todo: figure why this doesn't update often enough or find better method
      let locationResult = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 1,
        timeInterval: 1000
      },
      ({coords}) => {
        if (coords == null) {
          console.log("null coords");
          return;
        }

        let pixelCoords = realToPixelCoords(coords.latitude, coords.longitude);
        console.log("Latitude, longitude: " + coords.latitude + ", " + coords.longitude);
        console.log("Screen coords: " + pixelCoords.x + ", " + pixelCoords.y);
        setUserLocation({ realCoords: coords, pixelCoords: pixelCoords });
      }).then((locationWatcher) => {
        setWatcher(locationWatcher);
      }).catch((err) => {
        console.log(err);
      });
      return locationResult;
      // () => {
      //   // TODO: find out if watcher.remove() here interferes with location updates and if we need it

      //   // watcher.remove();
      //   // TODO: make sure this is getting called when the screen is left.
      //   // If it's not called then we could have a memory leak.
      // }
    }

    async function askForPermissionAndUpdateLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Permission problem: status is " + status);
        setErrorMsg('Permission to access location was denied');
        return null;
      } else {
        return await updateLocation();
      }
    }

    let result = askForPermissionAndUpdateLocation();
  }, [])

  function getClosePoint() {
    let currentLocation = userLocation.realCoords;    
    if (currentLocation.latitude == null)
      return null;

    let sortedByDistance = POINTS_OF_INTEREST.sort((a, b) => {
      let distanceA = getDistance(currentLocation, {latitude: a.lat, longitude: a.long});
      let distanceB = getDistance(currentLocation, {latitude: b.lat, longitude: b.long});

      console.log("Distance to " + a.name + ": " + distanceA + " meters");
      console.log("Distance to " + b.name + ": " + distanceB + " meters");
      return distanceA > distanceB ? 1 : -1
    });
    
    let closePoint = sortedByDistance[0];
    // TODO: don't get the distance twice, this sucks
    if (getDistance(currentLocation, {latitude: closePoint.lat, longitude: closePoint.long}) <= closePoint.radius) {
      return closePoint;
    }
    return null;
  }

  const closestPoint = getClosePoint();

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8C2032' }}>
        <Text style={{ fontSize: 25, color: "#fff", padding: 15, position: 'absolute', top: 0 } }>Walk towards a point on the map to learn more!</Text>
        <ImageBackground source = { require('../assets/ecomap.png')} style = {{position: 'absolute', top: 100, width: MAP_WIDTH, height: MAP_HEIGHT}}/>

        <TouchableOpacity style = {[ styles.mapPoint, {position: 'absolute', top:POINTS_OF_INTEREST[0].pixelCoords.y, right: POINTS_OF_INTEREST[0].pixelCoords.x} ]} onPress={() => navigation.navigate('PointInfo', POINTS_OF_INTEREST[0])}></TouchableOpacity>
        <TouchableOpacity style = {[ styles.mapPoint, {position: 'absolute', top:POINTS_OF_INTEREST[1].pixelCoords.y, right: POINTS_OF_INTEREST[1].pixelCoords.x} ]} onPress={() => navigation.navigate('PointInfo', POINTS_OF_INTEREST[1])}></TouchableOpacity>

        { /* the point of the user on the map using the current latitude and longitude */ }
        <TouchableOpacity style = {[
          styles.userPoint,
          {
            position: 'absolute',
            /* if there's no position to pull from, make the point go bye-bye */
            top: userLocation.pixelCoords.y != null ? userLocation.pixelCoords.y : -500,
            right: userLocation.pixelCoords.x != null ? userLocation.pixelCoords.x : -500
          }
        ]}/>

        <TouchableOpacity
          style={[{ bottom: 0, position: 'absolute', alignItems: 'center' }, globalStyles.noInteractionButton ]}
          onPress={() => {
            if (closestPoint == null)
              return;
            navigation.navigate('PointInfo', closestPoint);
          }}>
          <Image source={closestPoint == null ? require('../assets/PointInteractionButton.png') : require("../assets/PointInteractionButton2.png")} style = {{width: 170, height:170 }}/>
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
