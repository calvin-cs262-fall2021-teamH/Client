/* list.js screen that allows user to check off locations that they have already visited
Team HUH?!
11/11/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
*/



import { globalStyles } from '../styles/global';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';


export default function SignedOutLocationList({ route, navigation }) {
    const [isDataDownloading, setIsDataDownloading] = useState(true);
    const [locations, setLocation] = useState([]);
    const [questions, setQuestion] = useState([]);
    const [answers, setAnswer] = useState([]);
    const [users, setUser] = useState([]);
    useEffect (() => {
        if (isDataDownloading) {
            fetch(`https://hello-campus.herokuapp.com/pointsofinterest/`)
            .then((response) => {
                let data = response.json();
                console.log(JSON.stringify(data));
                //console.log("Successfully downloaded question data.");
                return data;
            })
            .then((json) => setLocation(json))
            .catch((error) => {
                //console.log("Error downloading question data: " + error);
            })
            .finally(() => {
                setIsDataDownloading(false);
            }
        );
        }
    }, [])

    useEffect (() => {
        if (isDataDownloading) {
            fetch(`https://hello-campus.herokuapp.com/questions/`)
            .then((response) => {
                let data = response.json();
                console.log(JSON.stringify(data));
                //console.log("Successfully downloaded question data.");
                return data;
            })
            .then((json) => setQuestion(json))
            .catch((error) => {
                //console.log("Error downloading question data: " + error);
            })
            .finally(() => {
                setIsDataDownloading(false);
            }
        );
        }
    }, [])

    useEffect (() => {
        if (isDataDownloading) {
            fetch(`https://hello-campus.herokuapp.com/answers/`)
            .then((response) => {
                let data = response.json();
                console.log(JSON.stringify(data));
                //console.log("Successfully downloaded question data.");
                return data;
            })
            .then((json) => setAnswer(json))
            .catch((error) => {
                //console.log("Error downloading question data: " + error);
            })
            .finally(() => {
                setIsDataDownloading(false);
            }
        );
        }
    }, [])

    useEffect (() => {
        if (isDataDownloading) {
            fetch(`https://hello-campus.herokuapp.com/users/`)
            .then((response) => {
                let data = response.json();
                console.log(JSON.stringify(data));
                //console.log("Successfully downloaded question data.");
                return data;
            })
            .then((json) => setUser(json))
            .catch((error) => {
                //console.log("Error downloading question data: " + error);
            })
            .finally(() => {
                setIsDataDownloading(false);
            }
        );
        }
    }, [])

locations.map(location=>
    console.log(location.name, "THIs is in the other part")
    )
    //console.log(route.params.isSignedIn, "THIS IS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

    return (
        <ImageBackground source = {require('../assets/light_background.jpg')} style={styles.container}>
          <ScrollView>
                { isDataDownloading ? <ActivityIndicator/> :
                    locations.map(location =>
                         // locationName= location.name
                         // locationInfo = location.info
                        <View>
                            <TouchableOpacity onPress = {()=> navigation.navigate("PointInfo", {locationName:(location.name), info: (location.info)})}>
                               
                              <Text key = {location.id} style={globalStyles.list}>
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