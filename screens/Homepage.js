import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'


import firebase from 'react-native-firebase';
import {createStackNavigator} from 'react-navigation';

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => {
    let name = navigation.getParam('userInfo', 'A Nested Details Screen')
    return {
      title: `Welcome ${name.user.givenName}`
    };
  };

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }

  render() {
    const users = [
     {
        name: 'brynn',
        avatar: 'https://www.recipetineats.com/wp-content/uploads/2018/05/Chicken-Pad-Thai_0.jpg'
     }]
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>This is a homepage</Text>


          <Card
            title='HELLO WORLD'
            image={{uri: 'https://www.recipetineats.com/wp-content/uploads/2018/05/Chicken-Pad-Thai_0.jpg' }}>
            <Text style={{marginBottom: 10}}>
              The idea with React Native Elements is more about component structure than actual design.
            </Text>
            <Button
              icon={{name: 'code'}}
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='VIEW NOW' />
          </Card>
        </View>
      </ScrollView>
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
