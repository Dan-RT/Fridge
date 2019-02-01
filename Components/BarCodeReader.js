/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {createStackNavigator} from 'react-navigation';

export default class BarCodMenu extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
        barcodeFinderVisible: true
      },
      bcode: '',
      isAdding:true,
    }
  }


  render() {
    //this.props.navigation is magically create by react-native and it has a .getParam function
    this.state.isAdding = this.props.navigation.getParam('isAdding',true);

    return (
      <View style={styles.container}>
        <RNCamera style={styles.preview}
                  onBarCodeRead={this.onBarCodeRead}
                  ref={cam => this.camera = cam}
                  barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
                  barcodeFinderWidth={280}
                  barcodeFinderHeight={220}
                  barcodeFinderBorderColor="white"
                  barcodeFinderBorderWidth={2}
                  defaultTouchToFocus
                  flashMode={this.state.camera.flashMode}
                  mirrorImage={false}
                  onBarCodeRead={this.onBarCodeRead.bind(this)}
                  type={this.state.camera.type}/>

        <View  style={[styles.overlay, styles.topOverlay]} >
          <Text style={styles.screenMessage} >Is Adding: {this.state.isAdding.toString()}</Text>
        </View>
        <View  style={[styles.overlay, styles.bottomOverlay]} >
          <Text style={styles.screenMessage} >The FN bcode: {this.state.bcode}</Text>
        </View>

      </View>);


  }

  //stores the bcode in the state. This is refered by our text element in our demo view above
  //TODO: setState is actually async. There's a way to use callbacks or similar to ensure consistency
  //check out freecodecamp.org: understanding state in react
  onBarCodeRead(scan){
    console.log(scan.type);
    console.log(scan.data);
    if (scan.data!=null){
      this.setState({bcode: scan.data});

      if (this.state.isAdding){
        this.props.navigation.navigate('ItemAddition', {bcode:scan.data})

      } else {
        alert("deleting this code to DB" + this.state.bcode);
        this.props.navigation.navigate('ItemRemoval', {bcode:scan.data})
      }


    }

  }
}



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
