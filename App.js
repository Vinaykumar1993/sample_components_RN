import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import TextInputFloating from './src/pages/TextInputFloating';
import DropDownSearch from './src/pages/DropDownSearch';
import APIKit from './src/utils/APIKit';
const Drawer = createDrawerNavigator();

export default function App() {
	React.useEffect(async()=>{
		const payload={
    "name": "morpheus",
    "job": "leader"
};
		let awaitresp = await APIKit.post('/users',payload);
		console.log('awaitresp',awaitresp);
		//handle responses
	},[])
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="DropDownSearch">
        <Drawer.Screen name="TextInputFloating" component={TextInputFloating} />
        <Drawer.Screen name="DropDownSearch" component={DropDownSearch} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}