import { createStackNavigator, createBottomTabNavigator, createAppContainer  } from 'react-navigation'
import SearchRecipes from '../Components/SearchRecipes'
import RecipeDetails from '../Components/RecipeDetails'
import HomePage from '../Components/HomePage'
import ScanTemporaire from '../Components/ScanTemporaire'
import Maps from '../Components/Maps'
import React from 'react'
import { Image} from 'react-native'

const SearchStackNavigator = createStackNavigator({
  RecipeDetails: {
    screen: RecipeDetails,
    navigationOptions: {
        title: 'Details'
    }
  }
})

export default SearchStackNavigator
