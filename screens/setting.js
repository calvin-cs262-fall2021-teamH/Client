/* setting.js  screen that allows user to change different settings
Team HUH?!
10/20/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
*/

import React, { useState } from 'react';
import { Image, Button, View, Text, TouchableOpacity, Switch } from 'react-native';
import { globalStyles } from '../styles/global';

export default function SettingScreen({ navigation }) {
    const [switchValue, setSwitchValue] = useState(false);
    const toggleSwitch = (value) => {
        setSwitchValue(value);
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#8C2032', padding: 20 }}>
            <View style={globalStyles.settingOption}>
                <Text>Setting option 1</Text>
                <View style={{alignItems: 'right'}}>
                    <Switch                      
                        trackColor={{ false: 'gray', true: 'green' }}
                        onValueChange={toggleSwitch}
                        value={switchValue}
                    />
                </View>
            </View>
            <View style={globalStyles.settingOption}>
                <Text>Setting option 2</Text>
                <View style={{alignItems: 'right'}}>
                    <Switch                      
                        trackColor={{ false: 'gray', true: 'green' }}
                        onValueChange={toggleSwitch}
                        value={switchValue}
                    />
                </View>
            </View>
            <View style={globalStyles.settingOption}>
                <Text>Setting option 3</Text>
                <View style={{alignItems: 'right'}}>
                    <Switch                      
                        trackColor={{ false: 'gray', true: 'green' }}
                        onValueChange={toggleSwitch}
                        value={switchValue}
                    />
                </View>
            </View>
        </View>
    );
}