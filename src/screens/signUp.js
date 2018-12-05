import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, Picker } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import firebase from 'react-native-firebase';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo : {},
      name : '',
      type : '',
      phone: '',
      address: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
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
    this.setState({[input] : text});
  }

  submit = async () => {
    const { navigation } = this.props;
    const info = this.state.userInfo;
    if(this.state.type != 'options'){
      const ref = await firebase.firestore().collection('merchants').doc(this.state.userInfo.uid);
      if(!ref.exists){
        ref.set({
          userInfo: this.state.userInfo,
          business_name: this.state.name,
          business_type: this.state.type,
          business_phone: this.state.phone,
          business_address: this.state.address
        })
        .then(function() {
          console.log("Document successfully written!");
          (() => {
            navigation.push('HomePage', {userInfo:info})
          })()
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
      }
    } else{
      alert('please select type of your business.')
    }
  }

  render() {
    return (
        <View >

          <View>
            <Text>Hi {this.state.userInfo.displayName}!</Text>
            <Text>Looks like you are new to Paird.</Text>
            <Text>Please complete the form to signup.</Text>
          </View>

          <View>

            <FormLabel>Business Name</FormLabel>
            <FormInput onChangeText={text => this.handleInputChange('name', text)} />

            <FormLabel>Business type</FormLabel>
            <Picker
              selectedValue={(this.state && this.state.type) || 'options'}
              prompt='Select your business type.'
              onValueChange={(itemValue, itemIndex) => this.handleInputChange('type', itemValue)}>
              <Picker.Item label='Please select an option...' value='options' />
              <Picker.Item label="Restaurants" value="res" />
              <Picker.Item label="Store" value="store" />
            </Picker>

            <FormLabel>Business Phone Number</FormLabel>
            <FormInput onChangeText={text => this.handleInputChange('phone', text)}/>

            <FormLabel>Business Address</FormLabel>
            <FormInput onChangeText={text => this.handleInputChange('address', text)}/>

            <Button
            raised
            icon={{name: 'send'}}
            title='Submit'
            onPress={this.submit} />

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
