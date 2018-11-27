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
   ScanTemporaire: {
    screen: ScanTemporaire,
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
export default createStackNavigator({ BottomNavigator }, { headerMode: "none" });
