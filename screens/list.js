/* list.js screen that allows user to check locations and questions that they have answered
Team HUH?!
11/11/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
*/

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, ActivityIndicator} from 'react-native';
import { globalStyles } from '../styles/global';

export default function ListScreen({ navigation }) {
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

    return (
        <ImageBackground source = {require('../assets/woods_scene.jpg')} style={styles.container}>
          
            <ScrollView>
                { isDataDownloading ? <ActivityIndicator/> :
                    locations.map(location => 
                        questions.map(question => 
                            answers.map(answer => 
                                users.map(user => {
                                    if (location.id == question.pointid 
                                        && answer.questionid == question.id
                                        && answer.personid == user.id) {
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