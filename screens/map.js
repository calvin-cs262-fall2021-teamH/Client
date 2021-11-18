/* map.js  Screen that contains the map and different points of interest
Team HUH?!
10/6/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
adapted from the navigation tutorial found at: https://reactnavigation.org/docs/navigating
*/

import React, { useState, useEffect } from 'react';
import { Image, View, Text, TouchableOpacity, FlatList, ImageBackground, Touchable, StyleSheet, ActivityIndicator } from 'react-native';
import { globalStyles } from '../styles/global';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import { scaleCoordsToPixelCoords, isCoordWithinBoundaries } from '../models/PointOfInterest';
import { TEST_POINTS_OF_INTEREST as TEST_POINTS_OF_INTEREST } from '../models/TestData.js';

const USE_TEST_DATA = true;

const MAP_WIDTH = 400;
const MAP_HEIGHT = 461.487;
const MAP_Y = 90;
const MAP_X = 0;

const POINT_WIDTH = 50;
const POINT_HEIGHT = 50;
    
function realToPixelCoords(point) {
    // quick and dirty method to get rid of locations that are off the map to prevent wraparound
    if (!isCoordWithinBoundaries(point)) {
        return { x: -500, y: -500 };
    }

    let pixelCoords = scaleCoordsToPixelCoords(point, MAP_WIDTH, MAP_HEIGHT + MAP_Y, MAP_X, MAP_Y);
    
    // account for the size of the dot
    pixelCoords.x -= POINT_WIDTH / 2;
    pixelCoords.y -= POINT_HEIGHT / 2;

    return pixelCoords;
}

export default function MapScreen({navigation}) {
    const [watcher, setWatcher] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [userLocation, setUserLocation] = useState({ pixelCoords: { x: null, y: null }, realCoords: { latitude: null, longitude: null } });

    const [isDataDownloading, setIsDataDownloading] = useState(true);
    const [pointsOfInterest, setPointsOfInterest] = useState([]);

    useEffect(() => {
        async function checkForLocationPermissions() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            const hasPermissions = status === 'granted';
            if (!hasPermissions) {
                console.log("Permission problem: status is " + status);
                setErrorMsg('Permission to access location was denied');
            }
            return hasPermissions;
        }

        async function getCurrentLatLong() {
            const locationPromise = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
                distanceInterval: 1
            });
            return locationPromise.coords;
        }

        async function updateLocation() {
            const realCoords = await getCurrentLatLong();
            if (realCoords == null) {
                console.log("null coords");
                return;
            }
    
            const pixelCoords = realToPixelCoords({
                name: "user's location",
                latitude: realCoords.latitude,
                longitude: realCoords.longitude
            });
    
            console.log("Latitude, longitude: " + realCoords.latitude + ", " + realCoords.longitude);
            console.log("Screen coords: " + pixelCoords.x + ", " + pixelCoords.y);
    
            setUserLocation({
                realCoords: realCoords,
                pixelCoords: pixelCoords
            });
        }

        async function downloadDataFromService() {
            const response = null;
            try {
                response = await fetch(`https://hello-campus.herokuapp.com/pointsofinterest/`);
            } catch (error) {
                console.log("Error downloading point of interest data: " + error);
                setIsDataDownloading(true);
                return null;
            }

            return response.json();
        }

        async function initializePointsOfInterest() {
            if (isDataDownloading) {
                if (USE_TEST_DATA) {
                    console.log("Using test point of interest data.");
                    setPointsOfInterest(TEST_POINTS_OF_INTEREST);
                } else {
                    console.log("Downloading point of interest data from the dataservice...");
                    const data = await downloadDataFromService();
                    setPointsOfInterest(data);
                }
                setIsDataDownloading(false);
            }
        }

        initializePointsOfInterest();

        const hasLocationPermissions = checkForLocationPermissions();
        if (!hasLocationPermissions) {
            return;
        }

        const locationUpdateInterval = setInterval(async () => await updateLocation(), 1000);

        return () => {
            clearInterval(locationUpdateInterval);
        };
    }, [])

    function getClosePoint() {
        let currentLocation = userLocation.realCoords;
        if (currentLocation.latitude == null)
            return null;

        let sortedByDistance = TEST_POINTS_OF_INTEREST.sort((a, b) => {
            let distanceA = getDistance(currentLocation, { latitude: a.latitude, longitude: a.longitude });
            let distanceB = getDistance(currentLocation, { latitude: b.latitude, longitude: b.longitude });

            // TODO: have some setting for debug output, it's spamming my console
            console.log("Distance to " + a.name + ": " + distanceA + " meters");
            console.log("Distance to " + b.name + ": " + distanceB + " meters");
            return distanceA > distanceB ? 1 : -1
        });

        let closePoint = sortedByDistance[0];
        // TODO: don't get the distance twice, this sucks
        if (getDistance(currentLocation, { latitude: closePoint.latitude, longitude: closePoint.longitude }) <= closePoint.radius) {
            return closePoint;
        }
        return null;
    }

    const closestPoint = getClosePoint();
    
    let userPixelCoords = userLocation.realCoords.latitude != null ? realToPixelCoords(userLocation.realCoords) : { x: -500, y: -500 };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8C2032' }}>
            <Text style={{ fontSize: 25, color: "#fff", padding: 15, position: 'absolute', top: 0 } }>Walk towards a point on the map to learn more!</Text>
            <ImageBackground source = { require('../assets/ecomap.png')} style = {{position: 'absolute', top: 100, width: MAP_WIDTH, height: MAP_HEIGHT}}/>

            { /* dynamically generate the point components from the data */ }
            { isDataDownloading ? <ActivityIndicator/> :
                pointsOfInterest.map(point => {
                    let pixelCoords = realToPixelCoords(point);
                    return <TouchableOpacity
                                key={point.id  /* this, I suppose, isn't guaranteed to be unique... but it's good enough as a unique key */ }
                                style={[styles.mapPoint, { position: 'absolute', top: pixelCoords.y, right: pixelCoords.x }]}
                                onPress={() => navigation.navigate('PointInfo', point)}
                            />;
                })
            }

            { /* the point of the user on the map using the current latitude and longitude */}
            <TouchableOpacity style={[
                styles.userPoint,
                {
                    position: 'absolute',
                    /* if there's no position to pull from, make the point go bye-bye */
                    top: userPixelCoords.y,
                    right: userPixelCoords.x
                }
            ]} />

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
        height: 400,
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
