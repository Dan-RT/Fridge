// Components/ingredientItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import Swipeout from 'react-native-swipeout'
import Dialog from "react-native-dialog"
import { getDeleteIngredient } from '../API/FoodAPI'
import { token } from '../js/utils'

class IngredientItem extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        visible: false
      }
    }

  Delete = () => {
    getDeleteIngredient(false,token,this.props.ingredient.barCode, function(){
      console.log("CALLBACK \n\n");
      this.props.loadFridge()
    });
    this.setState({ visible: false })
    console.log("Deleting it")
  }

  handleCancel = () => {
    this.setState({ visible: false })
    console.log("Cancel it")
  }

  ShopList = () => {
    this.setState({ visible: false })
    getDeleteIngredient(true,token,this.props.ingredient.barCode)
    console.log("add it")
    console.log("Deleting it")
  }

  render() {
    var swipeoutBtnsRight = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        onPress: () => {this.setState({ visible: true })}
      }
    ]
    const { ingredient} = this.props
    return (
      <Swipeout left = {swipeoutBtnsRight} autoClose = {true}>
      <View style={styles.main_container}>
            <Text style={styles.description_text}>{ingredient.name}</Text>
            <Dialog.Container visible={this.state.visible}>
              <Dialog.Title>Ingredient suppression</Dialog.Title>
                <Dialog.Description>
                  Do you want to put it in your shop list before deleting it?
                  </Dialog.Description>
                <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                <Dialog.Button label="Shop list" onPress={this.ShopList} />
                <Dialog.Button label="Delete it" onPress={this.Delete} />
            </Dialog.Container>


      </View>
      </Swipeout>


    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 75,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: "white"
  },
  description_text: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#666666'
  }

})

export default IngredientItem
