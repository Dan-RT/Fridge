import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native'

class RecipeItem extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        dataSource: ['e',"rr", "ffff"]
      };
    }


  render() {
    const { recipe, displayDetailForRecipe } = this.props

console.log("recipe.ingredients")
  console.log(recipe.ingredients)
  console.log("reciperrrr")
    return (

      <TouchableOpacity style={styles.main_container} onPress={() => displayDetailForRecipe(recipe._id)}>
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{recipe.name}</Text>
          </View>

          <View >
          { recipe.ingredients.slice(0, 3).map((item, key)=>(

         <Text  key={key}  > { item } </Text>)
         )}


          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={4}>{recipe.description}</Text>
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
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  }
})

export default RecipeItem
