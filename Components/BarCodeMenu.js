/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View, ToastAndroid} from 'react-native';


export default class BarCodMenu extends React.Component {
  constructor(props){
    super(props);

    this.state = {

    }
  }


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Barcode Menu</Text>
        <Button
          title="AJOUTER un item"
          onPress={this.onAddItem.bind(this)}
        />
        <Button
          title="ENLEVER un item"
          onPress={this.onRemoveItem.bind(this)}
        />

      </View>);


  }



// Handler methods
onAddItem = () =>{
    console.log("ADD an item");
    this.props.navigation.navigate('BarCodeReader', {isAdding:true})
};
onRemoveItem(){
  console.log("REMOVE an item");
  this.props.navigation.navigate('BarCodeReader', {isAdding:false})
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