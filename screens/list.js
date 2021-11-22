/* list.js screen that allows user to check off locations that they have already visited
Team HUH?!
11/11/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
*/

import React, { useState } from 'react';
import { View, Text, CheckBox, ImageBackground, StyleSheet} from 'react-native';
import { globalStyles } from '../styles/global';

export default function ListScreen({ navigation }) {
    const [isSelectedOne, setSelectionOne] = useState(false);
    const [isSelectedTwo, setSelectionTwo] = useState(false);

    return (
        <ImageBackground source = {require('../assets/woods_scene.jpg')} style={styles.container}>
          
            <View style={ globalStyles.list }>
                <Text style={ globalStyles.listText }>Crown Gap</Text>
                <View style={{ padding: 15 }}>

                    
                    <CheckBox style = {{height: 50, width: 50}}
                        value={isSelectedOne}
                        onValueChange={setSelectionOne}
                    />
                </View>
            </View>
            <View style={ globalStyles.list }>
                <Text style={ globalStyles.listText }>Whiskey Pond</Text>
                <View style={{ padding: 15 }}>
                    <CheckBox style = {{height: 50, width: 50}}
                        value={isSelectedTwo}
                        onValueChange={setSelectionTwo}
                    />
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#8C2131",
      alignItems: "stretch",
      justifyContent: "flex-start",
    },
});