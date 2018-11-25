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
        visible: false,
        visible2: false
      }
    }

AddIngredientToShopList()
{
  console.log("Adding it")
}

DeleteIngredient()
{
  console.log("Deleting it")
}

DeleteAndAdd = () => {
  this.setState({ visible: false })
  this.setState({ visible2: false })
      console.log("Deleting and add it")
      }


Delete = () => {
    this.setState({ visible: false })
    this.setState({ visible2: false })
    console.log("Deleting it")
  }

handleCancel = () => {
    this.setState({ visible: false })
    console.log("Cancel it")
  }

  handleCancelDialog2 = () => {
      this.setState({ visible2: false })
      console.log("Cancel it")
    }

AddToShopList = () => {
  this.setState({ visible: false })
  this.setState({ visible2: false })
        console.log("add it")
    }
ShowShopListDialog = () => {
      this.setState({ visible2: true })
        console.log("shop list dialog")
    }

  render() {
    var swipeoutBtnsRight = [
    {
      text: 'Modify',
      backgroundColor: 'blue',
      onPress: () => {this.setState({ visible: true })}
    }
    ]
    const { ingredient} = this.props
    return (
      <Swipeout left = {swipeoutBtnsRight} autoClose = {true}>
      <View style={styles.main_container}>
            <Text style={styles.description_text}>{ingredient.name}</Text>
            <Dialog.Container visible={this.state.visible}>
              <Dialog.Title>Ingredient modification</Dialog.Title>
                <Dialog.Description>
                  What do you want to do to this ingredient?
                  </Dialog.Description>
                <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                <Dialog.Button label="Shop list" onPress={this.ShowShopListDialog} />
                <Dialog.Button label="Delete it" onPress={this.Delete} />
            </Dialog.Container>

            <Dialog.Container visible={this.state.visible2}>
              <Dialog.Title>Add to Fridge</Dialog.Title>
                <Dialog.Description>
                  Do you want to delete this ingredient before adding it to the shop list?
                  </Dialog.Description>
                <Dialog.Button label="Cancel" onPress={this.handleCancelDialog2} />
                <Dialog.Button label="Yes" onPress={this.DeleteAndAdd} />
                <Dialog.Button label="No" onPress={this.AddToShopList} />
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
