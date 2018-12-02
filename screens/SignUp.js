import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

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
          <FormLabel>Name</FormLabel>
          <FormInput onChangeText={alert("gi")}/>
          <FormValidationMessage>Error message</FormValidationMessage>

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
