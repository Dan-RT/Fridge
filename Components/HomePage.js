// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, FlatList, Button, TouchableOpacity, Image, TextInput } from 'react-native'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import Dialog, { DialogContent } from 'react-native-popup-dialog';

class HomePage extends React.Component {

  constructor(props) {
      super(props)
      this.newIngredientText = ""
      this.state = {
        films: [],
      }
      // Ici on va créer les propriétés de notre component custom Search
    }

    _newIngredientTextInputChanged(text) {
      this.newIngredientText = text
    }

  _loadFridge() {
      getFilmsFromApiWithSearchedText("Harry").then(data => {
          this.setState({
            films: data.results
          })
      })
    }

    _AddIngredient(){
      console.log(this.newIngredientText)
    }

    _displayDetailForFilm = (idFilm) => {
      this.props.navigation.navigate("FilmDetail",  { idFilm: idFilm })
    }
  render() {
    this._loadFridge()
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.main_container}>
        <View style={styles.fridge_container}>
          <FlatList
            data={this.state.films}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} />}
            />
            <View style={styles.add_icon}>
            <TouchableOpacity  onPress={() => {this.setState({ visible: true });}}>

            <Image
              style={styles.image}
              source={require( '../Image/icon_add.png')}
            />
            </TouchableOpacity>
            <Dialog
        visible={this.state.visible}
          onTouchOutside={() => {
          this.setState({ visible: false });
        }}
      >
      <DialogContent style = {styles.dialog_Content}>
      <View style={{margin: 30}}>
        <TextInput
          style={styles.textinput}
          placeholder='Ingredient name'
          onChangeText={(text) => this._newIngredientTextInputChanged(text)}
          onSubmitEditing={() => this._AddIngredient()}

        />
        <Button style={{ height: 50 }} title='Summit ingredient' onPress={() => _AddIngredient()}/>
      </View>
   </DialogContent>
       </Dialog>


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
