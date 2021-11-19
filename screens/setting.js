/* setting.js  screen that allows user to change different settings
Team HUH?!
10/20/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
*/

import React, { useState, Component } from 'react';
import { Image, Button, View, Text, TouchableOpacity, Switch } from 'react-native';
import { globalStyles } from '../styles/global';

export default function SettingScreen({ navigation }) {
    const [switchValueOne, setSwitchValueOne] = useState(false);
    const [switchValueTwo, setSwitchValueTwo] = useState(false);
    const [switchValueThree, setSwitchValueThree] = useState(false);
    const switchOne = (value) => {toggleSwitch(1)};
    const switchTwo = (value) => {toggleSwitch(2)};
    const switchThree = (value) => {toggleSwitch(3)};

    const toggleSwitch = (index) => {
        if (index == 1) {
            setSwitchValueOne(previousStat => !previousStat);
        } 
        else if (index == 2) {
            setSwitchValueTwo(previousStat => !previousStat);
        } else if (index == 3) {
            setSwitchValueThree(previousStat => !previousStat);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#8C2032', padding: 20 }}>
            <View style={globalStyles.settingOption}>
                <Text>Setting option 1</Text>
                <View style={{alignItems: 'center'}}>
                    <Switch        
                        trackColor={{ false: 'gray', true: 'green' }}
                        onValueChange={switchOne}
                        value={switchValueOne}
                    />
                </View>
            </View>
            <View style={globalStyles.settingOption}>
                <Text>Setting option 2</Text>
                <View style={{alignItems: 'center'}}>
                    <Switch                      
                        trackColor={{ false: 'gray', true: 'green' }}
                        onValueChange={switchTwo}
                        value={switchValueTwo}                 
                    />
                </View>
            </View>
            <View style={globalStyles.settingOption}>
                <Text>Setting option 3</Text>
                <View style={{alignItems: 'center'}}>
                    <Switch                      
                        trackColor={{ false: 'gray', true: 'green' }}
                        onValueChange={switchThree}
                        value={switchValueThree}                   
                    />
                </View>
            </View>
            <View style={{backgroundColor: '#FFF', borderRadius: 10}}>
                <Button
                    title='About'
                    color='black'
                    alignItems='center'
                    onPress={() => navigation.navigate('About')}>                    
                </Button>  
            </View>
        </View>
    );
}