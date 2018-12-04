import React from 'react';
import { StyleSheet, Image, View, Text, ScrollView } from 'react-native';
import { Card, Button, ListItem, Icon, FormLabel, FormInput, Divider } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

export default class ModalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item_image_uri : '',
      item_name : '',
      item_description : '',
      item_price : ''
    };
    this.pickImage = this.pickImage.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
        : <Image style={{width: 350, height: 350}} source={{uri:  this.state.item_image_uri}}/>}

              <Divider style={{ backgroundColor: 'gray' }} />

              <FormLabel>Item Name</FormLabel>
              <FormInput containerStyle={styles.inputField} onChangeText={text => console.log(text)}/>

              <FormLabel>Item description</FormLabel>
              <FormInput multiline={true} containerStyle={styles.inputField} onChangeText={text => console.log(text)}/>

              <FormLabel>Item Price</FormLabel>
              <FormInput keyboardType='decimal-pad' containerStyle={styles.inputField} onChangeText={text => console.log(text)}/>

              <Button
                icon={{name: 'send'}}
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 50, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 20}}
                title='SAVE'
                onPress={() => this.props.navigation.goBack()}
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
