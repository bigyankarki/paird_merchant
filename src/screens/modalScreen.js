import React from 'react';
import { StyleSheet, Image, View, Text, ScrollView, Platform } from 'react-native';
import { Card, Button, ListItem, Icon, FormLabel, FormInput, Divider } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';

export default class ModalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
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

  componentWillMount() {
    const { navigation } = this.props;
    const info = navigation.getParam('userInfo', 'NO-ID');
    this.setState({userInfo : info})
  }


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
  // store the image.
  let image = await firebase.storage().ref('/merchants/'+firebase.auth().currentUser.uid).child(`${this.state.item_name}`+'.jpg')
      .put(this.state.item_image_uri, { contentType : 'image/jpeg' }) //--> here just pass a uri
      .then((snapshot) => {
        // console.log(snapshot.downloadURL);
        return snapshot.downloadURL
      })
  console.log(image);
  this.setState({image_url : image})
  const userInfo = this.state.userInfo;
  // update database
  const ref = await firebase.firestore().collection('merchants').doc(this.state.userInfo.uid);
  const res = {
    image_url : this.state.image_url,
    item_name : this.state.item_name,
    item_description : this.state.item_description,
    item_price : this.state.item_price
  }
  ref.update({
    menu: firebase.firestore.FieldValue.arrayUnion(res)
  })
  .then(function() {
    console.log("Document successfully written!");
    (() => {
      navigation.state.params.onNav('false')
      navigation.goBack()
    })()
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
}

  render() {
    return (

      <ScrollView>
        <Card title="Add an item" style={styles.container}>

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
