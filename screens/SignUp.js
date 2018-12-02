import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

import firebase from 'react-native-firebase';

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo : {}
    };
  }

  async componentWillMount() {
    const { navigation } = this.props;
    const info = navigation.getParam('userInfo', 'NO-ID');
    this.setState({userInfo : info})
  }

  render() {
    return (
        <View style={styles.container}>
          <Text>Hi {this.state.userInfo.user.givenName}!</Text>
          <Text>Looks like you are new to Paird.</Text>
          <Text>Please complete the form to signup.</Text>
          <GoogleSigninButton
            style={{ width: 312, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this.GSignIn}
            disabled={this.state.isSigninInProgress} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
