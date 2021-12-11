/* map.js  Screen that contains the map and different points of interest
Team HUH?!
10/6/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
adapted from the navigation tutorial found at: https://reactnavigation.org/docs/navigating
*/

import React, { useState, useEffect } from "react";
import {
	Image,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ImageBackground,
	Touchable,
	StyleSheet,
	ActivityIndicator,
	Vibration,
	Animated,
} from "react-native";
import { globalStyles } from "../styles/global";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { getDistance } from "geolib";
import Prompt from "./prompt";
import {
	scaleCoordsToPixelCoords,
	isCoordWithinBoundaries,
} from "../models/PointOfInterest";
import { TEST_POINTS_OF_INTEREST as TEST_POINTS_OF_INTEREST } from "../models/TestData.js";
import { useRoute } from "@react-navigation/native";
import { HomeScreen } from "./home";
import MapInfoText from "../components/mapInfoText";
import InteractionButton from "../components/interactionButton";

const USE_TEST_DATA = false;

const MAP_WIDTH = 400;
const MAP_HEIGHT = 461.487;
const MAP_Y = 90;
const MAP_X = 0;

const POINT_WIDTH = 50;
const POINT_HEIGHT = 50;

const LOCATION_REFRESH_INTERVAL = 2000;

function realToPixelCoords(point) {
	// quick and dirty method to get rid of locations that are off the map to prevent wraparound
	if (!isCoordWithinBoundaries(point)) {
		return { x: -500, y: -500 };
	}

    let pixelCoords = scaleCoordsToPixelCoords(point, MAP_WIDTH, MAP_HEIGHT + MAP_Y, MAP_X, MAP_Y);

    // account for the size of the dotu
    pixelCoords.x -= POINT_WIDTH / 2;
    pixelCoords.y -= POINT_HEIGHT / 2;

	// account for the size of the dot
	pixelCoords.x -= POINT_WIDTH / 2;
	pixelCoords.y -= POINT_HEIGHT / 2;

	return pixelCoords;
}

export default function MapScreen({ route, navigation }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                    <Item
                        title="location-list"
                        iconName="md-home"
                        color="maroon"
                        onPress={() => {
                            navigation.navigate("Home")
                        }}
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation]);

    const [errorMsg, setErrorMsg] = useState(null); // TODO: do something with errorMsg
    const [userLocation, setUserLocation] = useState({ pixelCoords: { x: null, y: null }, realCoords: { latitude: null, longitude: null } });

    const [isDataDownloading, setIsDataDownloading] = useState(true);
    const [pointsOfInterest, setPointsOfInterest] = useState([]);
    const [helpModalVisible, setHelpModalVisible] = useState(false);

    const IoniconsHeaderButton = (props) => (
        <HeaderButton IconComponent={Ionicons} iconSize={45} {...props} />
    );

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () =>
            (
                <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                    <Item
                        title={"location-list"}
                        iconName={"md-list-circle"}
                        color="maroon"
                        onPress={() => {
                            navigation.navigate("Points of Interest")
                        }}
                    />
                    <Item
                        title={"help"}
                        iconName={"help-circle"}
                        color="maroon"
                        onPress={() => {
                            setHelpModalVisible(!helpModalVisible)
                        }
                        }
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation])

	useEffect(() => {
		async function checkForLocationPermissions() {
			// let { status } = await Location.requestForegroundPermissionsAsync();
			// const hasPermissions = status === "granted";
			// if (!hasPermissions) {
			// 	console.log("Permission problem: status is " + status);
			// 	setErrorMsg("Permission to access location was denied");
			// }
			// return hasPermissions;
		}

		async function getCurrentLatLong() {
			// const locationPromise = await Location.getCurrentPositionAsync({
			// 	accuracy: Location.Accuracy.Highest,
			// });
			// return locationPromise.coords;
		}

		async function refreshLocation() {
			// const locations = global.locations;
			// console.log(locations);

			// // get geographical coordinates
			// const realCoords = null;//await getCurrentLatLong();
			// if (realCoords == null) {
			// 	console.log("null coords");
			// 	return;
			// }

			// // convert to on-screen coordinates
			// const pixelCoords = realToPixelCoords({
			// 	name: "user's location",
			// 	latitude: realCoords.latitude,
			// 	longitude: realCoords.longitude,
			// });

			// // console.log("Latitude, longitude: " + realCoords.latitude + ", " + realCoords.longitude);
			// // console.log("Screen coords: " + pixelCoords.x + ", " + pixelCoords.y);

			// // update the location
			// setUserLocation({
			// 	realCoords: realCoords,
			// 	pixelCoords: pixelCoords,
			// });
		}

		async function downloadPointsFromService() {
			let downloadedPoints = null;
			try {
				const response = await fetch(`https://hello-campus.herokuapp.com/pointsofinterest/`);
				downloadedPoints = response.json();
			} catch (error) {
				console.log(error);
			}
			return downloadedPoints;
		}

		async function initPointsOfInterest() {
			if (isDataDownloading) {
				if (USE_TEST_DATA) {
					console.log("Using test point of interest data.");
					setPointsOfInterest(TEST_POINTS_OF_INTEREST);
				} else {
					console.log("Downloading point of interest data from the dataservice...");

					let points = await downloadPointsFromService();
					if (points == null) {
						console.log("Error downloading point of interest data!");
						points = [];
					} else {
						console.log("Successfully downloaded point of interest data!");
					}
					setPointsOfInterest(points);
				}
				setIsDataDownloading(false);
			}
		}

		initPointsOfInterest();

		// const hasLocationPermissions = checkForLocationPermissions();
		// if (!hasLocationPermissions) {
		// 	// if we still don't have location permissions, there's just no point in continuing
		// 	return;
		// }

		// refresh the location on an interval
		// const locationRefreshIntervalHandle = setInterval(
		// 	refreshLocation,
		// 	LOCATION_REFRESH_INTERVAL
		// );

		return () => clearInterval(locationRefreshIntervalHandle); // end the interval'd calls when the screen is unmounted
	}, []);

    const userHasLocation = userLocation.realCoords?.latitude != null;
	const userPixelCoords = userHasLocation
        ? realToPixelCoords(userLocation.realCoords)
        : { x: -500, y: -500 };

	function getClosestPoint() {
        const currentLocation = userLocation.realCoords;
		const sortedByDistance = pointsOfInterest.sort((a, b) => {
			const distanceA = getDistance(currentLocation, {
				latitude: a.latitude,
				longitude: a.longitude,
			});
			const distanceB = getDistance(currentLocation, {
				latitude: b.latitude,
				longitude: b.longitude,
			});

			// TODO: have some setting for debug output, it's spamming my console
			// console.log("Distance to " + a.name + ": " + distanceA + " meters");
			// console.log("Distance to " + b.name + ": " + distanceB + " meters");
			return distanceA > distanceB ? 1 : -1;
		});

        const point = sortedByDistance[0];
		return [point, getDistance(currentLocation, point)];
	}
	
    //add the user to the map screen
    //props.route.params
    //const { user } = route.params;
    //const {userId} = route.params;
    //console.log("user from google", user);

    const [ closestPoint, distanceToPoint ] = getClosestPoint();
    const pointIsInRange = closestPoint != null && distanceToPoint <= closestPoint.radius;

	if (closestPoint != null) {
		console.log("You are " + distanceToPoint + " meters away from " + closestPoint.name + ", which has a radius of " + closestPoint.radius + ".");
	}

	let textMessage = distanceToPoint + " meters away from " + closestPoint.name + ", which has a radius of " + closestPoint.radius
		// route.params == null
		// 	? "Walk towards a point on the map."
		// 	: "Welcome " +
		// 	  route.params.user.given_name +
		// 	  ", walk towards a point to answer questions.";
		
	return (
		<ImageBackground source={require('../assets/light_background.jpg')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8C2032' }}>
			<Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", padding: 10, position: 'absolute', top: 30, marginRight: 80 }}>{textMessage}</Text>
			<ImageBackground source={require('../assets/ecomap.png')} style={{ position: 'absolute', top: 100, width: MAP_WIDTH, height: MAP_HEIGHT }} />
			<Modal
                animationType="fade"
                transparent={true}
                visible={helpModalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setHelpModalVisible(!helpModalVisible);
                }}
            >
                <View style={globalStyles.helpModal}>
                    <Text style={globalStyles.helpText}>Press "HOME" to go back to home screen.</Text>
                    <Text style={globalStyles.helpText}>Press the list icon to gain access to all the locations.</Text>
                    <Text style={globalStyles.helpText}>
                        The exclamation mark button is an interaction button that will turn green
                        when you are near a point of interest.
                    </Text>
                    <Text style={globalStyles.helpText}>Press points on the map to open the location's description</Text>
                    <TouchableOpacity style={{ backgroundColor: "maroon", margin: 10, borderRadius: 15 }}
                        onPress={() => {
                            setHelpModalVisible(!helpModalVisible)
                        }
                        }>
                        <Text style={{ color: "#fff", fontSize: 25, margin: 10 }}>EXIT</Text>
                    </TouchableOpacity>

                </View>
            </Modal>

			{/* dynamically generate the point components from the data */}
			{isDataDownloading
                ? (<ActivityIndicator/>)
                : (pointsOfInterest.map((point) => {
					let pixelCoords = realToPixelCoords(point);
					return (
						<TouchableOpacity
							key={point.id}
							style={[
								styles.mapPoint,
								{
									position: "absolute",
									top: pixelCoords.y,
									right: pixelCoords.x,
								},
							]}
							onPress={
								(() => navigation.navigate("Questions", {
                                    point: closestPoint,
                                    user: route.params.user,
                                }), Vibration.cancel())
							}
						/>
					);
				})
			)}

			{/* the point of the user on the map using the current latitude and longitude */}
			<TouchableOpacity
				style={[
					styles.userPoint,
					{
						position: "absolute",
						/* if there's no position to pull from, make the point go bye-bye */
						top: userPixelCoords.y,
						right: userPixelCoords.x,
					},
				]}/>

			<TouchableOpacity
				style={[
					{ bottom: 0, position: "absolute", alignItems: "center" },
					globalStyles.noInteractionButton,
				]}
				onPress={() => {
					if (!pointIsInRange) {
						console.log("No close point!");
						return;
					}

					if (route.params == null) {
						//ie we are not logged in...
						navigation.navigate("PointInfo", closestPoint);
					} else {
						//if the user is logged in (need to update further)
						navigation.navigate("Questions", {
							point: closestPoint,
							user: route.params.user,
						}); //This is a user from google not necc. the user from our DB, should update!
					}
				}}>
				<Image
					source={
						pointIsInRange
							? require("../assets/PointInteractionButton2.png")
							: require("../assets/PointInteractionButton.png")
					}
					style={{ width: 170, height: 170 }}/>
			</TouchableOpacity>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	map: {
		width: 400,
		height: 400,
		top: 90,
	},
	mapPoint: {
		width: 50,
		height: 50,
		borderRadius: 100,
		backgroundColor: "yellow",
		borderWidth: 3,
		borderColor: "#ced20c",
		opacity: 0.5,
	},
	userPoint: {
		width: 10,
		height: 10,
		borderRadius: 100,
		backgroundColor: "blue",
		borderWidth: 1,
		borderColor: "grey",
	},
	container1: {
		flex: 1,
		...StyleSheet.absoluteFillObject,
		alignSelf: "flex-end",
		marginTop: 25,
		marginRight: 10,
		left: 300,
		right: 10,

		// position: 'absolute', // add if dont work with above
	},
});

const LOCATION_TASK_NAME = "hellocampus";

// let { status } = await Location.requestBackgroundPermissionsAsync();
const hasPermissions = true;//status === "granted";
if (!hasPermissions) {
	console.log("Permission problem: status is " + status);
	setErrorMsg("Permission to access location was denied");
} else {
	// https://docs.expo.dev/versions/latest/sdk/task-manager/
	// https://docs.expo.dev/versions/latest/sdk/location/#background-location-methods
	TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
		if (error) {
			// Error occurred - check `error.message` for more details.
			return;
		}

		if (data) {
			const { locations } = data;
			// do something with the locations captured in the background
	
			// bad bad bad bad ew ew ew ew
			global.userLocations = locations;

			for (let i = 0; i < locations.length; i++) {
				console.log(i + ": " + locations[i].timestamp + " - " + locations[i].coords.latitude + ", " + locations[i].coords.longitude);
			}

			console.log(locations);
		}
	});
	Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
		activityType: Location.LocationActivityType.Fitness,
		showsBackgroundLocationIndicator: true
	});
}