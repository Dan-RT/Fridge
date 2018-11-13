import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

class RecipeItem extends React.Component {

  render() {
    const { recipe, displayDetailForRecipe } = this.props
    return (
      <TouchableOpacity style={styles.main_container} onPress={() => displayDetailForRecipe(recipe.id)}>
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{recipe.name}</Text>
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
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }
})

export default RecipeItem
