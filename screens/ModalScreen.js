import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { Card, Button, ListItem, Icon, FormLabel, FormInput, Divider } from 'react-native-elements';

export default class ModalScreen extends React.Component {
  render() {
    return (

        <Card title="Add an item" style={styles.container}>

            <Icon
              raised
              name='add'
              color='#f50'
              containerStyle ={{marginLeft:160, marginTop:100, marginBottom:100}}
              onPress={() => console.log("add an image.")} />

              <Divider style={{ backgroundColor: 'gray' }} />


              <FormLabel>Item Name</FormLabel>
              <FormInput containerStyle={styles.inputField} onChangeText={text => console.log(text)}/>

              <FormLabel>Item description</FormLabel>
              <FormInput multiline={true} containerStyle={styles.inputField} onChangeText={text => console.log(text)}/>

              <FormLabel>Item Price</FormLabel>
              <FormInput containerStyle={styles.inputField} onChangeText={text => console.log(text)}/>

              <Button
                icon={{name: 'send'}}
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 50, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 20}}
                title='SAVE'
                onPress={() => this.props.navigation.goBack()}
                />

        </Card>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 0,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
  },
  inputField:{
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  }
});
