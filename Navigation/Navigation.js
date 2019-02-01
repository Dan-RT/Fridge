import { createStackNavigator, createBottomTabNavigator, createAppContainer  } from 'react-navigation'
import SearchRecipes from '../Components/SearchRecipes'
import RecipeDetails from '../Components/RecipeDetails'
import RecipeForm from '../Components/RecipeForm'
import HomePage from '../Components/HomePage'
import BarCodeMenu from '../Components/BarCodeMenu'
import BarCodeReader from '../Components/BarCodeReader'
import ItemAddition from '../Components/ItemAddition'
import ItemRemoval from '../Components/ItemRemoval'
import Maps from '../Components/Maps'

import React from 'react'
import { Image} from 'react-native'

const BottomNavigator = createBottomTabNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      title: '',
      tabBarIcon: (focused, tintColor) => (
     <Image style={{ width: 50, height: 50 }}
            source={require('../Image/icon_home.png')} />)
    },
  },
  SearchRecipes: {
     screen: SearchRecipes,
     navigationOptions: {
       title: '',
       tabBarIcon: (focused, tintColor) => (
      <Image style={{ width: 50, height: 50 }}
             source={require('../Image/icon_recipe.png')} />),
     }

   },
   BarCodeMenu: {
    screen: BarCodeMenu,
    navigationOptions: {
      title: '',
      tabBarIcon: (focused, tintColor) => (
     <Image style={{ width: 45, height: 45 }}
            source={require('../Image/icon_bar_code.png')} />)
    }

  },
  Maps: {
    screen: Maps,
    navigationOptions: {
      title: '',
        tabBarIcon: (focused, tintColor) => (
       <Image style={{ width: 50, height: 50 }}
              source={require('../Image/icon_maps.png')} />)
      }

  }
}

)

const SearchStackNavigator = createStackNavigator({
  HomePage: {
    screen: BottomNavigator,
    navigationOptions: {
      title: 'Your Fridge'
    }
  },
  RecipeDetails: {
    screen: RecipeDetails,
    navigationOptions: {
        title: 'Details'
    }
  },
  RecipeForm: {
    screen: RecipeForm,
    navigationOptions: {
        title: 'Recipe Form'
    }
  },
  BarCodeReader: {
      screen: BarCodeReader,
      navigationOptions: {title: 'Main Scan Screen'}
  },
  ItemAddition:{
    screen: ItemAddition,
    navigationOptions:{title: 'Ajouter un item'}
  },
  ItemRemoval:{
    screen: ItemRemoval,
    navigationOptions:{title: 'Enlever un item'}
  },


})

export default SearchStackNavigator
