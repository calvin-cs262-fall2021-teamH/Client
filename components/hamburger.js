// import * as React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import SettingScreen from './screens/setting';
// import MapScreen from './screens/map';

// const Drawer = createDrawerNavigator();

// export default function hamburger() {
//     return (
//         <NavigationContainer>
//           <Drawer.Navigator 
//             drawerType="front"
//             initialRouteName="Map"
//             drawerContentOptions={{
//               activeTintColor: '#e91e63',
//               itemStyle: { marginVertical: 10 },
//             }}
           
//           >
//             {
//               DrawerItems.map(drawer=><Drawer.Screen 
//                 key={drawer.name}
//               />)
//             }
//           </Drawer.Navigator>
//         </NavigationContainer>
//       );
//     }