import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Authentication from './screens/Authentication';
import { HomeStackScreen, EmailStackScreen } from './components/Navigator';
import keys from './config';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    };
    
    this.loginAdmin = this.loginAdmin.bind(this);
  }  

  loginAdmin(username, password) {
    if (username === keys.username && password === keys.password) {
      this.setState({ auth: true });
    }
  }

  render() {
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();

    return (
    <>
    {this.state.auth
    ? <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="MailLists" component={EmailStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    : <NavigationContainer>
        <Stack.Navigator headerMode={"none"}>
          <Stack.Screen name="Auth">
          {props => <Authentication {...props} loginAdmin={this.loginAdmin} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    }      
    </>
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
