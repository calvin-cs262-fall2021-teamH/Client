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
            fetch(`https://hello-campus.herokuapp.com/answersForPerson/4`)

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




































/* list.js screen that allows user to check off locations that they have already visited
Team HUH?!
11/11/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
//So we need to navigate to this screen for a specific user.
*/


/*
import { globalStyles } from '../styles/global';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, StyleSheet, ActivityIndicator} from 'react-native';


    export default function ListScreen({ route, navigation }) {
    const [isDataDownloading, setIsDataDownloading] = useState(true);
    const [locations, setLocation] = useState([]);
    const [questions, setQuestion] = useState([]);
    const [answers, setAnswer] = useState([]);
    const [users, setUser] = useState([]);
 /*   
function onSubmitEdit(personId, questionId, answer){
    fetch(`https://hello-campus.herokuapp.com/answers/`,
    { method: 'POST',
    headers: new Headers({
        "Content-Type":"application/json"
    }),
    body: JSON.stringify({

        personID: personId,
     
        questionID: questionId,
     
        answer: answer
     
      },)
    })*/
    // myTextInput.current.clear();

/*
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

    //https://hello-campus.herokuapp.com/answers/:personId/:questionId
    const userID = route.params.user.id

    useEffect (() => {
        if (isDataDownloading) {
            fetch('https://hello-campus.herokuapp.com/answersForPerson/:personId'+ {userID })
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
    console.log("Hi There...........................................", route.params.user.email)
    return (
        <ImageBackground source = {require('../assets/light_background.jpg')} style={styles.container}>
          <ScrollView>
          { isDataDownloading ? <ActivityIndicator/> :
                    locations.map(location => 
                        questions.map(question => 
                            answers.map(answer => 
                                users.map(user => {
                                    if (location.id == question.pointid) {
                                        return [
                                            <View>
                                                <Text key={location.id} style={globalStyles.list}>
                                                    {location.name}
                                                </Text>
                                                <Text key={question.id} style={globalStyles.QAlist}>Question: {question.question}</Text>
                                                <Text key={answer.id} style={globalStyles.QAlist}>{user.name} Answer: {answer.answer}</Text>
                                            </View>
                                        ]
                                    }
                                })
                            )
                        )
                    )
                }
            </ScrollView>
        
        <ImageBackground source = {require('../assets/light_background.jpg')} style={styles.container}>
            <Text>{route.params.user.name}, view and edit your answers.</Text>
          <ScrollView>
                { isDataDownloading ? <ActivityIndicator/> :
                    locations.map(location => 
                        questions.map(question => 
                                {
                                if (location.id == question.pointid) {
                                    return [
                                        <View>
                                                <Text key={location.id} style={globalStyles.list}>
                                                    {location.name}
                                                </Text>
                                                <Text key={question.id} style={globalStyles.QAlist}>Question: {question.question}</Text>
                                                
                                        

                                        </View>
                                        ]
                                    }
                                }
                            )
                        )
                }
            </ScrollView>
            <TouchableOpacity style={globalStyles.genericButton} 
                                                        onPress= {() => {
                                                            onSubmitEdit(4,1,"I most greatly desire to eat spinach.");
                                                        }}>
                                                        <Text style={globalStyles.genericButtonText}>Assignment </Text>
                                                        <Image source={require('../assets/course_icon.png')} resizeMode='contain' style={{flex: .135 }}/>
                                                </TouchableOpacity>
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
*/