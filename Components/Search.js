// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator  } from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js

class Search extends React.Component {

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("FilmDetail",  { idFilm: idFilm })
  }


  constructor(props) {
      super(props)
    this.searchedText =  ""
      this.state = {
        films: [],
        isLoading: false
      }
      // Ici on va créer les propriétés de notre component custom Search
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _displayLoading() {
     if (this.state.isLoading) {
       return (
         <View style={styles.loading_container}>
           <ActivityIndicator size='large' />
           {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
         </View>
       )
     }
   }

    _loadFilms() {
      if (this.searchedText.length > 0) {
        this.setState({ isLoading: true }) // Lancement du chargement
        getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
            this.setState({
              films: data.results,
              isLoading: false // Arrêt du chargement
            })
        })
      }
  }


  render() {
    return (
      <View style={styles.main_container}>
        <TextInput style={styles.textinput}
         placeholder='Titre du film'
         onChangeText={(text) => this._searchTextInputChanged(text)}
         onSubmitEditing={() => this._loadFilms()}
         />
        <Button style={{ height: 50 }} title='Rechercher' onPress={() => this._loadFilms()}/>
        <FlatList
  data={this.state.films}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} />}
/>
{this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
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
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  }
})

export default Search
