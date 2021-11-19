import React from 'react';
import { TouchableOpacity, View, Text, ImageBackground } from 'react-native';

import { globalStyles } from '../styles/global';

export default function Header({ navigation }) {
    return (
        <View style={{flexDirection: 'row'}}>
            <View style={{padding: 5}}>
                <TouchableOpacity onPress={() => navigation.navigate('Location')}>
                    <ImageBackground source = { require('../assets/listIcon.png')} style = { globalStyles.listIcon }/> 
                </TouchableOpacity>
            </View>
            <View style={{padding: 5}}>
                <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                    <ImageBackground source = { require('../assets/settingIcon.png')} style = { globalStyles.settingIcon }/> 
                </TouchableOpacity>
            </View>
        </View>
    );
};