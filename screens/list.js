/* list.js screen that allows user to check off locations that they have already visited
Team HUH?!
11/11/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
*/

import React, { useState } from 'react';
import { View, Text, CheckBox} from 'react-native';
import { globalStyles } from '../styles/global';

export default function ListScreen({ navigation }) {
    const [isSelectedOne, setSelectionOne] = useState(false);
    const [isSelectedTwo, setSelectionTwo] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: '#8C2032', padding: 20 }}>
            <View style={ globalStyles.list }>
                <Text style={ globalStyles.listText }>Crown Gap</Text>
                <View style={{ padding: 15 }}>
                    <CheckBox
                        value={isSelectedOne}
                        onValueChange={setSelectionOne}
                    />
                </View>
            </View>
            <View style={ globalStyles.list }>
                <Text style={ globalStyles.listText }>Whiskey Pond</Text>
                <View style={{ padding: 15 }}>
                    <CheckBox
                        value={isSelectedTwo}
                        onValueChange={setSelectionTwo}
                    />
                </View>
            </View>
        </View>
    );
}