import {createStackNavigator, createAppContainer} from 'react-navigation';
import * as screen  from './src/screens/index';

const MainStack = createStackNavigator({
    Splash: screen.Splash,
    HomePage : screen.HomePage,
    SignUp: screen.SignUp
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
    MyModal: screen.ModalScreen
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default createAppContainer(RootStack);
