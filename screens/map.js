/* map.js  Screen that contains the map and different points of interest
Team HUH?!
10/6/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
adapted from the navigation tutorial found at: https://reactnavigation.org/docs/navigating
*/

import React, { useState, useEffect } from "react";
import {
	Modal,
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
	Dimensions,
} from "react-native";
import { globalStyles } from "../styles/global";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { getDistance } from "geolib";
import * as PointOfInterest from "../models/PointOfInterest";
import { TEST_POINTS_OF_INTEREST as TEST_POINTS_OF_INTEREST } from "../models/TestData.js";
import { useRoute } from "@react-navigation/native";
import { HomeScreen } from "./home";
import MapInfoText from "../components/mapInfoText";
import InteractionButton from "../components/interactionButton";
import {
	HeaderButtons,
	HeaderButton,
	Item,
	HiddenItem,
	OverflowMenu,
} from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import ImageZoom from 'react-native-image-pan-zoom';
import * as Animatable from 'react-native-animatable';

const LOCATION_TASK_NAME = "hellocampus_background_location";

const USE_TEST_DATA = false;

const MAP_IMAGE_WIDTH = 800;
const MAP_IMAGE_HEIGHT = 1035;

const LOCATION_REFRESH_INTERVAL = 2000;

async function checkForLocationPermissions() {
    let { granted } = await Location.getForegroundPermissionsAsync();
    if (granted) {
        return true;
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    const permissionGranted = status === "granted";
    if (!permissionGranted) {
        console.log("Permission problem: status is " + status);
    }

    return permissionGranted;
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

	const [userLocation, setUserLocation] = useState({ pixelCoords: { x: -500, y: -500 }, realCoords: { latitude: 0, longitude: 0 } });

	const [isDataDownloading, setIsDataDownloading] = useState(true);
	const [pointsOfInterest, setPointsOfInterest] = useState([]);
	const [helpModalVisible, setHelpModalVisible] = useState(false);
	const [hasPermission, setHasPermission] = useState(false);

	const [mapPosition, setMapPosition] = useState({ x: MAP_IMAGE_WIDTH / 2, y: MAP_IMAGE_HEIGHT / 2, zoom: 1 });

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
		async function getCurrentLatLong() {
			const locationPromise = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.Highest
			});
			return locationPromise.coords;
		}

		async function updatePermissionStatus() {
            const hasPermissions = await checkForLocationPermissions();
            setHasPermission(hasPermissions);
		}

		async function refreshLocation() {
            let { granted } = await Location.getForegroundPermissionsAsync();
            if (!granted)
                return;
            else if (!hasPermission)
                setHasPermission(true);

			const realCoords = await getCurrentLatLong();
			const pixelCoords = realToPixelCoords({
				name: "user's location",
				latitude: realCoords.latitude,
				longitude: realCoords.longitude
			});

			// update the location
			setUserLocation({
				realCoords: realCoords,
				pixelCoords: pixelCoords,
			});
		}

		async function downloadPointsFromService() {
			let downloadedPoints = null;
			try {
				const response = await fetch(`https://hello-campus.herokuapp.com/pointsofinterest/`);
				downloadedPoints = response.json();
			} catch (error) {
				console.log("Error downloading location data: " + error);
			}
			return downloadedPoints;
		}

		async function initPointsOfInterest() {
			if (isDataDownloading) {
				if (USE_TEST_DATA) {
					setPointsOfInterest(TEST_POINTS_OF_INTEREST);
				} else {
					let points = await downloadPointsFromService();
					if (points == null) {
						console.log("Error downloading point of interest data!");
						points = [];
					}
					setPointsOfInterest(points);
				}
				setIsDataDownloading(false);
			}
		}

        initPointsOfInterest();
        
        updatePermissionStatus();

        // refresh the location on an interval
        const locationRefreshIntervalHandle = setInterval(
            refreshLocation,
            LOCATION_REFRESH_INTERVAL
        );

		return () => {
			clearInterval(locationRefreshIntervalHandle); // end the interval'd calls when the screen is unmounted
		}
	}, []);

	if (!hasPermission) {
		return (
			<ImageBackground
				source={require("../assets/light_background.jpg")}
				style={{
					flex: 1,
					alignItems: "center",
					backgroundColor: "#8C2032",
				}}>
				<Text
					style={{
						fontSize: 20,
						fontWeight: "bold",
						color: "#fff",
						padding: 10,
						position: "relative",
                        textAlign: "center",
						top: 15
					}}
				>Location permissions not granted! Please provide HelloCampus location permissions.</Text>

				<TouchableOpacity
					style={globalStyles.genericButton}
					onPress={async () => {
						await checkForLocationPermissions();
					}}>
					<Text style={globalStyles.genericButtonText}>Request permissions</Text>
				</TouchableOpacity>
			</ImageBackground>
		);
	}

	function realToPixelCoords(point) {
		// quick and dirty method to get rid of locations that are off the map to prevent wraparound
		if (!PointOfInterest.isCoordWithinBoundaries(point)) {
			return { x: -500, y: -500 };
		}

		let pixelCoords = PointOfInterest.scaleCoordsToPixelCoords(
			point,
			0,
			0,
			MAP_IMAGE_WIDTH,
			MAP_IMAGE_HEIGHT
		);

		return pixelCoords;
	}

	const userHasLocation = userLocation.realCoords?.latitude != null;
	const userPixelCoords = userHasLocation
		? realToPixelCoords(userLocation.realCoords)
		: { x: -500, y: -500 };

	function getClosestPoint() {
		const currentLocation = userLocation.realCoords;
		let distance = 1;
		const sortedByDistance = pointsOfInterest.sort((a, b) => {
			const distanceA = getDistance(currentLocation, {
				latitude: a.latitude,
				longitude: a.longitude
			});
			const distanceB = getDistance(currentLocation, {
				latitude: b.latitude,
				longitude: b.longitude
			});

			if (distanceA > distanceB) {
				distance = distanceB;
				return 1;
			} else {
				distance = distanceB;
				return -1;
			}
		});

		const point = sortedByDistance[0];
		return [point, getDistance(currentLocation, { latitude: pointsOfInterest[0].latitude, longitude: pointsOfInterest[0].longitude })];
	}

	const [closestPoint, distanceToPoint] = (pointsOfInterest == null || pointsOfInterest.length == 0) ? [null, null] : getClosestPoint();
	const pointIsInRange = closestPoint != null && distanceToPoint <= closestPoint.radius;

	let textMessage =
		route.params == null
			? "Walk towards a point on the map."
			: "Welcome " +
			route.params.user.given_name +
			", walk towards a point to answer questions.";

	if (closestPoint != null) {
		textMessage = distanceToPoint + " meters away from " + closestPoint.name + ", which has a radius of " + closestPoint.radius + " meters";
	}

	// Some code related to the ImageZoom component was adapted from the Gemma project.
	// https://github.com/Gemma-app/Gemma-client/blob/master/screens/map.jsx
	const horizontal = Dimensions.get('window').width * (1 / mapPosition.zoom);
	const vertical = Dimensions.get('window').height * (1 / mapPosition.zoom);

	return (
		<ImageBackground
			source={require("../assets/good.jpg")}
			style={{
				flex: 1,
				alignItems: "center",
				backgroundColor: "#8C2032",
			}}
		>
			<Text
				style={{
					fontSize: 20,
					fontWeight: "bold",
					color: "#fff",
					padding: 10,
					position: "relative",
					textAlign: "center",
				}}
			>
				{textMessage}
			</Text>

			<View style={{ position: "relative" }}>
				<ImageZoom
					cropWidth={Dimensions.get("window").width}
					cropHeight={Dimensions.get("window").height}
					imageWidth={MAP_IMAGE_WIDTH + horizontal}
					imageHeight={MAP_IMAGE_HEIGHT + vertical}
					pinchToZoom={true}
					panToMove={true}
					minScale={0.5}
					maxScale={5.0}
					enableCenterFocus={false}
					onMove={(event) => {
						setMapPosition({
							x: event.positionX,
							y: event.positionY,
							zoom: event.scale,
						});
					}}
				>
					<ImageBackground
						source={require("../assets/map_lowerres.png")}
						style={{
							position: "absolute",
							height: MAP_IMAGE_HEIGHT,
							width: MAP_IMAGE_WIDTH,
							left: horizontal / 2,
							bottom: vertical / 2,
						}}
					>
						{/* the point of the user on the map using the current latitude and longitude */}
						<TouchableOpacity
							style={[
								styles.userPoint,
								{
									position: "absolute",
									/* if there's no position to pull from, make the point go bye-bye */
									top: userPixelCoords.y,
									left: userPixelCoords.x,
								},
							]}
						/>

						{/* dynamically generate the point components from the data */}
						{isDataDownloading ? (
							<ActivityIndicator />
						) : (
							pointsOfInterest.map((point) => {
								let pixelCoords = realToPixelCoords(point);
								return (
									<TouchableOpacity
										key={point.id}
										style={[
											styles.mapPoint,
											{
												position: "absolute",
												top: pixelCoords.y,
												left: pixelCoords.x,
											},
										]}
										onPress={
											(() =>
												navigation.navigate(
													"Questions",
													{
														point: closestPoint,
														user: route.params.user,
													}
												),
												Vibration.cancel())
										}
									/>
								);
							})
						)}
					</ImageBackground>
				</ImageZoom>
			</View>

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
					<Text style={globalStyles.helpText}>
						Press "HOME" to go back to home screen.
					</Text>
					<Text style={globalStyles.helpText}>
						Press the list icon to gain access to all the locations.
					</Text>
					<Text style={globalStyles.helpText}>
						The exclamation mark button is an interaction button
						that will turn green when you are near a point of
						interest.
					</Text>
					<Text style={globalStyles.helpText}>
						Press points on the map to open the location's
						description
					</Text>
					<TouchableOpacity
						style={{
							backgroundColor: "maroon",
							margin: 10,
							borderRadius: 15,
						}}
						onPress={() => {
							setHelpModalVisible(!helpModalVisible);
						}}
					>
						<Text
							style={{ color: "#fff", fontSize: 25, margin: 10 }}
						>
							EXIT
						</Text>
					</TouchableOpacity>
				</View>
			</Modal>

			<TouchableOpacity
				style={[{ bottom: 0, position: 'absolute', alignItems: 'center' }, globalStyles.noInteractionButton]}
				onPress={() => {
					if (!pointIsInRange) {
						return;
					}
					if (route.params == null) {//ie we are not logged in...
						navigation.navigate('PointInfo', closestPoint);
					} else {//if the user is logged in (need to update further)
						navigation.navigate('Questions', { point: closestPoint, user: route.params.user });//This is a user from google not necc. the user from our DB, should update!
					}
				}}>
				{/* <Image source={!pointIsInRange ? require('../assets/PointInteractionButton.png') : require("../assets/PointInteractionButton.gif")} style = {{width: 170, height:170 }}/> */}
				<Animatable.Image animation="bounceInUp" source={!pointIsInRange ? require('../assets/PointInteractionButton.png') : require("../assets/PointInteractionButton.gif")} style={{ width: 170, height: 170 }}></Animatable.Image>
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
		width: 20,
		height: 20,
		borderRadius: 100,
		backgroundColor: "red",
		borderWidth: 3,
		borderColor: "black",
	},
	userPoint: {
		width: 15,
		height: 15,
		borderRadius: 100,
		backgroundColor: "blue",
		borderWidth: 2,
		borderColor: "black",
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
