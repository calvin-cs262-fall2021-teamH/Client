import REact from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GeolocationPrototype } from '../screens/GeolocationPrototype';
import { globalStyles } from '../styles/global';
import * as Location from 'expo-location';
// const InteractionButton = () => {
//     const [currentLocation, setCurrentLocation] = useState(null);
//     function swap() {
//         const element = (
//           <div>
//             <h1>Hello, world!</h1>
//             <h2>It is {new Date().toLocaleTimeString()}.</h2>
//           </div>
//         );

//         ReactDOM.render(
//           element,
//           document.getElementById('root')
//         );
//       }
    
//     if Date()
//     return (
//         <TouchableOpacity style = {[ globalStyles.interactionButton]} onPress={() => navigation.navigate('PointInfo', )}></TouchableOpacity>
//     )
// }

// export default InteractionButton;

const InteractionButton = ({navigation}) => {
    const [watcher, setWatcher] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        await Location.watchPositionAsync({
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 1,
          timeInterval: 1000
        }, ({coords}) => {
          console.log({coords});
          setCurrentLocation(coords);
        }).then((locationWatcher) => {
          setWatcher(locationWatcher);
        }).catch((err) => {
          console.log(err);
        });
        return () => {
          watcher.remove();
          // TODO: make sure this is getting called when the screen is left.
          // If it's not called then we could have a memory leak.
        }
      })()
    }, [])
    return (
      <View style={styles.container}>
        {currentLocation && currentLocation.latitude && (
          <Text>{currentLocation.latitude}</Text>
        )}
  
        {currentLocation && currentLocation.longitude && (
          <Text>{currentLocation.longitude}</Text>
        )}
      </View>
    );
  }

export default InteractionButton;

