import React from 'react'
import { StyleSheet,Button, View, TextInput, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import RecipeItem from './RecipeItem'
import RecipeForm from './RecipeForm'
import Dialog from "react-native-dialog";

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

  _displayForm =() => {
      this.props.navigation.navigate("RecipeForm")
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

  _AddIngredient = () => {
    console.log(this.newIngredientText);
    this.newIngredientText = "";
    postIngredientToApi("1594276916");
    this.setState({ visible: false })
  }

  showDialog = () => {
this.setState({ visible: true });
};

handleCancel = () => {
this.setState({ visible: false });
};



  render() {
    return (
      <View  style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Recipe title'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._loadRecipes()}
        />
        <Button
  title="Search Recipe"
  style = {styles.button_style}
  onPress={() => this._loadRecipes()}
/>
        <FlatList
          data={this.state.recipes}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({item}) => <RecipeItem recipe={item} displayDetailForRecipe={this._displayDetailForRecipe} />}
          onEndReachedThreshold={0.5}
        />
        {this._displayLoading()}
        {this._displayFailMessage()}

        <View style={styles.add_icon}>
        <TouchableOpacity  onPress= {this._displayForm}>

        <Image
          style={styles.image}
          source={require( '../Image/icon_add.png')}
        />
        </TouchableOpacity>
      </View>
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
    height: 50,
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
  },
  image:{
    width: 50,
    height: 50,
    margin: 15
  },
  add_icon:{
    position : 'absolute',
      right: 0,
    bottom: 0,
    justifyContent: 'flex-end'

  },
  button_style:{
    backgroundColor: "#2196f3",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    justifyContent: 'center'
  }

})

export default SearchRecipe
