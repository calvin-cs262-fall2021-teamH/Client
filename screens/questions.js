/**
 * Screen that contains questions about the user's current location.
 *
 * @author: Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
 * 11/16/2021
 */

import React, { useEffect, useReducer, useState } from 'react';
import { Image, Button, View, Text, TouchableOpacity, FlatList, ImageBackground, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { globalStyles } from '../styles/global';



export default function QuestionScreen({ route, navigation }) {
    const [isDataDownloading, setIsDataDownloading] = useState(true);
    const [questions, setQuestion] = useState([]);
    const [answer, setAnswer] = useState("");
    //data = []
    const [text, onChangeText] = React.useState("Useless Text");
    const myTextInput = React.createRef();

    useEffect (() => {
        if (isDataDownloading) {
            fetch(`https://hello-campus.herokuapp.com/questionsAtPoint/${route.params.id}/`)
            .then((response) => {
                let data = response.json();
                console.log(JSON.stringify(data));
                console.log("Successfully downloaded question data.");
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

    function _handleMultiInput(answerText) {
        return (text) => {
            setAnswer({ [answerText]:text })
        }
    }

    onSubmitEdit = () => {
        fetch(`https://hello-campus.herokuapp.com/answers/`,
        { method: 'POST',
        headers: new Headers({
            "Content-Type":"application/json"
        }),
        body: JSON.stringify({
 
            personID: route.params.userId,
         
            questionID: this.pointID,
         
            answer: this.answer,
         
          })
        })
        myTextInput.current.clear();
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#8C2032' }}>
            <Text style={{ fontSize: 40, color: "#fff", padding: 20, padding:10, flex:2 }}>{ route.params.name }</Text>
            {/* { isDataDownloading ? <ActivityIndicator/>:
                <Text style={{ fontSize: 30, color: "#fff", padding: 20, position: "absolute" }}>{ question[0].question }</Text>
            } */}
            { isDataDownloading ? <ActivityIndicator/> :
                questions.map(question => {
                        return [
                            <Text
                                key={question.id}
                                style={{ fontSize: 25, color: "#fff", padding: 20, justifyContent:'space-between' }}>{question.question}</Text>,
                            <TextInput
                                key={question.id + 50}
                                ref={myTextInput}
                                style={globalStyles.input}
                                onChangeText={_handleMultiInput(this['answer_' + question.id])}
                                multiline={true}
                                placeholder="Your answer"
                                numberOfLines={3}
                                onSubmitEditing={this.onSubmitEdit}
                            />,
                            <TouchableOpacity key={question.id + 100} style={globalStyles.submitButton} onPress={this.onSubmitEdit}>
                                <Text style={globalStyles.submitText}>Submit</Text>
                            </TouchableOpacity>

                        ]

                        })
                    }
        </ScrollView>

        
    );
}
