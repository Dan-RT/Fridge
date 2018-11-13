import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from 'react-native'
import { addNewIngredient } from '../API/FoodAPI'

class ScanTemporaire extends React.Component {

  _postNewIngredient(){
    addNewIngredient().then(() => {
      console.log("addNewIngredient API call success");
    }).catch(function(error) {
      console.log("addNewIngredient API call failed");
      console.log(error);
    });
  }

    render() {
        return (
          <TouchableOpacity style={styles.main_container} onPress={() => this._postNewIngredient()}>
            <View style={styles.content_container}>
              <View style={styles.header_container}>
                <Text style={styles.title_text}>TEST SCAN</Text>
              </View>
            </View>
          </TouchableOpacity>
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
