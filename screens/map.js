/* map.js  Screen that contains the map and different points of interest
Team HUH?!
10/6/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
adapted from the navigation tutorial found at: https://reactnavigation.org/docs/navigating
*/

import React, { useState } from 'react';
import { Image, Button, View, Text, TouchableOpacity, FlatList, ImageBackground, Touchable } from 'react-native';
import { PointInfoScreen } from './pointInfo';
import { globalStyles } from '../styles/global';

export default function MapScreen({navigation}) {
  // a list of different locations on the map (only 2 for this prototype)
  const locations = [
    { name: 'Whiskey Pond', image: require('../assets/WhiskeyPond.png'),
        description: 'This secluded pond is fed by a seep on the eastern edge. It is home to ducks,' + 
                      'frogs, and plants like Buttonbush, Duckweed, and the tiniest vascular' +
                      'plant in Michigan, water meal. Watch for the Great Blue Heron that often feeds here'},
    { name: 'Crown Gap', image: require('../assets/CrownGap.png'),
        description: 'In 1995, this large maple tree fell, removing branches from several neighboring trees. ' +
                     'The result was a large hole in the canopy, or a crown gap. The gap allows more sunlight to ' +
                     'reach the forest floor, encouraging growth of seedlings. Eventually one or two of the seedlings ' +
                     'you see now will out-compete the others and will fill the canopy gap'},
  ];

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8C2032' }}>
        <Text style={{ fontSize: 30, color: "#fff", padding: 20 } }>Select a point of interest on the map to learn more!</Text>
        <ImageBackground source = { require('../assets/ecomap.png')} style = { globalStyles.map }/>
        <TouchableOpacity style = {[ globalStyles.mapPoint, {top:-240, right: 90} ]} onPress={() => navigation.navigate('PointInfo', locations[0])}></TouchableOpacity>
        <TouchableOpacity style = {[ globalStyles.mapPoint, {top:-360, left: 110} ]} onPress={() => navigation.navigate('PointInfo', locations[1])}></TouchableOpacity>
      </View>
    );
}