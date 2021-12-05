//https://docs.expo.dev/versions/v43.0.0/sdk/app-auth/#usage
//this functionality has been transfered to the homescreen this file is null and void and should be deleted
import React, { useEffect, useState } from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View, Image, TouchableOpacity, Platform} from 'react-native';
import * as AppAuth from 'expo-app-auth';
import { globalStyles } from '../styles/global';
<<<<<<< HEAD

export default function Prompt({navigation}) {
  let [authState, setAuthState, userId] = useState(null);
  
  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        setAuthState(cachedAuth);
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
          console.log(user.given_name, "Made it to the student map, user is logged in!");
        }}
      />

        <TouchableOpacity style={globalStyles.genericButton}
=======
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
>>>>>>> origin/main
                onPress={() => navigation.goBack()}>
                <Text style={{flex:.3, color: "#fff", fontWeight: "bold"}}>BACK</Text>
                <Image source={require('../assets/map_white.png')} resizeMode='contain' style={{flex: .15 }}/>
          </TouchableOpacity>
<<<<<<< HEAD
      
        <TouchableOpacity style={globalStyles.genericButton} onPress={async()=>{ await
        signOutAsync(authState);
        setAuthState(null);
        navigation.navigate("Home");
        }}>
=======

          <TouchableOpacity style={globalStyles.genericButton}
                onPress={navigation.navigate('Home')}>
>>>>>>> origin/main
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


//getting our clientId into the (Probably should put into the DB to hide from the user)
let andoidClientId = "2260489795-b82e25fatl0ih72e43ii5q6q858fb6ql.apps.googleusercontent.com"//androidclientID
let iosClientId ="2260489795-nvs04mkpqbhrjbd7ne2jb560e2a3dhdm.apps.googleusercontent.com"//iosclientID

let myclientId = Platform.OS =="android" ? andoidClientId : iosClientId;

let config = {
    issuer: 'https://accounts.google.com',
    scopes: ['openid', 'profile', 'email'],
    clientId: myclientId,  
};

let StorageKey = '@MyApp:CustomGoogleOAuthKey';

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
<<<<<<< HEAD
    await AsyncStorage.removeItem(StorageKey);

    return null;
  } catch (e) {
    alert(`Failed to revoke token: ${e.message}`);
  }
}

=======
    
>>>>>>> origin/main
