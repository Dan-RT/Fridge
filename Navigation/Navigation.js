import { createStackNavigator } from 'react-navigation'
import SearchRecipes from '../Components/SearchRecipes'
import RecipeDetails from '../Components/RecipeDetails'
import HomePage from '../Components/HomePage'
import ScanTemporaire from '../Components/ScanTemporaire'
import Maps from '../Components/Maps'

const SearchStackNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      title: 'Your Fridge'
    }
  },
  SearchRecipes: {
     screen: SearchRecipes,
     navigationOptions: {
       title: 'Search Recipe'
     }
   },
   ScanTemporaire: {
    screen: ScanTemporaire,
    navigationOptions: {
      title: 'Scan'
    }
  },
  RecipeDetails: {
    screen: RecipeDetails,
    navigationOptions: {
        title: 'Details'
    }
  },
  Maps: {
    screen: Maps,
    navigationOptions: {
        title: 'Your shops'
    }
  }
})

export default SearchStackNavigator
