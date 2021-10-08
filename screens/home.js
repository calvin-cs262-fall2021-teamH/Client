/* home.js  Homepage for Hello Campus
Team HUH?!
10/6/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
adapted page navigation from: https://reactnavigation.org/docs/navigating
*/

import React, { useState } from 'react';
import { Image, Button, View, Text, TouchableOpacity, FlatList } from 'react-native';

export default function HomeScreen({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8C2032' }}>
          <Image source={ require('../assets/HelloCampusLogo.png')} style={{ width: 305, height: 300 }} />
          <Button
            title="Get Started!"
            onPress={() => navigation.navigate('Map')}
          />
        </View>
    );
}