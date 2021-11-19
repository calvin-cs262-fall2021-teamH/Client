/* global.js has a style sheet for various components of the Hello Campus app.
Team HUH?!
10/7/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
*/

import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    setting: {
        width: 30,
        height: 30,
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
        height : 400
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
        borderRadius: 50,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#fff",
    },
    Question: {
        fontSize: 20,
        color: "#fff",
        padding: 20
    }
});