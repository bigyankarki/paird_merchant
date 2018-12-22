import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator, TabBarBottom, createDrawerNavigator } from 'react-navigation';
import { Icon} from 'react-native-elements';
import * as AuthScreen from './src/screens/authStack/index';
import * as MenuScreen from './src/screens/drawStack/homeStack/menuStack/index';
import * as OrdersScreen from './src/screens/drawStack/homeStack/ordersStack/index';
import * as SettingsScreen from './src/screens/drawStack/settingsStack/index';

// Tab Home Stack
const MenuStack = createStackNavigator({
   Menu: MenuScreen.Menu,
   AddItem : MenuScreen.AddItem
 },{
   initialRouteName: 'Menu',
   defaultNavigationOptions : ({navigation}) => {
     return {
       headerLeft: (<Icon name='menu' color='white' size={40} onPress={() => navigation.toggleDrawer()} />),
       headerRight: (<Icon name='add' color='white' size={40} onPress={() => navigation.navigate("AddItem")} />),
       headerStyle: {backgroundColor: '#f4511e'},
       headerTintColor: '#fff',
       headerTitleStyle: {fontWeight: 'bold'}
     }
   }
  });

// Tab Order Stack
 const OrdersStack = createStackNavigator({
    Order: OrdersScreen.Orders,
  },{
    initialRouteName: 'Order',
    defaultNavigationOptions : ({navigation}) => {
      return {
        headerLeft: (<Icon name='menu' color='white' size={40} onPress={() => navigation.toggleDrawer()} />),
        headerStyle: {backgroundColor: '#f4511e'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'}
      }
    }
  });

// Home Tab stack
const TabStack = createBottomTabNavigator({
  Orders: OrdersStack,
  Menu: MenuStack
},{defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Menu') {
        iconName = `near-me`;
      } else if (routeName === 'Orders') {
        iconName = `shopping-basket`;
      }
      return <Icon name={iconName} size={35} color={tintColor} />;
    },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    animationEnabled: true,
    swipeEnabled: true,
 });

  const SettingsStack = createStackNavigator({
     Settings: SettingsScreen.Settings
   },{
     initialRouteName: 'Settings',
     defaultNavigationOptions : ({navigation}) => {
       return {
         headerLeft: (<Icon name='menu'size={40} color='white' onPress={() => navigation.openDrawer()} />),
         headerStyle: {backgroundColor: '#f4511e'},
         headerTintColor: '#fff',
         headerTitleStyle: {fontWeight: 'bold'}
       }
     }
   });

// Drawer stack
const DrawerStack = createDrawerNavigator({
  Home: TabStack,
  Settings:  SettingsStack
})

// Authorizataion stack
const AuthStack = createStackNavigator({
   Login: AuthScreen.Login,
   SignUp : AuthScreen.SignUp
 });


// Root stack.
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthScreen.AuthLoadingScreen,
    App: DrawerStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
