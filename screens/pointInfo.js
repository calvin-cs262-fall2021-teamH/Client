/* pointInfo.js  Screen that contains information about the point selected.
Team HUH?!
10/7/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
*/

import React from 'react';
import { Image, Button, View, Text, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import globalStyles from "../styles/global";


export default function PointInfoScreen({ route, navigation }) {
    return (
        <ImageBackground
            source={require("../assets/woods_scene.jpg")}
            style={{
                flex: 1,
                backgroundColor: "#8C2131",
                alignItems: "stretch",
                justifyContent: "flex-start",
            }}
        >
            <Text style={{
                color: '#9C1D37',
                fontWeight: 'bold',
                fontSize: 24,
                textAlign: "center",
                margin: 30,
                backgroundColor: "#fff",
                borderRadius: 10
                 }}>{ route.params.name }</Text>
            
            <Text style={{ 
                color: '#9C1D37',
                fontWeight: 'bold',
                fontSize: 24,
                textAlign: "center",
                margin: 30,
                backgroundColor: "#fff",
                borderRadius: 10
            }}
            >{route.params.info}</Text>
        </ImageBackground>
    );
}
//<ImageBackground source = {{ uri: route.params.imageurl }} style = { globalStyles.pointImage }/>