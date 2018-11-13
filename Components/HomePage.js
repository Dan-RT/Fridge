// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, FlatList, Button, TouchableOpacity, Image } from 'react-native'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'

class HomePage extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        films: [],
      }
      // Ici on va créer les propriétés de notre component custom Search
    }

  _loadFridge() {
      getFilmsFromApiWithSearchedText("Harry").then(data => {
          this.setState({
            films: data.results
          })
      })
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
    flex:3
  },
  scanner_container:{
    flex: 1

  },
  image:{
    width: 100,
    height: 100,
    margin: 15
  },
  panel_menu_container:{
    flex: 1,
    flexDirection: "row"
  }
})

export default HomePage
