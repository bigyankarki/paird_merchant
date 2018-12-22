import React from 'react';
import { StyleSheet, AsyncStorage, ActivityIndicator, StatusBar, Platform, Image, Text, View, ScrollView, Picker } from 'react-native';
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

  componentDidMount() {
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
      await AsyncStorage.setItem('userToken', info.uid); // set the async storage
      const ref = await firebase.firestore().collection('merchants').doc(info.uid);
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
          navigation.navigate('App', {userInfo:info})
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
    let info = this.state.userInfo
    {console.log(info)}
    if(!Object.keys(info).length == 0){
      return (
          <View >

            <View>
              <Text>Hi {this.state.userInfo.displayNme}!</Text>
              <Text>Looks like you are new to Paird.</Text>
              <Text>Please complete the form to signup.</Text>
            </View>

            <View>

              <FormLabel>Business Name</FormLabel>
              <FormInput onChangeText={text => this.handleInputChange('name', text)} />

              <FormLabel>Business type</FormLabel>
              <Picker
                selectedValue={(this.state && this.state.type) || 'options'}
                style={{ height: 50, flex:0 }}
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
    } else{
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
)
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
