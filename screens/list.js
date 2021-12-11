/**
 * Screen that contains questions about the user's current location.
 *
 * @author: Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
 * 11/16/2021
 */

import React, { useEffect, useReducer, useState } from 'react';
import { Image, Button, View, Text, Modal, TouchableOpacity, FlatList, ImageBackground, TextInput, ActivityIndicator, ScrollView } from 'react-native';
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
    const [textColor, setTextColor] = useState("#8C2032");
    //data = []
    //const [text, onChangeText] = React.useState("Useless Text");
    const myTextInput = React.createRef();
    const [text, setText] = useState('');

    const [helpModalVisible, setHelpModalVisible] = useState(false);
    const IoniconsHeaderButton = (props) => (
        <HeaderButton IconComponent={Ionicons} iconSize={45} {...props} />
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
        console.log("GOT HERE AND ")
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
        console.log(screenToNavigateTo);
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
    })

    useEffect(() => {
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
    useEffect(() => {
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
    //console.log(answers, "THis is my answer")

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

    // myTextInput.current.clear();

    function _handleMultiInput(answerText) {
        return (text) => {
            setAnswer({ [answerText]: text })
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
                    <Text style={globalStyles.helpText}>
                        Press on your answers to edit it, then press submit to update your answers.
                    </Text>
                    <TouchableOpacity style={{ backgroundColor: "maroon", margin: 10, borderRadius: 15 }}
                        onPress={() => {
                            setHelpModalVisible(!helpModalVisible)
                        }
                        }>
                        <Text style={{ color: "#fff", fontSize: 25, margin: 10 }}>EXIT</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Text style={{ fontSize: 22, color: "#fff", padding: 20, padding: 10, flex: 2 }}>Questions and responses for {route.params.user.name}, {route.params.user.email}</Text>

            {/* { isDataDownloading ? <ActivityIndicator/>:
                <Text style={{ fontSize: 30, color: "#fff", padding: 20, position: "absolute" }}>{ question[0].question }</Text>
            } */}
            {isDataDownloading ? <ActivityIndicator /> :
                locations.map(location => {
                    return [
                        /*
                        <TouchableOpacity onPress = {()=> navigation.navigate("PointInfo", {locationName:(location.name), info: (location.info)})}>
                                   
                                  <Text key = {location.id} style={globalStyles.list}>
                                    {location.name}
                                  </Text>
                            </TouchableOpacity>,
                        */
                        <Text key={location.id} style={globalStyles.list}>
                            {location.name}
                        </Text>,
                        questions.map(question => {
                            //console.log(location.name, "THIS IS MY NAME!!!!!")
                            //console.log(location.id, "THJIS IS PIONT ID")
                            //answers.map(answer => {
                            // console.log(answer);
                            if (question.pointid == location.id) {
                                return [
                                    //console.log(answers.get(answer)),            
                                    <Text
                                        key={question.id}
                                        style={{ fontSize: 25, color: "#fff", padding: 20, justifyContent: 'space-between' }}>{question.question}
                                    </Text>,


                                    answers.map(answer => {
                                        if (answer.questionid == question.id) {
                                            return [
                                                <TextInput
                                                    //key={answer.id + 50}
                                                    editable={true}
                                                    ref={myTextInput}
                                                    style={globalStyles.input}
                                                    multiline={true}
                                                    numberOfLines={3}
                                                    defaultValue={answer.answer}
                                                    onChangeText={text => { setText(text), setButtonColor("yellow"), setTextColor("black") }}//THISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
                                                //onSubmitEditing={this.onSubmitEdit(route.params.userId, question.id, answer)}
                                                />,
                                                //onPress={() => onSubmitEdit(user.id, question.id, answer.id)
                                                <TouchableOpacity key={question.id + 100} style={{
                                                    width: "20%",
                                                    height: "10%",
                                                    borderRadius: 10,
                                                    height: 60,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginTop: 10,
                                                    alignSelf: 'flex-end',
                                                    right: 40,
                                                    backgroundColor: buttonColor,
                                                }} onPress={() => { submit(question.id), console.log("SUBMITTED!"), setButtonColor("#8C2032"), setTextColor("#8C2032") }}>
                                                    <Text style={{ color: textColor, fontWeight: "bold" }}>Submit</Text>
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









