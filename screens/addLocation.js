/**
 * Screen that allows professors to add a location
 *
 * @author: Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
 * 12/10/2021
 */

 import React, { useEffect, useReducer, useState } from 'react';
 import { Image, Button, View, Text, TouchableOpacity, FlatList, ImageBackground, TextInput, ActivityIndicator, ScrollView } from 'react-native';
 import { globalStyles } from '../styles/global';
 
 
 
export default function AddQuestionsScreen({ navigation, route }) {
    
    const [isDataDownloading, setIsDataDownloading] = useState(true);
    const [location, setLocation] = useState([]);
    // const [latitude, setLatitude] = useState("");
    // const [longitude, setLongitude] = useState("");
    // const [radius, setRadius] = useState("");
    // const [name, setName] = useState("");
    // const [info, setInfo] = useState("");
    const [text, onChangeText] = React.useState("Useless Text");

 
    useEffect (() => {
        // setIsDataDownloading(true)
        // console.log("got to useEffect")
        // if (isDataDownloading) {
        //     fetch(`https://hello-campus.herokuapp.com/questionsAtPoint/${route.params.location.id}/`)
        //     .then((response) => {
        //         let data = response.json();
        //         //console.log("Successfully downloaded question data.");
        //         return data;
        //     })
        //     .then((json) => setQuestion(json))
        //     .then((json) => setNewQuestions(json))
        //     .catch((error) => {
        //         //console.log("Error downloading question data: " + error);
        //     })
        //     .finally(() => {
        //         setIsDataDownloading(false);
        //     }
        // );
        // }
    }, [])
     
    const submit = () => {
        fetch(`https://hello-campus.herokuapp.com/pointsOfInterest/`,
        { method: 'POST',
        headers: new Headers({
            "Content-Type":"application/json"
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
                [Text]:text
              }));
        }
    }
 
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#8C2032' }}>
            <Text style={{ fontSize: 40, color: "#fff", padding: 10, marginBottom:30, fontWeight: 'bold', flex:2 }}>Add a Location</Text>
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
            <TouchableOpacity style={globalStyles.submitQuestion} onPress={() => {submit(), navigation.replace("Location List", navigation.navigate("Location List"))}}>
                <Text style={globalStyles.submitText}>Add</Text>
            </TouchableOpacity>
        </ScrollView>  
    );
}