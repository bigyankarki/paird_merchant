import React from 'react';
import { StyleSheet, Platform, Image, ScrollView, Text, View } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import firebase from 'react-native-firebase';
import {createStackNavigator} from 'react-navigation';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      items: []
    };
  }

  static navigationOptions = ({ navigation }) => {
    let name = navigation.getParam('userInfo', 'A Nested Details Screen')
    return {
      title: `Welcome ${name.displayName}`
    };
  };

  componentWillMount() {
    const { navigation } = this.props;
    const info = navigation.getParam('userInfo', 'NO-ID');
    this.setState({userInfo : info})
  }

  async componentDidMount() {
    const ref = await firebase.firestore().collection('merchants').doc(this.state.userInfo.uid);
    let items = [];
    ref.get().then((snapshot) => {
      snapshot.data().menu.forEach((doc) =>{
        let res = {
          item_description: doc.item_description,
          image_url: doc.image_url
        };
        items.push(res);
      })
      this.setState({items:items})
    })
    .catch((error) =>{
      console.log("Error: "+error);
    })
  }

  render() {
    const { navigation } = this.props;
    if(this.state.items){
      return(
        <ScrollView style={styles.container}>
          <View>
          {this.state.items.map((itemName,index) =>(
            <Card title = {itemName.item_description} containerStyle={styles.card}>
              <Image source={{uri: itemName.image_url}} style={{height:200, width:200}} resizeMode='stretch'/>
            </Card>
          ))}
          <Card title="Add item" containerStyle={styles.card}>
          <Icon
            raised
            name='add'
            color='#f50'
            onPress={() => navigation.navigate('MyModal', {userInfo: this.state.userInfo})} />
          </Card>
          </View>
        </ScrollView>
      );
    }
    return (
        <View style={styles.container}>
          <Card title="Add item" containerStyle={styles.card}>
          <Icon
            raised
            name='add'
            color='#f50'
            onPress={() => navigation.navigate('MyModal', {userInfo: this.state.userInfo})} />
          </Card>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  card:{
    alignItems: 'center'
  }
});
