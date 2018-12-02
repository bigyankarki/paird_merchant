import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Splash from './screens/Splash';
import Homepage from './screens/Homepage';
import SignUp from './screens/SignUp';

const AppNavigator = createStackNavigator({
    Splash: Splash,
    Homepage : Homepage,
    SignUp: SignUp
});

export default createAppContainer(AppNavigator);
