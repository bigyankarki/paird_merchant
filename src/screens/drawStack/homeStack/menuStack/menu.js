import React from 'react';
import { StyleSheet, AsyncStorage, Platform, Image, ScrollView, Text, View } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import firebase from 'react-native-firebase';
import {createStackNavigator} from 'react-navigation';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.reRender = this.props.navigation.addListener('willFocus',()=>{
      this.fetchDatabase();
    })
    this.state = {
      items: [],
      loading: ''
    };
    this.fetchDatabase = this.fetchDatabase.bind(this);
  }

  static navigationOptions = {
    title: 'Menu',
  };

  async fetchDatabase() {
    const uid = await AsyncStorage.getItem('userToken');
    const ref = await firebase.firestore().collection('merchants').doc(uid);
    let items = [];
    ref.get().then((snapshot) => {
      snapshot.data().menu.forEach((doc) =>{
        let res = {
          item_name: doc.item_name,
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

  onClick = (foo) => {
    this.setState({loading:foo})
  }

  render() {
    const { navigation } = this.props;
    if(this.state.items){
      return(
        <ScrollView style={styles.container}>
          {this.state.items.map((item,index) =>(
            <Card key={index} title = {item.item_name} containerStyle={styles.card}>
              <Image source={{uri: item.image_url}} style={{height:200, width:200}} resizeMode='stretch'/>
            </Card>
          ))}
        </ScrollView>
      );
    }
    return (
        <View style={styles.container}>
          <Text></Text>
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
