/* list.js screen that allows user to check off locations that they have already visited
Team HUH?!
11/11/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
*/



import { globalStyles } from '../styles/global';
import React, { useState, useEffect } from 'react';
import { View, Modal, Text, ScrollView, ImageBackground, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    HeaderButtons,
    HeaderButton,
    Item
} from 'react-navigation-header-buttons';

export default function SignedOutLocationList({ route, navigation }) {
    const [isDataDownloading, setIsDataDownloading] = useState(true);
    const [locations, setLocation] = useState([]);
    const [questions, setQuestion] = useState([]);
    const [answers, setAnswer] = useState([]);
    const [users, setUser] = useState([]);

    const [helpModalVisible, setHelpModalVisible] = useState(false);
    const [DBuser, setDBuser] = useState([]);
    const IoniconsHeaderButton = (props) => (
        <HeaderButton IconComponent={Ionicons} iconSize={40} {...props} />
    );

    React.useLayoutEffect(() => {
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
        if (isDataDownloading) {
            fetch(`https://hello-campus.herokuapp.com/pointsofinterest/`)
                .then((response) => {
                    let data = response.json();
                    return data;
                })
                .then((json) => setLocation(json))
                .catch((error) => {
                    console.log("Error downloading location data: " + error);
                })
                .finally(() => {
                    setIsDataDownloading(false);
                }
                );
        }
    }, [])

    useEffect(() => {
        if (isDataDownloading) {
            fetch(`https://hello-campus.herokuapp.com/questions/`)
                .then((response) => {
                    let data = response.json();
                    return data;
                })
                .then((json) => setQuestion(json))
                .catch((error) => {
                    console.log("Error downloading question data: " + error);
                })
                .finally(() => {
                    setIsDataDownloading(false);
                }
                );
        }
    }, [])

    useEffect(() => {
        if (isDataDownloading) {
            fetch(`https://hello-campus.herokuapp.com/answers/`)
                .then((response) => {
                    let data = response.json();
                    return data;
                })
                .then((json) => setAnswer(json))
                .catch((error) => {
                    console.log("Error downloading answer data: " + error);
                })
                .finally(() => {
                    setIsDataDownloading(false);
                }
                );
        }
    }, [])

    useEffect(() => {
        if (isDataDownloading) {
            fetch(`https://hello-campus.herokuapp.com/users/`)
                .then((response) => {
                    let data = response.json();
                    return data;
                })
                .then((json) => setUser(json))
                .catch((error) => {
                    console.log("Error downloading user data: " + error);
                })
                .finally(() => {
                    setIsDataDownloading(false);
                }
                );
        }
    }, [])

    return (
        <ImageBackground source={require('../assets/light_background.jpg')} style={styles.container}>
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
                    <Text style={globalStyles.helpText}>Press location's name to see their description.</Text>
                    <TouchableOpacity style={{ backgroundColor: "maroon", margin: 10, borderRadius: 15 }}
                        onPress={() => {
                            setHelpModalVisible(!helpModalVisible)
                        }}
                    >
                        <Text style={{ color: "#fff", fontSize: 25, margin: 10 }}>EXIT</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <ScrollView>
                {isDataDownloading ? <ActivityIndicator /> :
                    locations.map(location =>
                        // locationName= location.name
                        // locationInfo = location.info
                        <View key={location.id + 10000}>
                            <TouchableOpacity key={location.id + 100} onPress={() => navigation.navigate("PointInfo", { name: (location.name), info: (location.info) })}>

                                <Text key={location.id} style={globalStyles.list}>
                                    {location.name}
                                </Text>
                            </TouchableOpacity>
                        </View>

                    )
                }
            </ScrollView>
        </ImageBackground>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#8C2131",
        alignItems: "stretch",
        justifyContent: "flex-start",
    },
});