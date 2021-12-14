/*
 * Screen that contains questions about the user's current location.
 * @author: Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
 * 11/16/2021
 */

import React, { useEffect, useState } from 'react';
import {
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';
import {
    HeaderButtons,
    HeaderButton,
    Item
} from 'react-navigation-header-buttons';

export default function ListScreen({ route, navigation }) {
    const [isDataDownloading, setIsDataDownloading] = useState(true);
    const [questions, setQuestion] = useState([]);
    const [answers, setAnswer] = useState([]);
    const [locations, setLocation] = useState([]);
    const [user, setUser] = useState([]);
    const [buttonColor, setButtonColor] = useState("#8C2032");
    const [textSubmit, setTextSubmit] = useState("Submitted");
    const myTextInput = React.createRef();
    const [text, setText] = useState('');
    //Fetch Questions
    useEffect(() => {
        if (isDataDownloading) {
            fetch('https://hello-campus.herokuapp.com/questions/')
                .then((response) => {
                    let data = response.json();
                    console.log(JSON.stringify(data));
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
    })
    //Fetch Points of Interest
    useEffect(() => {
        if (isDataDownloading) {
            fetch(`https://hello-campus.herokuapp.com/pointsofinterest/`)
                .then((response) => {
                    let data = response.json();
                    console.log(JSON.stringify(data));
                    return data;
                })
                .then((json) => setLocation(json))
                .catch((error) => {
                })
                .finally(() => {
                    setIsDataDownloading(false);
                }
                );
        }
    }, [])
    //Fetch Users By Email
    useEffect(() => {
        if (isDataDownloading) {
            fetch(`https://hello-campus.herokuapp.com/usersByEmail/${route.params.user.email}`)

                .then((response) => {
                    let data = response.json();
                    console.log(JSON.stringify(data));
                    return data;
                })
                .then((json) => setUser(json))
                .catch((error) => {
                })
                .finally(() => {
                    setIsDataDownloading(false);
                }
                );
        }
    }, [])
    //Fetch users by ID
    useEffect(() => {
        if (isDataDownloading) {
            fetch('https://hello-campus.herokuapp.com/answersForPerson/' + route.params.user.id)

                .then((response) => {
                    let data = response.json();
                    console.log(JSON.stringify(data));
                    console.log("Successfully downloaded question data.");
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

    function submit(questionId) {
        console.log(text);
        console.log(questionId);
        console.log(route.params.user.id);

        fetch(`https://hello-campus.herokuapp.com/updateAnswer/`,
            {
                method: 'PUT',
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({
                    personID: route.params.user.id,
                    questionID: questionId,
                    answer: text,
                })
            })
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#8C2032' }}>
            <ImageBackground source={require('../assets/good.jpg')} style={{ flex: 1, backgroundColor: '#8C2032' }}>
                <Text style={{ fontSize: 22, color: "maroon", padding: 20, padding: 10, flex: 2 }}>Questions and responses for {route.params.user.email},</Text>
                {isDataDownloading ? <ActivityIndicator /> :
                    locations.map(location => {
                        return [
                            <TouchableOpacity onPress={() => navigation.navigate("PointInfo", { locationName: (location.name), info: (location.info) })}>
                                <Text key={location.id} style={globalStyles.list}>
                                    {location.name}
                                </Text>
                            </TouchableOpacity>,

                            questions.map(question => {
                                if (question.pointid == location.id) {
                                    return [
                                        <Text
                                            key={question.id}
                                            style={{ fontSize: 25, color: "#fff", padding: 20, justifyContent: 'space-between' }}>{question.question}
                                        </Text>,
                                        answers.map(answer => {
                                            if (answer.questionid == question.id) {
                                                return [
                                                    <TextInput
                                                        key={question.id + 1000}
                                                        editable={true}
                                                        ref={myTextInput}
                                                        style={globalStyles.input}
                                                        multiline={true}
                                                        numberOfLines={3}
                                                        defaultValue={answer.answer}
                                                        onChangeText={text => { setText(text), setButtonColor("yellow"), setTextSubmit("Submit") }}
                                                    />,
                                                    <TouchableOpacity key={question.id + 100} style={{
                                                        width: "30%",
                                                        height: "10%",
                                                        borderRadius: 10,
                                                        height: 60,
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        marginTop: 10,
                                                        alignSelf: 'flex-end',
                                                        right: 40,
                                                        backgroundColor: "maroon",
                                                    }} onPress={() => { submit(question.id), console.log("SUBMITTED!"), setButtonColor("#8C2032"), setTextSubmit("Submitted") }}>
                                                        <Text style={{ color: "#fff", fontWeight: "bold" }}>{textSubmit}</Text>
                                                    </TouchableOpacity>,
                                                ]
                                            }
                                        }),
                                    ]
                                }
                            })
                        ]
                    })}
            </ImageBackground>
        </ScrollView>
    );
}

