import React from 'react';
import { StyleSheet, AsyncStorage, Image, View, Text, ScrollView, Platform } from 'react-native';
import { Card, Button, ListItem, Icon, FormLabel, FormInput, Divider } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';

export default class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image_url : '',
      item_image_uri : '',
      item_name : '',
      item_description : '',
      item_price : ''
    };
    this.pickImage = this.pickImage.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = {
    title: 'Add Item'
  };

  pickImage = () => {
    ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
     if (res.didCancel) {
       console.log("User cancelled!");
     } else if (res.error) {
       console.log("Error", res.error);
     } else {
       this.setState({
         item_image_uri: res.uri
       });
     }
   });
  }

  handleInputChange = (input, text) => {
    this.setState({[input] : text})
  }

handleSubmit = async () => {
  const { navigation } = this.props;
  const { navigate } = this.props.navigation;
  const uid = await AsyncStorage.getItem('userToken');

  // store the image.
  let image = await firebase.storage().ref('/merchants/'+uid).child(`${this.state.item_name}`+'.jpg')
      .put(this.state.item_image_uri, { contentType : 'image/jpeg' }) //--> here just pass a uri
      .then((snapshot) => {
        // console.log(snapshot.downloadURL);
        return snapshot.downloadURL
      })
  this.setState({image_url : image})

  // update database
  const res = {
    image_url : this.state.image_url,
    item_name : this.state.item_name,
    item_description : this.state.item_description,
    item_price : this.state.item_price
  }

  const ref = await firebase.firestore().collection('merchants').doc(uid);
  ref.update({
    menu: firebase.firestore.FieldValue.arrayUnion(res)
  })
  .then(() => {
    console.log("Document successfully written!");
    navigation.goBack()
  })
  .catch(error => {
      console.error("Error writing document: ", error);
  });
}

  render() {
    return (

      <ScrollView>
        <Card style={styles.container}>

        {this.state.item_image_uri == '' ?
          <Icon
            raised
            name='add'
            color='#f50'
            containerStyle ={{marginLeft:160, marginTop:100, marginBottom:100}}
            onPress={this.pickImage} />
        : <Image style={{width: 350, height: 350}} source={{uri:this.state.item_image_uri}}/>}

              <Divider style={{ backgroundColor: 'gray' }} />

              <FormLabel>Item Name</FormLabel>
              <FormInput containerStyle={styles.inputField} onChangeText={text => this.handleInputChange('item_name', text)}/>

              <FormLabel>Item description</FormLabel>
              <FormInput multiline={true} containerStyle={styles.inputField} onChangeText={text => this.handleInputChange('item_description', text)}/>

              <FormLabel>Item Price</FormLabel>
              <FormInput keyboardType='decimal-pad' containerStyle={styles.inputField} onChangeText={text => this.handleInputChange('item_price', text)}/>

              <Button
                icon={{name: 'send'}}
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 50, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 20}}
                title='SAVE'
                onPress={this.handleSubmit}
                />

              <Button
                icon={{name: 'cancel'}}
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 50, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 20}}
                title='Dismiss'
                onPress={() => this.props.navigation.goBack()}
                />
        </Card>
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
  },
  inputField:{
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  }
});
