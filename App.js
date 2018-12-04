import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Splash from './screens/Splash';
import Homepage from './screens/Homepage';
import SignUp from './screens/SignUp';
import ModalScreen from './screens/ModalScreen';

const MainStack = createStackNavigator({
    Splash: Splash,
    Homepage : Homepage,
    SignUp: SignUp
},
{
    initialRouteName: 'Splash',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
});

const RootStack = createStackNavigator(
  {
    Main: MainStack,
    MyModal: ModalScreen
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default createAppContainer(RootStack);
