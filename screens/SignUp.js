import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import firebase from 'react-native-firebase';

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo : {},
      name : '',
      type : '',
      phone: '',
      address: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  static navigationOptions = {
    title: 'Sign up',
  };

  componentWillMount() {
    const { navigation } = this.props;
    const info = navigation.getParam('userInfo', 'NO-ID');
    this.setState({userInfo : info})
  }

  handleInputChange = (input, text) => {
    this.setState({[input] : text})
    console.log(this.state.name);
  }





  render() {
    return (
        <View >

          <View>
            <Text>Hi {this.state.userInfo.user.givenName}!</Text>
            <Text>Looks like you are new to Paird.</Text>
            <Text>Please complete the form to signup.</Text>
          </View>

          <View>
            <FormLabel>Business Name</FormLabel>
            <FormInput onChangeText={text => this.handleInputChange('name', text)} />

            <FormLabel>Business Type</FormLabel>
            <FormInput onChangeText={(text) => console.log(text)}/>

            <FormLabel>Business Phone Number</FormLabel>
            <FormInput onChangeText={(text) => console.log(text)}/>

            <FormLabel>Business Address</FormLabel>
            <FormInput onChangeText={(text) => console.log(text)}/>

            <Button
            raised
            icon={{name: 'send'}}
            title='Submit'
            onPress={console.log(this.state.businessInfo.name)} />

          </View>

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
