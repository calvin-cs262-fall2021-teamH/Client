/* setting.js  screen that allows user to change different settings
Team HUH?!
10/20/2021
Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
*/

import React, { useState, Component } from 'react';
import { Image,
     Button,
      View,
       Text,
        TouchableOpacity,
         Switch,
          ImageBackground,
        StyleSheet,
    TouchableHighlight, } from 'react-native';
import { globalStyles } from '../styles/global';

export default function SettingScreen({ route, navigation }) {
    const [switchValueOne, setSwitchValueOne] = useState(false);
    const [switchValueTwo, setSwitchValueTwo] = useState(false);
    const [switchValueThree, setSwitchValueThree] = useState(false);
    //const switchOne = (value) => {toggleSwitch(1)};
    const switchTwo = (value) => {toggleSwitch(2)};
    //const switchThree = (value) => {toggleSwitch(3)};

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
        <ImageBackground source = {require('../assets/light_background.jpg')} style={styles.container}>
        
            <View style={globalStyles.settingOption}>
                <TouchableOpacity onPress = {()=> navigation.navigate('About')} style = {{width: '80%', height: "60%", justifyContents: "left"}}>
                    <Text style = {{fontWeight: "bold", fontSize: 20, color: "#8C2131"}}>About</Text>
                </TouchableOpacity>
                <View style={{alignItems: 'center'}}>
                <TouchableHighlight onPress = {()=> navigation.navigate('About')} style ={styles.touchableHighlight}>
                    <Image source={ require('../assets/HelloCampusLogo_NoBackground.png')} style={styles.imagest}/> 
                </TouchableHighlight>
                </View>
            </View>

            <View style = {globalStyles.settingOption}>
                <TouchableOpacity onPress = {()=> navigation.navigate('Location')} style = {{width: '80%', height: "60%", justifyContents: "left"}}>
                    <Text style = {{fontWeight: "bold", fontSize: 20, color: "#8C2131"}}>Locations</Text>
                </TouchableOpacity>
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Location')}>
                        <ImageBackground source = { require('../assets/maroon_list_icon.png')} style = {{width: 50, height: "60%", height: 50}}/> 
                    </TouchableOpacity>
                </View>
            </View>

            <View style={globalStyles.settingOption}>
                <TouchableOpacity onPress = {()=> navigation.navigate('Prompt')} style = {{width: '80%', height: "60%", justifyContents: "left"}}>
                    <Text style = {{fontWeight: "bold", fontSize: 20, color: "#8C2131"}}>Logout</Text>
                </TouchableOpacity>
                <View style={{alignItems: 'center'}}>
                <TouchableHighlight onPress = {()=> navigation.navigate('Prompt')} style = {{width: 50, height: 50}}>
                    <Image source={ require('../assets/logout_icon.png')} style={styles.imagest}/> 
                </TouchableHighlight>
                </View>
            </View>

            <View style={globalStyles.settingOption}>
                <Text style = {{fontWeight: "bold", fontSize: 20, color: "#8C2131"}}>Light/Dark Mode</Text>
                <View style={{alignItems: 'center'}}>
                    <Switch                      
                        trackColor={{ false: 'gray', true: 'maroon' }}
                        onValueChange={switchTwo}
                        value={switchValueTwo}                 
                    />
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
touchableHighlight: {
    borderRadius: 100,
},
container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: 20,
  },

imagest:{
  width : 50,
  height: 50,
  justifyContent: "center"
},
});