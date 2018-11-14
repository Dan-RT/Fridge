import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from 'react-native'
import { postNewRecipe, getDeleteRecipe } from '../API/FoodAPI'

class ScanTemporaire extends React.Component {

  _postNewRecipe(){
    postNewRecipe().then(() => {
      console.log("_postNewRecipe API call success");
    }).catch(function(error) {
      console.log("_postNewRecipe API call failed");
      console.log(error);
    });
  }

  _getDeleteRecipe(){
    getDeleteRecipe().then(() => {
      console.log("_postNewRecipe API call success");
    }).catch(function(error) {
      console.log("_postNewRecipe API call failed");
      console.log(error);
    });
  }

    render() {
        return (
          <View style={styles.main_container}>
            <TouchableOpacity style={styles.content_container} onPress={() => this._postNewRecipe()}>
              <View style={styles.header_container}>
                <Text style={styles.title_text}>INSERT RECIPES</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.content_container} onPress={() => this._getDeleteRecipe()}>
              <View style={styles.header_container}>
                <Text style={styles.title_text}>DELETE RECIPES</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
    }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  }
})

export default ScanTemporaire
