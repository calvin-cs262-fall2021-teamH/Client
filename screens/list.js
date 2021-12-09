/**
 * Screen that contains questions about the user's current location.
 *
 * @author: Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
 * 11/16/2021
 */

import React, { useEffect, useReducer, useState } from 'react';
import { Image, Button, View, Text, TouchableOpacity, FlatList, ImageBackground, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { globalStyles } from '../styles/global';



export default function ListScreen({ route, navigation }) {
    const [isDataDownloading, setIsDataDownloading] = useState(true);
    const [questions, setQuestion] = useState([]);
    const [answers, setAnswer] = useState([]);
    const [locations, setLocation] = useState([]);
    const[user, setUser] = useState([]);
    //data = []
    const [text, onChangeText] = React.useState("Useless Text");
    const myTextInput = React.createRef();

    
   
    useEffect (() => {
        if (isDataDownloading) {
            //fetch(`https://hello-campus.herokuapp.com/questions/`)
            fetch('https://hello-campus.herokuapp.com/questions/')
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
    }, )

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

///sets the user.
    useEffect (() => {
        if (isDataDownloading) {
            fetch(`https://hello-campus.herokuapp.com/usersByEmail/${route.params.user.email}`)

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

    //gets answers
    useEffect (() => {
        if (isDataDownloading) {
            fetch(`https://hello-campus.herokuapp.com/answersForPerson/${route.params.user.id}`)

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
    //console.log(answers, "THis is my answer")

    function _handleMultiInput(answerText) {
        return (text) => {
            setAnswer({ [answerText]:text })
        }
    }

    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
        };
    };
    
   function onSubmitEdit (personId, questionId, answer){
        fetch(`https://hello-campus.herokuapp.com/answers/`,
        { method: 'POST',
        headers: new Headers({
            "Content-Type":"application/json"
        }),
        body: JSON.stringify({
 
            personID: personId,
         
            questionID: questionId,
         
            answer: answer
         
          }, getCircularReplacer())
        })
        // myTextInput.current.clear();

    }

    function submit() {
        for (i=0; i<questions.length; i++) {
            console.log(questions[i].id)
            console.log(answer["answer_3"])
            console.log(answer["answer_4"])
            console.log(answer["answer_5"])
            fetch(`https://hello-campus.herokuapp.com/answers/`,
            { method: 'POST',
            headers: new Headers({
                "Content-Type":"application/json"
            }),
            body: JSON.stringify({
     
                email: route.params.user.email,
             
                questionID: questions[i].id,
             
                answer: answer["answer_" + questions[i].id]
             
              })
            })
        }

        // myTextInput.current.clear();
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#8C2032' }}>
            <Text style={{ fontSize: 22, color: "#fff", padding: 20, padding:10, flex:2 }}>Questions and responses for {route.params.user.email},</Text>
            
            {/* { isDataDownloading ? <ActivityIndicator/>:
                <Text style={{ fontSize: 30, color: "#fff", padding: 20, position: "absolute" }}>{ question[0].question }</Text>
            } */}
            { isDataDownloading ? <ActivityIndicator/> :
            locations.map(location=>{
                return[
                    <TouchableOpacity onPress = {()=> navigation.navigate("PointInfo", {locationName:(location.name), info: (location.info)})}>
                               
                              <Text key = {location.id} style={globalStyles.list}>
                                {location.name}
                              </Text>
                        </TouchableOpacity>,
                        
                    questions.map(question => {
                    //console.log(location.name, "THIS IS MY NAME!!!!!")
                    //console.log(location.id, "THJIS IS PIONT ID")
                        //answers.map(answer => {
                           // console.log(answer);
                        if(question.pointid == location.id){
                            return [
                                //console.log(answers.get(answer)),            
                                <Text
                                    key={question.id}
                                    style={{ fontSize: 25, color: "#fff", padding: 20, justifyContent:'space-between' }}>{question.question}
                                </Text>,
                                

                                answers.map(answer =>{
                                    console.log("HI THERE", answer)
                                if(answer.questionid == question.id){
                                    return[
                                <TextInput
                                    //key={answer.id + 50}
                                    ref={myTextInput}
                                    style={globalStyles.input}
                                    //onChangeText={_handleMultiInput(this['answer_' + question.id])}
                                    multiline={true}
                                    placeholder={answer.answer}
                                    numberOfLines={3}
                                //onSubmitEditing={this.onSubmitEdit(route.params.userId, question.id, answer)}
                                />,
                            //onPress={() => onSubmitEdit(user.id, question.id, answer.id)
                                    <TouchableOpacity key={question.id + 100} style={globalStyles.submitButton} onPress={() => submit()}>
                                        <Text style={globalStyles.submitText}>Edit</Text>
                                    </TouchableOpacity>,
                                    ]
                                }

                                }),

                            ]
                        }
                        })
                    ]
                    })
                    }
        </ScrollView>

        
    );
}










