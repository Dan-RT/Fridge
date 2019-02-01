import React from 'react'
import { StyleSheet,Button, View, TextInput, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, Dimensions } from 'react-native'
import RecipeItem from './RecipeItem'
import RecipeForm from './RecipeForm'
import Dialog from "react-native-dialog"
import { TabView, TabBar, SceneMap,PagerPan } from 'react-native-tab-view'

import { getRecipesFromFridge } from '../API/FoodAPI'
import { token } from '../js/utils'

class SearchRecipe extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = ""
    this.state = {
      recipes: [],
      isLoading: false,
      hasfailed: false,
    }
  }

  componentDidMount() {
    this._loadRecipesFridge();
  }

  _displayDetailForRecipe = (recipe) => {
      this.props.navigation.navigate("RecipeDetails", { recipe: recipe })
  }

  _displayForm =() => {
      this.props.navigation.navigate("RecipeForm")
  }

  _loadRecipesFridge() {
      getRecipesFromFridge(token).then(data => {
          console.log("AFTER getRecipesFromFridge");
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
    return(
      <View  style={styles.main_container}>
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
  fridge_container:{
    flex:5,
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
