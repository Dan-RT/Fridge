/**
 * Adds an item to the DB if the code has details recorded in inventory
 * checks if we have the definition of it in the DB (e.g. what ingredient/food this bcode is)
 * if we have it pre-fills the info with it
 * If we don't then lets user add the details
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, TextInput, View, Picker} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {createStackNavigator} from 'react-navigation';
import Alert from "react-native";

type Props = {};
export default class ItemRemoval extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      bcode:undefined,
      quantity:undefined,
    }
  }


  render() {
    //this.props.navigation is magically create by react-native and it has a .getParam function
    this.state.bcode = this.props.navigation.getParam('bcode',undefined);

    return (
      <View>
        <Text>Enlever du Frigo</Text>
        <Text>Code barre lu: {this.state.bcode}</Text>
        <View style={{backgroundColor:'#ff00ff00'}} >
          <TextInput
            placeholder={"Entrer une quantité"}
            multiline={true}
            keyboardType='numeric'
            onChangeText={(text)=> this.onChanged(text)}
            value={this.state.quantity}
            maxLength={10}  //setting limit of input
          />
        </View>


        <Button
          title="Valider!"
          onPress={this.onSubmit.bind(this)}
        />

      </View>);


  }

  onChanged(text){
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
      if(numbers.indexOf(text[i]) > -1 ) {
        newText = newText + text[i];
      }
      else {
        // your call back function
        alert("Entiers seulement!");
      }
    }
    this.setState({ myNumber: newText });
  }




  // Handler methods
  onSubmit = () =>{
    alert("Item removed" + this.state.quantity);
    this.props.navigation.navigate('BarCodeMenu')
  };

};

// CSS stuff

const styles = StyleSheet.create({

  //containers, divisions, sections...
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  //text styles
  screenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },


  //Positioning stuff
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
});