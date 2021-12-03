/* global.js has a style sheet for various components of the Hello Campus app.
Team HUH?!
10/7/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
*/

import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    listIcon: {
        width: 30,
        height: 30,        
        borderRadius: 20,
    },
    list: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:20,
    },
    QAlist: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        height : 400,
    },
    interactionButton: {
        width: 170, 
        height:170,
        alignItems: 'center',
    },
    noInteractionButton: {
        width: 170, 
        height:170,
        alignItems: 'center',
    },
    genericButton: {
        width: "75%",
        borderRadius: 20,
        borderColor: "#fff",
        borderWidth: 1,
        height: 60,
        flexDirection:"row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "#8C2131",
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
        color: "#000000",
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
});