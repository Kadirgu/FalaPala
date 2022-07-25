import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';

// import the screens
import Chat from './components/Chat';
import Start from './components/Start';

// import react native gesture handler
import 'react-native-gesture-handler';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Create the navigator
const Tab = createBottomTabNavigator();

export default class App extends React.Component {
 constructor(props) {
   super(props);
   this.state = { text: '' };
 }

 render() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Start">
        <Tab.Screen name="Start" component={Start}/>
        <Tab.Screen name="Chat" component={Chat}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
}