/*
 * Screen that allows professors to add locations
 *
 * @author: Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
 * 11/16/2021
 */

import React, { useEffect, useReducer, useState } from 'react';
import { Image, Button, View, Modal, Text, TouchableOpacity, FlatList, ImageBackground, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';
import {
    HeaderButtons,
    HeaderButton,
    Item
} from 'react-navigation-header-buttons';


export default function AddQuestionScreen({ navigation, route }) {
    const [isDataDownloading, setIsDataDownloading] = useState(true);
    const [questions, setQuestion] = useState([]);
    const [newQuestion, setNewQuestion] = useState("");
    const myTextInput = React.createRef();
    const [text, onChangeText] = React.useState("Useless Text");

    const [helpModalVisible, setHelpModalVisible] = useState(false);
    const [DBuser, setDBuser] = useState([]);
    const IoniconsHeaderButton = (props) => (
        <HeaderButton IconComponent={Ionicons} iconSize={40} {...props} />
    );

    //https://docs.expo.dev/versions/v43.0.0/sdk/app-auth/#usage
    let [authState, setAuthState, userId] = useState(null);
    useEffect(() => {
        (async () => {
            let cachedAuth = await getCachedAuthAsync();
            if (cachedAuth && !authState) {
                setAuthState(cachedAuth);
            }
        })();
    }, []);


    //let myclientId = Platform.OS =="android" ? andoidClientId : iosClientId;
    //location screen is logged in
    //points of interest is what the general user should see

    let isSignedIn = authState == null ? false : true;
    let screenToNavigateTo = isSignedIn == true ? "Location" : "Points of Interest";

    React.useLayoutEffect(() => {
        /*(async () => {
            let cachedAuth = await getCachedAuthAsync();
            if (cachedAuth == null) {
                screenToNavigateTo = "Points of Interest";
            }else{
                screenToNavigateTo = "Location";
            }
          })(screenToNavigateTo);
    */
        //let isSignedIn = authState == null ? false : true;
        //let screenToNavigateTo = isSignedIn == true ? "Location" : "Points of Interest";
        let myScreen = screenToNavigateTo;
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                    <Item
                        title={"help"}
                        iconName={"help-circle"}
                        color="maroon"
                        onPress={() => {
                            setHelpModalVisible(!helpModalVisible)
                        }}
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation])



    useEffect(() => {
        setIsDataDownloading(true)
        if (isDataDownloading) {
            fetch(`https://hello-campus.herokuapp.com/questionsAtPoint/${route.params.location.id}/`)
                .then((response) => {
                    let data = response.json();
                    return data;
                })
                .then((json) => setQuestion(json))
                .then((json) => setNewQuestions(json))
                .catch((error) => {
                    console.log("Error downloading question data: " + error);
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
                return data;
            })
            .then((json) => setQuestion(json))
            .then((json) => setNewQuestions(json))
            .catch((error) => {
                console.log("Error downloading question data: " + error);
            })
            .finally(() => {
                setIsDataDownloading(false);
            }
            );
    }

    const remove = (questionID) => {
        fetch(`https://hello-campus.herokuapp.com/questions/${questionID}/`, { method: 'DELETE' })
            .then(() => {
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
                        key={Math.random() + Date.now()}
                        style={{ fontSize: 25, color: "#fff", padding: 20, justifyContent: 'space-between' }}>{question.question}</Text>,
                    <TouchableOpacity key={Math.random() + Date.now()} style={globalStyles.deleteQuestion} onPress={() => { remove(question.id) }}>
                        <Text style={globalStyles.submitText}>Delete</Text>
                    </TouchableOpacity>
                ]
            })
        )
    }

    return (

        <ScrollView style={{ flex: 1, backgroundColor: '#8C2032' }}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={helpModalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setHelpModalVisible(!helpModalVisible);
                }}
            >
                <View style={globalStyles.helpModal}>
                    <Text style={globalStyles.helpText}>Press text box to type a question, then press "ADD" when finished.</Text>
                    <Text style={globalStyles.helpText}>Press "DELETE" to remove the question from the list.</Text>
                    <TouchableOpacity style={{ backgroundColor: "maroon", margin: 10, borderRadius: 15 }}
                        onPress={() => {
                            setHelpModalVisible(!helpModalVisible)
                        }}
                    >
                        <Text style={{ color: "#fff", fontSize: 25, margin: 10 }}>EXIT</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <ImageBackground source={require('../assets/good.jpg')} style={{ alignItems: 'flex-start', backgroundColor: '#8C2032' }}>
                <Text style={{ fontSize: 40, color: "white", padding: 15, marginBottom: 30, fontWeight: 'bold', flex: 2, backgroundColor: "maroon", width: 1000 }}>{route.params.location.name}</Text>
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
                <Text style={{ fontSize: 40, color: "white", padding: 20, padding: 10, fontWeight: 'bold', flex: 2, backgroundColor: "maroon", width: 1000 }}>Questions:</Text>
                {isDataDownloading ? <ActivityIndicator /> :
                    mapQuestion()
                }
            </ImageBackground>
        </ScrollView>

    );
}
