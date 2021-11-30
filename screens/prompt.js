//https://docs.expo.dev/versions/v43.0.0/sdk/app-auth/#usage

import React, { useEffect, useState } from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import * as AppAuth from 'expo-app-auth';
import { globalStyles } from '../styles/global';

export default function Prompt({navigation}) {
  let [authState, setAuthState, userId] = useState(null);
  
  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        setAuthState(cachedAuth);
        //userId = (fetchUserInfo(cachedAuth.accessToken))
      }
    })();
  }, []);
  
//console.log(response)
  return (
    <View style={styles.container}>
      <Button
        title="Sign In with Google "
        onPress={async () => {
          const _authState = await signInAsync();
          setAuthState(_authState);
          const user = await fetchUserInfo(_authState.accessToken);//this should be done in the sign in function.
          //await postUserInfo(user);
          //response;
          navigation.navigate("Student Map", {user});
          console.log(user.given_name, "WEmadeit wow");
        }}
      />

        <TouchableOpacity style={globalStyles.genericButton}
                onPress={() => navigation.goBack()}>
                <Text style={{flex:.3, color: "#fff", fontWeight: "bold"}}>BACK</Text>
                <Image source={require('../assets/map_white.png')} resizeMode='contain' style={{flex: .15 }}/>
          </TouchableOpacity>
      
        <TouchableOpacity style={globalStyles.genericButton} onPress={async()=>{ await
        signOutAsync(authState);
        setAuthState(null);
        navigation.navigate("Home");
        }}>
                <Text style={{flex:.315, color: "#fff", fontWeight: "bold"}}>SIGN OUT</Text>
                <Image source={require('../assets/login_white.png')} resizeMode='contain' style={{flex: .1 }}/>
        </TouchableOpacity>
        <Text>{JSON.stringify(authState, null, 2)}</Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

let config = {
  issuer: 'https://accounts.google.com',
  scopes: ['openid', 'profile', 'email'],
  iosClientId: "2260489795-nvs04mkpqbhrjbd7ne2jb560e2a3dhdm.apps.googleusercontent.com",
  clientId: "2260489795-b82e25fatl0ih72e43ii5q6q858fb6ql.apps.googleusercontent.com"//androidClientID
};

let StorageKey = '@MyApp:CustomGoogleOAuthKey';

export async function signInAsync() {
    //{authState, user}
  let authState = await AppAuth.authAsync(config);
  await cacheAuthAsync(authState);
  console.log('signinInAsync', authState.accessToken);//we get here
  const user = await fetchUserInfo(authState.accessToken);
  console.log(user);//important user information
  fetch(`https://hello-campus.herokuapp.com/users/`,
    {
        method: 'POST',
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        
        body: JSON.stringify({
            email: user.email,
            name: user.given_name
        })
    })
  return authState;
}
/*
//should return boole, true if user is in the db already, false otherwise
function checkUser(user){
  const data = user.values(arr.reduce((obj, {id, name, roleId, roleTitle})
  fetch `https://hello-campus.herokuapp.com/users/:$`,
  { => {
      if (!(id in obj)) {
        obj[id] = {
          id,
          name,
          roles: {},
        };
      }
  }
}
}
*/
//const { authentication: { accessToken } } = response;

async function cacheAuthAsync(authState) {
  return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
}

/////////////////////////////////////////////////////////////////////////////////////
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


    //const user = fetchUserInfo(token);



  
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

