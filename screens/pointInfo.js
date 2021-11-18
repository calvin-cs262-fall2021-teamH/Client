/* pointInfo.js  Screen that contains information about the point selected.
Team HUH?!
10/7/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
*/

import { TabRouter } from '@react-navigation/routers';
import React, { useState } from 'react';
import { Image, Button, View, Text, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global';

export default function PointInfoScreen({ route, navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8C2032' }}>
            <Text style={{ fontSize: 30, color: "#fff", padding: 20 }}>{ route.params.name }</Text>
            <ImageBackground source = {{ uri: route.params.imageurl }} style = { globalStyles.pointImage }/>
            <Text style={{ fontSize: 20, color: "#fff", padding: 20 }}>{ route.params.info }</Text>
        </View>
    );
}