/**
 * Screen that contains questions about the user's current location.
 *
 * @author: Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
 * 11/16/2021
 */

import React, { useEffect, useState } from 'react';
import { Image, Button, View, Text, TouchableOpacity, FlatList, ImageBackground, TextInput } from 'react-native';
import { globalStyles } from '../styles/global';



export default function QuestionScreen({ route, navigation }) {
    const [isDataDownloading, setIsDataDownloading] = useState(true);
    const [question, setQuestion] = useState([]);
    data = []
    const [text, onChangeText] = React.useState("Useless Text");

    useEffect (() => {
        if (isDataDownloading) {
            fetch('https://hello-campus.herokuapp.com/questionsAtPoint/${route.params.id}')
            .then((response) => response.json())
            .then((json) => setQuestion(json),
            data = question)
            .catch((error) => {
                console.log("Error downloading question data: " + error);
                setIsDataDownloading(false);
            })
            .finally(() => {
                console.log("Successfully downloaded question data.");
                setIsDataDownloading(false);
            }
        );
        }
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#8C2032' }}>
            <Text style={{ fontSize: 30, color: "#fff", padding: 20, position: "absolute", top: 0 }}>{ route.params.name }</Text>
            <Text style={{ fontSize: 30, color: "#fff", padding: 20 }}>{ data.question }</Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={onChangeText}
                value={text}
            />
        </View>
    );
}