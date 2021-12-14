/*
 * Screen that allows professors to add a location
 *
 * @author: Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
 * 12/10/2021
 */

import React, { useEffect, useState } from 'react';
import { Text, View, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';
import {
    HeaderButtons,
    HeaderButton,
    Item
} from 'react-navigation-header-buttons';

export default function AddLocationScreen({ navigation, route }) {
    const [isDataDownloading, setIsDataDownloading] = useState(true);
    const [location, setLocation] = useState([]);

    const [helpModalVisible, setHelpModalVisible] = useState(false);
    const [DBuser, setDBuser] = useState([]);
    const IoniconsHeaderButton = (props) => (
        <HeaderButton IconComponent={Ionicons} iconSize={40} {...props} />
    );

    //https://docs.expo.dev/versions/v43.0.0/sdk/app-auth/#usage
    let [authState, setAuthState, userId] = useState(null);
    useEffect(() => {
        (async () => {
            let cachedAuth = await getCachedAuthAsync();
            if (cachedAuth && !authState) {
                setAuthState(cachedAuth);
            }
        })();
    }, []);


    //let myclientId = Platform.OS =="android" ? andoidClientId : iosClientId;
    //location screen is logged in
    //points of interest is what the general user should see

    let isSignedIn = authState == null ? false : true;
    let screenToNavigateTo = isSignedIn == true ? "Location" : "Points of Interest";

    React.useLayoutEffect(() => {
        /*(async () => {
            let cachedAuth = await getCachedAuthAsync();
            if (cachedAuth == null) {
                screenToNavigateTo = "Points of Interest";
            }else{
                screenToNavigateTo = "Location";
            }
          })(screenToNavigateTo);
    */
        //let isSignedIn = authState == null ? false : true;
        //let screenToNavigateTo = isSignedIn == true ? "Location" : "Points of Interest";
        let myScreen = screenToNavigateTo;
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                    <Item
                        title={"help"}
                        iconName={"help-circle"}
                        color="maroon"
                        onPress={() => {
                            setHelpModalVisible(!helpModalVisible)
                        }}
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation])

    useEffect(() => {

    }, [])

    const submit = () => {
        fetch(`https://hello-campus.herokuapp.com/pointsOfInterest/`,
            {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({

                    latitude: location.latitude,

                    longitude: location.longitude,

                    radius: location.radius,

                    name: location.name,

                    info: location.info,

                    imageURL: null
                })
            })
    }

    function _handleMultiInput(Text) {
        return (text) => {
            setLocation(prevState => ({
                ...prevState,
                [Text]: text
            }));
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#8C2032' }}>
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
                    <Text style={globalStyles.helpText}>Press text box to add location information, then press "ADD" when finished.</Text>
                    <TouchableOpacity style={{ backgroundColor: "maroon", margin: 10, borderRadius: 15 }}
                        onPress={() => {
                            setHelpModalVisible(!helpModalVisible)
                        }}
                    >
                        <Text style={{ color: "#fff", fontSize: 25, margin: 10 }}>EXIT</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Text style={{ fontSize: 40, color: "#fff", padding: 10, marginBottom: 30, fontWeight: 'bold', flex: 2 }}>Add a Location</Text>
            <TextInput
                style={globalStyles.inputPointInfo}
                onChangeText={_handleMultiInput("name")}
                multiline={true}
                placeholder="Name"
            />
            <TextInput
                style={globalStyles.inputPointInfo}
                onChangeText={_handleMultiInput("latitude")}
                multiline={true}
                placeholder="Latitude"
            />
            <TextInput
                style={globalStyles.inputPointInfo}
                onChangeText={_handleMultiInput("longitude")}
                multiline={true}
                placeholder="Longitude"
            />
            <TextInput
                style={globalStyles.inputPointInfo}
                onChangeText={_handleMultiInput("radius")}
                multiline={true}
                placeholder="Radius (in meters)"
                numberOfLines={3}
            />
            <TextInput
                style={globalStyles.inputPointInfo}
                onChangeText={_handleMultiInput("info")}
                multiline={true}
                placeholder="Description"
                numberOfLines={3}
            />
            <TouchableOpacity style={globalStyles.submitQuestion} onPress={() => { submit(), navigation.replace("Location List", navigation.navigate("Location List")) }}>
                <Text style={globalStyles.submitText}>Add</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}