// Components/ingredientItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import Swipeout from 'react-native-swipeout';
import Dialog from "react-native-dialog";

class IngredientItem extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        //fridge: [],
        visible: false
      }
    }


Delete = () => {
    this.setState({ visible: false })
    console.log("Deleting it")
  }

handleCancel = () => {
    this.setState({ visible: false })
    console.log("Cancel it")
  }


ShowShopListDialog = () => {
      this.setState({ visible: true })
        console.log("shop list dialog")
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
      <Swipeout right = {swipeoutBtnsRight} autoClose = {true}>
      <View style={styles.main_container}>
            <Text style={styles.description_text}>{ingredient.name}</Text>
            <Dialog.Container visible={this.state.visible}>
              <Dialog.Title>Ingredient modification</Dialog.Title>
                <Dialog.Description>
                  What do you want to do to this ingredient?
                  </Dialog.Description>
                <Dialog.Button label="Cancel" onPress={this.handleCancel} />
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
