import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import firebase from 'react-native-firebase';


export default class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  static navigationOptions = {
    title: 'Orders',
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
          <Text>this is orders page.</Text>
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
