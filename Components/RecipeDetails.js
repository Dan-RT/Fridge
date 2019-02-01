import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native'
import { getRecipesFromApiWithSearchedText } from '../API/FoodAPI'


class RecipeDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: undefined,
      isLoading: true
    }
  }


  _displayRecipe() {

    console.log("RECIPE DETAILS" + JSON.stringify(this.props.recipe));
    if (this.props.recipe != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Text style={styles.title_text}>{this.props.recipe.name}</Text>
          <Text style={styles.description_text}>{this.props.recipe.description}</Text>
        </ScrollView>
      )
    }
  }

  render() {

    return (
      <View style={styles.main_container}>
        {this._displayRecipe()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_container: {
      alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
  },
  favorite_image: {
      width: 40,
      height: 40
  }
})

export default RecipeDetails
