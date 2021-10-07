/* map.js  Screen that contains the map and different points of interest
Team HUH?!
10/6/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
adapted from the navigation tutorial found at: https://reactnavigation.org/docs/navigating
*/

import React, { useState } from 'react';
import { Image, Button, View, Text, TouchableOpacity, FlatList } from 'react-native';

export default function MapScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8C2032' }}>
        <Text style={{ fontSize: 30, color: "#fff", padding: 20 } }>Select a point of interest on the map to learn more!</Text>
        <Image source = { require('../assets/ecomap.png')} style = {{ width: 400, height : 400}}/>
      </View>
    );
}