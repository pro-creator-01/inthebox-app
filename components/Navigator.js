import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';
import AddCampaign from '../screens/AddCampaign';
import EmailLists from '../screens/EmailLists';
import AddList from '../screens/AddList';

const HomeStack = createStackNavigator();

export function HomeStackScreen() {
    return (
    <HomeStack.Navigator>
        <HomeStack.Screen name="Dashboard" component={Dashboard} />             
        <HomeStack.Screen name="NewCampaign" component={AddCampaign} />
    </HomeStack.Navigator>
    );
}

const EmailStack = createStackNavigator();

export function EmailStackScreen() {
    return (
    <HomeStack.Navigator>
        <HomeStack.Screen name="EmailList" component={EmailLists} />             
        <HomeStack.Screen name="NewList" component={AddList} />
    </HomeStack.Navigator>
    );
}