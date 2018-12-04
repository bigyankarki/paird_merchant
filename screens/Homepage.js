import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'


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
    const { navigation } = this.props;
    return (
        <View style={styles.container}>
          <Card title="Add item" containerStyle={styles.card}>
          <Icon
            raised
            name='add'
            color='#f50'
            onPress={() => navigation.navigate('MyModal')} />
          </Card>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  card:{
    width:150,
    height:200,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
