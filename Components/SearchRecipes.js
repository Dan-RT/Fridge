import React from 'react'
import { StyleSheet, View, TextInput, Text, FlatList, ActivityIndicator } from 'react-native'
import RecipeItem from './RecipeItem'

import { getRecipesFromApiWithSearchedText } from '../API/FoodAPI'
import d from "../testJson/testRecipe.json";

class SearchRecipe extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = ""
    this.state = {
      recipes: [],
      isLoading: false,
      hasfailed: false
    }
  }

  _displayDetailForRecipe = (idRecipe) => {
      console.log("Display recipe with id " + idRecipe)
      this.props.navigation.navigate("RecipeDetails", { idRecipe: idRecipe })
  }

  _loadRecipes() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      this.setState({recipes: d, isLoading: false,
      hasfailed: false})
      console.log(this.state.recipes)
      /*getRecipesFromApiWithSearchedText(this.searchedText).then(data => {
          console.log("AFTER getRecipesFromApiWithSearchedText");
          console.log(data);
          this.setState({
            recipes: data,
            isLoading: false,
            hasfailed: false
          })
      }).catch(function(error) {
        console.log("API call failed");
        this.setState({
          recipes: data,
          isLoading: false,
          hasfailed: true
        })
        console.log(error);
      });
    }*/
  }
}

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _displayFailMessage() {
    if (this.state.isLoading == false && this.state.hasfailed == true) {
      return (
        <View>
          <Text style={styles.title_text}>Fail to retrieve data</Text>
        </View>
      )
    }
  }



  render() {
    return (
      <View  style={styles.main_container}>
        <FlatList
          data={this.state.recipes}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({item}) => <RecipeItem recipe={item} displayDetailForRecipe={this._displayDetailForRecipe} />}
          onEndReachedThreshold={0.5}
        />
        {this._displayLoading()}
        {this._displayFailMessage()}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 120,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }

})

export default SearchRecipe
