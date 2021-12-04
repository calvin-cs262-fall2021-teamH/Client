/*
 * Homepage for Hello Campus
 *
 * @author: Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
 * 10/6/2021
 * adapted page navigation from: https://reactnavigation.org/docs/navigating
 */

import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Image, ImageBackground, TouchableHighlight, TouchableOpacity, Platform} from 'react-native';
import { globalStyles } from '../styles/global';
import * as AppAuth from 'expo-app-auth';
import { AsyncStorage } from 'react-native';
//import DrawerNavigator from './App';

/*
 * HomeScreen is the main screen of the Hello Campus app.
 * @param {navigation} navigation makes sure navigation is correct for getting to the screen and navigating other screens.
 */

export default function HomeScreen({navigation}) {
  //https://docs.expo.dev/versions/v43.0.0/sdk/app-auth/#usage
  let [authState, setAuthState, userId] = useState(null);
  //AsyncStorage.getItem(StorageKey);
  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        setAuthState(cachedAuth);
      }
    })();
  }, []);
  /////////////////////////
  const toCreateQuiz = (authState) => {
    //navigation.navigate('DrawerNavigator', {screen: 'CreateQuiz', params: {myAuthState: authState}});
    navigation.navigate('DrawerNavigator', {screen: 'Map', params: {user,_authState}});
  };

  if (authState == null){

    
    //let user = null;
  return (

<ImageBackground
			source={require("../assets/woods_scene.jpg")}
			style={styles.container}
		>
			<View style={styles.body}>

				<TouchableHighlight
					onPress={() => navigation.navigate("About")}
					style={styles.touchableHighlight}
				>
					<Image
						source={require("../assets/HelloCampusLogo_NoBackground.png")}
						style={styles.imagest}
					/>
				</TouchableHighlight>

				<TouchableOpacity
					style={globalStyles.genericButton}
          onPress={() => navigation.navigate("Map", null)}
				>
					<Text style={{ flex: 0.3, color: "#fff", fontWeight: "bold" }}>
						EXPLORE
					</Text>
					<Image
						source={require("../assets/map_white.png")}
						resizeMode="contain"
						style={{ flex: 0.15 }}
					/>
				</TouchableOpacity>
        {/*<Button
        title = "TITLE"
        mode="contained"
        uppercase={false}
        onPress={() => toCreateQuiz(user, authState)}
        >
        
        </Button>*/}

        <TouchableOpacity style= {globalStyles.genericButton}
        
          onPress={async () => {
          const _authState = await signInAsync();
          setAuthState(_authState);
          const user = await fetchUserInfo(_authState.accessToken);//this should be done in the sign in function.
          //await postUserInfo(user);
          //response;
          navigation.navigate("Map", {user, _authState });
          //navigation.navigate('Drawer', {screen: 'Map', params: {user, _authState}});
          console.log(user.given_name, "Made it to the student map, user is logged in!");
        }}
      >
          <Text style={{flex:.3, color: "#fff", fontWeight: "bold"}}>SIGN IN</Text>
           <Image
						source={require("../assets/login_white.png")}
						resizeMode="contain"
						style={{ flex: 0.1 }}
					/>
      </TouchableOpacity>
			</View>

			<View style={styles.footer}>
			</View>
      <Text>{JSON.stringify(authState, null, 2)}</Text>
		</ImageBackground>

    
  );
    }
    //If we are logged in, the Homescreen changes to include the logout button and the "back to map button, navigation goes directly to the student map on login"
    else{
      return(<ImageBackground
        source={require("../assets/woods_scene.jpg")}
        style={styles.container}
      >
        <View style={styles.body}>
          
{/*Navigates to student map screen*/}
        <TouchableOpacity
					style={globalStyles.genericButton}
          onPress= {async () => {
          const user = await fetchUserInfo(authState.accessToken);
          navigation.navigate("Map", {user, authState});
        }}
				>
					<Text style={{ flex: 0.3, color: "#fff", fontWeight: "bold" }}>
						BACK TO MAP
					</Text>
					<Image
						source={require("../assets/map_white.png")}
						resizeMode="contain"
						style={{ flex: 0.15 }}
					/>
				</TouchableOpacity>

          <TouchableOpacity style={globalStyles.genericButton} onPress={async()=>{ await
                signOutAsync(authState);
                setAuthState(null);
                navigation.navigate("Home");
                }}>
                <Text style={{flex:.315, color: "#fff", fontWeight: "bold"}}> SIGN OUT </Text>{/*include a "your answers will be saved" message*/}
                <Image source={require('../assets/login_white.png')} resizeMode='contain' style={{flex: .1 }}/>
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.genericButton} onPress= {async () => {
          const user = await fetchUserInfo(authState.accessToken);
          navigation.navigate("Dashboard", {user});
        }}>
                <Text style={{flex:.315, color: "#fff", fontWeight: "bold"}}>MANAGE COURSE </Text>{/*include a "your answers will be saved" message*/}
                <Image source={require('../assets/login_white.png')} resizeMode='contain' style={{flex: .1 }}/>
      </TouchableOpacity>
        </View>
  
        <View style={styles.footer}>
         
        </View>
      </ImageBackground>)
    }
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	footer: {
		alignItems: "center",
		marginBottom: 15,
	},
	container: {
		flex: 1,
		backgroundColor: "#8C2131",
	},
	container1: {
		flex: 1,
		...StyleSheet.absoluteFillObject,
		alignSelf: "flex-end",
		marginTop: 25,
		marginRight: 10,
		left: 300,
		right: 10,

		// position: 'absolute', // add if dont work with above
	},
	loginText: {
		fontWeight: "bold",
		color: "#fff",
	},

	aboutButton: {
		width: "80%",
		borderRadius: 75,
		height: 75,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		backgroundColor: "#8C2131",
	},

	aboutText: {
		fontWeight: "bold",
		color: "#d9aa00",
	},

	touchableHighlight: {
		borderRadius: 100,
	},

	imagest: {
		width: 150,
		height: 150,
	},
});


//getting our clientId into the (Probably should put into the DB to hide from the user)
let andoidClientId = "2260489795-b82e25fatl0ih72e43ii5q6q858fb6ql.apps.googleusercontent.com";//androidclientID
let iosClientId ="2260489795-nvs04mkpqbhrjbd7ne2jb560e2a3dhdm.apps.googleusercontent.com";//iosclientID

let myclientId = Platform.OS =="android" ? andoidClientId : iosClientId;

let config = {
    issuer: 'https://accounts.google.com',
    scopes: ['openid', 'profile', 'email'],
    clientId: myclientId,  
};

StorageKey = '@MyApp:CustomGoogleOAuthKey';

export async function signInAsync() {
    //{authState, user}
  let authState = await AppAuth.authAsync(config);
  await cacheAuthAsync(authState);
  console.log('signinInAsync', authState.accessToken);//we get here
  const user = await fetchUserInfo(authState.accessToken);
  if(await isInDB(user.email) == false){//this is for new users
    console.log("User does not exist in our DB, we are creating a user.");
    addUser(user);
  }else{//this is for returning users, ie isInDB returns true
      var returningUserID = await getID(user.email);
      console.log(returningUserID, "user.Id, from our database");///This is important!!!
  }
  return authState;
}



//should return boolean, true if email is in the db already, false otherwise
async function isInDB(email) {
  try{
    const resp = await fetch( `https://hello-campus.herokuapp.com/usersByEmail/`+ email );
    const data = await resp.json();
    console.log( data );
    return true; //should be only if the User is in the database!
  }catch (e){
    console.log(`User is not in DB: ${e.message}`);//for testing only
    return false;//returns false signaling that we should add the user to the db
  }
}

async function addUser(userFromGoogle){
  fetch(`https://hello-campus.herokuapp.com/users/`,
  {
      method: 'POST',
      headers: new Headers({
          "Content-Type": "application/json",
      }),
      
      body: JSON.stringify({
          email: userFromGoogle.email,
          name: userFromGoogle.given_name
      })
  })
}

//should return the ID of a given user from the DB.
async function getID(email){
  const resp = await fetch( `https://hello-campus.herokuapp.com/usersByEmail/`+ email );
  const data = await resp.json();
  console.log(data.id, "retrieved Data.id from our DBASE....");
  var userID = data.id;
  return userID;
}
////////////////////////////////////////////////////////////////////

async function cacheAuthAsync(authState) {
  return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
}

//Gets user info from Google, uses the auth token to do this.
async function fetchUserInfo(token) {
    const response =  await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
   return await response.json();
  }


  
export async function getCachedAuthAsync() {
  let value = await AsyncStorage.getItem(StorageKey);
  let authState = JSON.parse(value);
  console.log('getCachedAuthAsync', authState);//we get here
  if (authState) {
    if (checkIfTokenExpired(authState)) {
      return refreshAuthAsync(authState);
    } else {
      return authState;
    }
  }
  return null;
}

function checkIfTokenExpired({ accessTokenExpirationDate }) {
  return new Date(accessTokenExpirationDate) < new Date();
}

async function refreshAuthAsync({ refreshToken }) {
  let authState = await AppAuth.refreshAsync(config, refreshToken);
  console.log('refreshAuth', authState);
  await cacheAuthAsync(authState);
  return authState;
}

export async function signOutAsync({accessToken }) {
  try {
    await AppAuth.revokeAsync(config, {
      token: accessToken,
      isClientIdProvided: true,
    });
    await AsyncStorage.removeItem(StorageKey);
    return null;
  } catch (e) {
    alert(`Failed to revoke token: ${e.message}`);
  }
}