import React from 'react'
import { ScrollView, StyleSheet, Button, TextInput, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { View, Text } from 'native-base';
import CheckBox from 'react-native-check-box'
import data from "../testJson/test.json";

class RecipeForm extends React.Component {

  constructor(props) {
    super(props)
    this.recipeName = "",
    this.searchedText = "",
    this.description = "",
    this.label_text = "",
    this.state = {
      ingredients: [],
      selected_ingredients : [],
      isLoading: false,
      hasfailed: false
    }
  }


_AddIngredient(ingredient)
{
      a = []
      if(this.state.selected_ingredients.length == 0)
      {
        this.setState({selected_ingredients:[...this.state.selected_ingredients, ingredient]});
        this.label_text = "You added those to your ingredients for the recipe (click to delete):"
      }
      else {
      a.push(ingredient)
      for(ing in this.state.selected_ingredients)
      {
        if(this.state.selected_ingredients[ing]._id != ingredient._id)
        {
          a.push(this.state.selected_ingredients[ing])
        }

      }
      this.setState({selected_ingredients: a});
    }

}

_RemoveIngredient(ingredient)
{
      a = []
      for(ing in this.state.selected_ingredients)
      {
        if(this.state.selected_ingredients[ing]._id != ingredient._id)
        {
          a.push(this.state.selected_ingredients[ing])
        }

      }
      this.setState({selected_ingredients: a});
      if(a.length == 0)
        this.label_text = ""

}



  _loadIngredients() {

    this.setState({ingredients: []})
    tmp = []
    if (searchedText.length > 0) {

      this.setState({ isLoading: true })
      for(ing in data)
      {
        if(data[ing].name.includes(searchedText))
          tmp.push(data[ing])
      }
      this.setState({ingredients: tmp, isLoading: false,
      hasfailed: false})
  }
}

  _ChangeRecipeName = (text) => {
    recipeName = text
  }

  _ChangeDescription = (text) => {
    description = text
  }

  _ChangeSearchText = (text) => {
    searchedText = text
  }

  render() {
    return(
<ScrollView>
      <View>
        <View style = {styles.recipe_name}>
          <Text style={styles.text_container} >Name</Text>
          <TextInput
          style={styles.text_container}
            placeholder='Name'
            onChangeText={this._ChangeRecipeName}
            />
        </View>

        <View style = {styles.recipe_ingredients}>
          <Text style={ styles.text_container}>Choose your ingredients</Text>
          <TextInput
            style={styles.textinput, styles.text_container}
            placeholder='Ingredient name'
            onChangeText={this._ChangeSearchText}
            onSubmitEditing={() => this._loadIngredients()}
          />
          <FlatList
            data={this.state.ingredients}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({item}) =>
            <Text style={ styles.text_list_container} onPress = {() => this._AddIngredient(item)}>{item.name} </Text>}
            onEndReachedThreshold={0.5}
          />
        </View>

        <View style = {styles.recipe_description}>
        <Text style={styles.text_container}>{this.label_text}</Text>
        </View>
        <View style = {styles.recipe_description}>
        <FlatList
          data={this.state.selected_ingredients}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({item}) =>
           <Text style={styles.text_list_container} onPress = {() => this._RemoveIngredient(item)}>{item.name}</Text>
         }
          onEndReachedThreshold={0.5}
        />

        <TextInput
          style={styles.description_input }
          multiline = {true}
          numberOfLines = {6}
          placeholder='Description'
          onChangeText={this._ChangeDescription}
        />
        <Button
  title="Add Recipe"
  onPress={() =>console.log(this.state.selected_ingredients)}
/>
        </View>
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  submitButton: {
    flex:1,
    paddingHorizontal: 10,
    paddingTop: 20,
      position : 'absolute',
      alignItems: 'center',
      justifyContent: 'flex-end'

  },
  text_container: {
    flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#666666',
      backgroundColor: "white"
    },
    textinput: {
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5
    },
    description_input: {
      flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666666',
        backgroundColor: "white",
      borderColor: '#000000',
      borderWidth: 1,
      margin:2
    },
    text_list_container: {
      flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666666',
        backgroundColor: "white",
        borderWidth: 1,
        margin: 2
      },
}
)
// These Fields will create a login form with three fields





export default RecipeForm
