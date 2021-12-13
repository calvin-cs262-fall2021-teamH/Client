/**
 * Screen that allows professors to add locations
 *
 * @author: Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
 * 11/16/2021
 */

import React, { useEffect, useReducer, useState } from 'react';
import { Image, Button, View, Text, TouchableOpacity, FlatList, ImageBackground, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { globalStyles } from '../styles/global';



export default function AddQuestionScreen({ navigation, route }) {

    const [isDataDownloading, setIsDataDownloading] = useState(true);
    const [questions, setQuestion] = useState([]);
    const [newQuestion, setNewQuestion] = useState("");
    const myTextInput = React.createRef();
    const [text, onChangeText] = React.useState("Useless Text");


    useEffect(() => {
        setIsDataDownloading(true)
        console.log("got to useEffect")
        if (isDataDownloading) {
            fetch(`https://hello-campus.herokuapp.com/questionsAtPoint/${route.params.location.id}/`)
                .then((response) => {
                    let data = response.json();
                    //console.log("Successfully downloaded question data.");
                    return data;
                })
                .then((json) => setQuestion(json))
                .then((json) => setNewQuestions(json))
                .catch((error) => {
                    //console.log("Error downloading question data: " + error);
                })
                .finally(() => {
                    setIsDataDownloading(false);
                }
                );
        }
    }, [])

    const submit = () => {
        fetch(`https://hello-campus.herokuapp.com/questions/`,
            {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({

                    pointID: route.params.location.id,

                    question: newQuestion["question"]
                })
            })
            .finally(() => {
                clearInput()
                reloadQuestions()
            }
            )
    }

    const reloadQuestions = () => {
        fetch(`https://hello-campus.herokuapp.com/questionsAtPoint/${route.params.location.id}/`)
            .then((response) => {
                let data = response.json();
                //console.log("Successfully downloaded question data.");
                return data;
            })
            .then((json) => setQuestion(json))
            .then((json) => setNewQuestions(json))
            .catch((error) => {
                //console.log("Error downloading question data: " + error);
            })
            .finally(() => {
                setIsDataDownloading(false);
            }
            );
    }

    const remove = (questionID) => {
        fetch(`https://hello-campus.herokuapp.com/questions/${questionID}/`, { method: 'DELETE' })
            .then(() => {
                console.log("Successfully downloaded question data.");
                reloadQuestions()
            })
    }

    const handleInput = () => {
        return (text) => {
            setNewQuestion(prevState => ({
                ...prevState,
                question: text
            }));
        }
    }

    const clearInput = () => {
        myTextInput.current.clear()
    }

    const mapQuestion = (question) => {
        return (
        questions.map(question => {
            return [
                <Text
                    key={Math.random()+Date.now()}
                    style={{ fontSize: 25, color: "#fff", padding: 20, justifyContent:'space-between' }}>{question.question}</Text>,
                <TouchableOpacity key={Math.random()+Date.now()} style={globalStyles.deleteQuestion} onPress={() => {remove(question.id)}}>
                    <Text style={globalStyles.submitText}>Delete</Text>
                </TouchableOpacity>
            ]
            })
        )
    }

    return (

        <ScrollView style={{ flex: 1, backgroundColor: '#8C2032' }}>
            <ImageBackground source={require('../assets/good.jpg')} style={{ alignItems: 'flex-start', backgroundColor: '#8C2032' }}>
                <Text style={{ fontSize: 40, color: "white", padding: 15, marginBottom: 30, fontWeight: 'bold', flex: 2, backgroundColor:"maroon", width: 1000}}>{route.params.location.name}</Text>
                {/* { isDataDownloading ? <ActivityIndicator/>:
                <Text style={{ fontSize: 30, color: "#fff", padding: 20, position: "absolute" }}>{ question[0].question }</Text>
             } */}
                <TextInput
                    style={globalStyles.inputQuestion}
                    onChangeText={handleInput()}
                    multiline={true}
                    placeholder="Add a new question"
                    numberOfLines={3}
                    ref={myTextInput}
                />
                <TouchableOpacity style={globalStyles.submitQuestion} onPress={() => { submit() }}>
                    <Text style={globalStyles.submitText}>ADD</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 40, color: "white", padding: 20, padding: 10, fontWeight: 'bold', flex: 2, backgroundColor:"maroon", width: 1000 }}>Questions:</Text>
                {isDataDownloading ? <ActivityIndicator /> :
                    mapQuestion()
                }
            </ImageBackground>
        </ScrollView>

    );
}
