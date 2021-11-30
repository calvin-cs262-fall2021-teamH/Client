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
import * as Google from "expo-google-app-auth";
import HomeScreen from './home';
// export default function Prompt ({ navigation }) {
//     const [accessToken, setAccessToken] = useState('')
//     const storeToken = async (token) => {
//         try {
//             await AsyncStorage.setItem(token, GOOGLE_TOKEN)
//         } catch (err) {
//             throw new Error(err)
//         }
//     }

//     const signInWithGoogleAsync = async () => {
//         try {
//             const result = await Google.logInAsync({
//                 iosClientId: "2260489795-nvs04mkpqbhrjbd7ne2jb560e2a3dhdm.apps.googleusercontent.com",
//                 androidClientId: "2260489795-b82e25fatl0ih72e43ii5q6q858fb6ql.apps.googleusercontent.com",
//                 //scopes: ['profile', 'email'],
//             });

//             if (result.type === 'success') {
//                 storeToken(result.accessToken)
//                 setAccessToken(results.accessToken)
//             } else {
//                 return { cancelled: true };
//             }
//         } catch (e) {
//             return { error: true };
//         }
//     }

//     const signoutWithGoogleAsync = async () => {
//         try {
//             console.log("token in delete", accessToken)
//             await Google.logOutAsync({ accessToken, 
//                 iosClientId: "2260489795-nvs04mkpqbhrjbd7ne2jb560e2a3dhdm.apps.googleusercontent.com",
//                 androidClientId: "2260489795-b82e25fatl0ih72e43ii5q6q858fb6ql.apps.googleusercontent.com", })
//         } catch (err) {
//             throw new Error(err)
//         }
//     }
// return(
//     <View>
//         <TouchableHighlight onPress={signInWithGoogleAsync}>
//             <Text>Login with Google</Text>
//         </TouchableHighlight>

//         <TouchableHighlight onPress={signoutWithGoogleAsync}>
//             <Text>Logout</Text>
//         </TouchableHighlight>
//         </View>
// );
// }


export default function Prompt ({ navigation }) {
    // const signOut = async () => {
    //     console.log("LoginScreen.js 6 | loggin out");
    //     try {
    //       await Google.logOutAsync();
    //       //this.setState({ user : null }); // Remember to remove the user from your app's state as well
    //       navigation.navigate('Home');
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
    
    return (
        <ImageBackground source = {require('../assets/light_background.jpg')} style={styles.container}>
            <TouchableOpacity style={globalStyles.genericButton}
                onPress={() => navigation.goBack()}>
                <Text style={{flex:.3, color: "#fff", fontWeight: "bold"}}>KEEP EXPLORING</Text>
                <Image source={require('../assets/map_white.png')} resizeMode='contain' style={{flex: .15 }}/>
          </TouchableOpacity>

          <TouchableOpacity style={globalStyles.genericButton}
                onPress={navigation.navigate('Home')}>
                <Text style={{flex:.315, color: "#fff", fontWeight: "bold"}}>SIGN OUT</Text>
                <Image source={require('../assets/login_white.png')} resizeMode='contain' style={{flex: .1 }}/>
          </TouchableOpacity>
            
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#8C2131",
      alignItems: "center",
      justifyContent: "center",
    }
    });
    