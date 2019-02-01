import React from 'react'
import { StyleSheet, View, Text, FlatList, Button, TouchableOpacity, Image, TextInput, Dimensions, ToastAndroid  } from 'react-native'
import IngredientItem from './IngredientItem'
import ShopListItem from './ShopListItem'
import { getFridgeFromApi, postIngredientToApi, getGroceries } from '../API/FoodAPI'
import Dialog from "react-native-dialog"
import { TabView, TabBar, SceneMap,PagerPan } from 'react-native-tab-view'
import { token } from '../js/utils'

class HomePage extends React.Component {

  constructor(props) {
      super(props)
      this.newIngredientBC = ""
      this.state = {
        fridge: [],
        groceries: [],
        visible: false,
        index: 0,
        routes: [
          { key: 'first', title: 'Your fridge' },
          { key: 'second', title: 'Your shop list' },
        ]
      }
    }

    componentDidMount() {
      this.loadFridge();
      this.loadGroceries();
    }

    _newIngredientTextInputChanged(text) {
      this.newIngredientBC = text
    }

    loadFridge() {
      console.log("\nLOAD FRIDGE\n\n");
      getFridgeFromApi(token).then(data => {
          this.setState({
            fridge: data
          });
      });
    }

    loadGroceries(){
      getGroceries(token).then(data => {
          this.setState({
            groceries: data
          });
      });
    }

    _AddIngredient = () => {
      if(this.newIngredientBC != ""){
        console.log(this.newIngredientBC);
        this.setState({ visible: false })
        this.props.navigation.navigate('ItemAddition', {bcode: this.newIngredientBC})
        this.newIngredientBC = '';
      }else{
        ToastAndroid.show("You need to add barcode", ToastAndroid.LONG)
      }
    }

    showDialog = () => {
      this.setState({ visible: true });
    };

    handleCancel = () => {
      this.setState({ visible: false });
    };

  render() {
    const FirstRoute = () => (
      <View style={styles.fridge_container}>
      <FlatList
        data={this.state.fridge}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({item}) => <IngredientItem ingredient={item} loadFridge={this.loadFridge}/>}
        />
        <View style={styles.add_icon}>
          <TouchableOpacity  onPress= {this.showDialog}>

          <Image
            style={styles.image}
            source={require( '../Image/icon_add.png')}
          />
          </TouchableOpacity>

          <Dialog.Container visible={this.state.visible}>
            <Dialog.Title>Add to Fridge</Dialog.Title>
              <Dialog.Description>
                Type the new ingredient's bar code
                </Dialog.Description>
                <Dialog.Input
                  placeholder='Ingredient name'
                  keyboardType='numeric'
                  onChangeText={(text) => this._newIngredientTextInputChanged(text)}
                  onSubmitEditing={() => this._AddIngredient() }/>
              <Dialog.Button label="Cancel" onPress={this.handleCancel} />
              <Dialog.Button label="Add" onPress={this._AddIngredient} />
          </Dialog.Container>
        </View>
      </View>
    );

    const SecondRoute = () => (
      <View style={styles.fridge_container}>
        <FlatList
          data={this.state.groceries}
          //data = {d}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({item}) => <ShopListItem ingredient={item} />}
        />
      </View>
    );

    const { navigate } = this.props.navigation;
    return (

      <View style={styles.main_container}>
        <TabView
        style={styles.fridge_container }
          navigationState={this.state}
          renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute,
          })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,

  },
  fridge_container:{
    flex:5,
  },
  scanner_container:{
    flex: 1

  },
  dialog_Content: {
    // flex: 1,
    paddingLeft: 18,
    paddingRight: 18,
    // backgroundColor: '#000',
    // opacity: 0.4,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  add_icon:{
    position : 'absolute',
      right: 0,
    bottom: 0,
    justifyContent: 'flex-end'

  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  image:{
    width: 50,
    height: 50,
    margin: 15
  },
  panel_menu_container:{
    flex: 1,
    flexDirection: "row"
  }
})

export default HomePage
