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
    const pointId = route.params.id
    data = []

    useEffect (() => {
        if (isDataDownloading) {
            fetch('https://hello-campus.herokuapp.com/questionsAtPoint/:${pointId}')
            .then((response) => response.json())
            .then(
                (json) => setQuestion(json),
                data = json.items)
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8C2032' }}>
            <Text style={{ fontSize: 30, color: "#fff", padding: 20 }}>{ route.params.name }</Text>
            <Text style={{ fontSize: 30, color: "#fff", padding: 20 }}>{ data.question }</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={Text}
            />
            <Text style={ globalStyles.Question }>{ route.params.description }</Text>
        </View>
    );
}