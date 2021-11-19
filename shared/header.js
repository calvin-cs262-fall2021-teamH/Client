import React from 'react';
import { TouchableOpacity, View, Text, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SettingScreen from '../screens/setting';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { globalStyles } from '../styles/global';

export default function Header({ navigation }) {
    return (
        <View>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                <ImageBackground source = { require('../assets/settingIcon.png')} style = { globalStyles.setting }/> 
            </TouchableOpacity> */}
        </View>
    );
};