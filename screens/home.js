/*import * as React from 'react';
import { Button, Text, View } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const useProxy = true;

const redirectUri = AuthSession.makeRedirectUri({
  useProxy,
});

export default function App() {
  const discovery = AuthSession.useAutoDiscovery('https://login.microsoftonline.com/756349b9-0610-4b01-917b-2a4ac10df947/v2.0');//This needs adjustment
  
  // Create and load an auth request
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: 'f1cd0087-3639-4bb6-a3ac-7a859abae009',//my guess we add in the client id here?
      redirectUri,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
    },
    discovery
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Login!" disabled={!request} onPress={() => promptAsync({ useProxy })} />
      {result && <Text>{JSON.stringify(result, null, 2)}</Text>}
    </View>
  );
}
*/

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  // Endpoint
  const discovery = useAutoDiscovery('https://login.microsoftonline.com/756349b9-0610-4b01-917b-2a4ac10df947/v2.0');
  // Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'f1cd0087-3639-4bb6-a3ac-7a859abae009',
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      redirectUri: 'http://localhost:3000/home'
    },
    discovery
  );

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
        }}
    />
  );
}