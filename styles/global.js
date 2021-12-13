/* global.js has a style sheet for various components of the Hello Campus app.
Team HUH?!
10/7/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
*/

import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    QAlist: {
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: "#fff",
    },
    listIcon: {
        width: 30,
        height: 30,
        borderRadius: 20,
    },
    list: {
        backgroundColor: 'maroon',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        fontWeight: "bold",
        fontSize: 20,
        color: "white"
    },
    listText: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',
        flexDirection: 'row',
    },
    settingIcon: {
        width: 50,
        height: 50,
        borderRadius: 20,
    },
    settingOption: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    pointImage: {
        width: 400,
        height: 400,
    },
    interactionButton: {
        width: 170,
        height: 170,
        alignItems: 'center',
    },
    noInteractionButton: {
        width: 170,
        height: 170,
        alignItems: 'center',
    },
    genericButton: {
        width: "75%",
        borderRadius: 20,
        borderColor: "#fff",
        borderWidth: 2,
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "#8C2131",
    },

    listButton: {
        width: "75%",
        height: 50,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent:"flex-start",
        marginTop: 30
    },
    Question: {
        fontSize: 20,
        paddingVertical: 10,
        color: "#fff",
    },
    input: {
        width: "90%",
        fontSize: 16,
        color: "#000",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 15,
        left: 5,
        textAlignVertical: 'top'
    },
    genericText: {
        fontWeight: 'bold',
        color: "#000000",
    },
    submitText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: "#fff",
      },
    submitButton: {
        width: "20%",
        height: "10%",
        borderRadius: 10,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        alignSelf: 'flex-end',
        right: 40,
        backgroundColor: "#81FF8E",
    },
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    footer: {
        alignItems: "center",
        marginBottom: 15,
    },
    imageBackGround: {
        flex: 1,
        backgroundColor: "#8C2131",
    },

    genericButtonText: {
        fontWeight: "bold",
        color: "#fff",
        flex: .315,
    },
    helpModal: {
        alignItems: "center",
        marginTop: 100,
        backgroundColor: "#fff",
        borderRadius: 15,
    },
    helpText: {
        fontSize: 20,
        padding: 5,
    },
    touchableHighlight: {
        borderRadius: 100,
    },
    logo: {
        width: 200,
        height: 200,
    },
    deleteQuestion: {
        width: "20%",
        height: "10%",
        borderRadius: 10,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        alignSelf: 'flex-end',
        right: 40,
        backgroundColor: "red",
    },
    inputQuestion: {
        width: "90%",
        fontSize: 16,
        color: "#000",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 15,
        left: 5,
        bottom: 10,
        textAlignVertical: 'top'
    },
    inputPointInfo: {
        width: "90%",
        fontSize: 16,
        color: "#000",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 15,
        left: 5,
        bottom: 10,
        margin: 20,
        textAlignVertical: 'top'
    },
    submitQuestion: {
        width: "20%",
        height: "10%",
        borderRadius: 10,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        alignSelf: 'flex-end',
        right: 40,
        bottom: 0,
        backgroundColor: "#81FF8E",
    }
});