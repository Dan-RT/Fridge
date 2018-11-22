// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, FlatList, Button, TouchableOpacity, Image, TextInput } from 'react-native'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js
import films from '../Helpers/filmsData'
import IngredientItem from './IngredientItem'
import { getFridgeFromApi, postIngredientToApi } from '../API/FoodAPI'
import Dialog from "react-native-dialog";

class HomePage extends React.Component {

  constructor(props) {
      super(props)
      this.newIngredientText = ""
      this.state = {
        fridge: [],
        visible: false
      }
    }


    _newIngredientTextInputChanged(text) {
      this.newIngredientText = text
    }


  _loadFridge() {
      getFridgeFromApi("1594276916").then(data => {
          this.setState({
            fridge: data.results
          });

      });
    
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



    _displayIngredients = (token) => {

      this.props.navigation.navigate("FilmDetail",  { idFilm: idFilm })
    }

  render() {
    this._loadFridge()
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.main_container}>
        <View style={styles.fridge_container}>
          <FlatList
            data={this.state.fridge}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <IngredientItem ingredient={item} />}
            />

            <View style={styles.add_icon}>
            <TouchableOpacity  onPress= {this.showDialog}>

            <Image
              style={styles.image}
              source={require( '../Image/icon_add.png')}
            />
            </TouchableOpacity>
            <Dialog.Container visible={this.state.visible}>
              <Dialog.Title>Add to Fridge</Dialog.Title>
                <Dialog.Description>
                  Do you want to delete this account? You cannot undo this action.
                  </Dialog.Description>
                  <Dialog.Input
          placeholder='Ingredient name'
          onChangeText={(text) => this._newIngredientTextInputChanged(text)}
          onSubmitEditing={() => this._AddIngredient() }/>
                <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                <Dialog.Button label="Add" onPress={this._AddIngredient} />
            </Dialog.Container>

            </View>
        </View>



        <View style = {styles.panel_menu_container}>
        <TouchableOpacity style={styles.scanner_container} onPress={() =>  navigate('Maps')}>
        <Image
          style={styles.image}
          source={require( '../Image/icon_maps.png')}
        />
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanner_container} onPress={() => navigate('ScanTemporaire')}>
          <Image
            style={styles.image}
            source={require( '../Image/icon_bar_code.png')}
          />
          </TouchableOpacity>
          <TouchableOpacity style={styles.scanner_container} onPress={() =>  navigate('SearchRecipes')}>
          <Image
            style={styles.image}
            source={require( '../Image/icon_recipe.png')}
          />

        </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  fridge_container:{
    flex:5
  },
  scanner_container:{
    flex: 1

  },
  dialog_Content: {
    // flex: 1,
    paddingLeft: 18,
    paddingRight: 18,
    // backgroundColor: '#000',
    // opacity: 0.4,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  add_icon:{
    position : 'absolute',
      right: 0,
    bottom: 0,
    justifyContent: 'flex-end'

  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  image:{
    width: 70,
    height: 70,
    margin: 15
  },
  panel_menu_container:{
    flex: 1,
    flexDirection: "row"
  }
})

export default HomePage
