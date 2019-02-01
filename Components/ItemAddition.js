/**
 * Adds an item to the DB if the code has details recorded in inventory
 * checks if we have the definition of it in the DB (e.g. what ingredient/food this bcode is)
 * if we have it pre-fills the info with it
 * If we don't then lets user add the details
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, TextInput, View, Picker, ToastAndroid} from 'react-native';

import {foodCategories, typeDish, typeMeal, dumToken, token} from '../js/utils'
import {fridgeServerURL, scanServerURL} from '../js/utils'
import {addIngredientFrigo, endpointBcodeCheck, quantityEndPoint, tokenEndPoint, createIngredientEnpoint} from '../js/utils'
import { postAddIngredientFridge } from '../API/FoodAPI'
import { getIngredient, postAddIngredientScan } from '../API/ScanAPI'

export default class ItemAddition extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: "",
      bcode:undefined,
      quantity:undefined,
      currentKeyFoodCategory:"can",
      currentKeyTypeDish:"plats",
      currentKeyTypeMeal:"dinner",
      weight:100,
      token:dumToken,
      isUnknownByScanApi:false,
  }


  }

  componentDidMount(){
    //this.props.navigation is magically create by react-native and it has a .getParam function
    this.setState({bcode : this.props.navigation.state.params.bcode});
    console.log("compodidmount: "+this.props.navigation.state.params.bcode)

    this.findInfoBcode(this.props.navigation.state.params.bcode)
  }


  render() {
    return (

      <View>
        <Text>Ajouter au Frigo</Text>
        <Text>Code barre lu: {this.state.bcode}</Text>
        <View style={{backgroundColor:'#ff00ff00'}} >
          <TextInput
            placeholder={"Mon nom?"}
            multiline={true}
            onChangeText = {(text)=>this.setState({name:text})}
          />
          <TextInput
            placeholder={"Entrer une quantité"}
            multiline={true}
            keyboardType='numeric'
            onChangeText={(text)=> this.onChangedIntegerInput(text)}
            maxLength={10}  //setting limit of input
          />
        </View>
        <Picker
          selectedValue={this.state.currentKeyFoodCategory}
          style={{ height: 50, width: 100 }}
          onValueChange={(newkey) => {this.pickerChangeCatego(newkey)
          }}>
          {
          Object.keys(foodCategories).map((key)=> {
            return <Picker.Item label={foodCategories[key]} value={key} key={key}/>
          })}
        </Picker>

        <Picker
          selectedValue={this.state.currentKeyTypeDish}
          style={{ height: 50, width: 100 }}
          onValueChange={(newkey) => {this.pickerChangeDish(newkey)
          }}>
          {
            Object.keys(typeDish).map((key)=> {
              return <Picker.Item label={typeDish[key]} value={key} key={key}/>
            })}

        </Picker>

        <Picker
          selectedValue={this.state.currentKeyTypeMeal}
          style={{ height: 50, width: 100 }}
          onValueChange={(newkey) => {this.pickerChangeMeal(newkey)
          }}>
          {
            Object.keys(typeMeal).map((key)=> {
              return <Picker.Item label={typeMeal[key]} value={key} key={key}/>
            })}

        </Picker>

        <Button
          title="Valider!"
          onPress={this.onSubmit.bind(this)}
        />
      </View>);
  }
  //finding info about our bcode pro-actively & setting dropdowns according to what we find

  findInfoBcode(bcode){
    //var fullUrl = scanServerURL + endpointBcodeCheck  +  bcode
    //console.log("finding bcode with url:" + fullUrl);
    this.setState({isbcodeChecked:true});
    var serverInfo = getIngredient(bcode).then((respJson) =>{
        console.log("server response to bcode check:");
        console.log(respJson);
        return respJson
      })
      .then((serverResp) => {
        if (Object.keys(serverResp).length<=3) {
          //empty object - server doesn't know what this is
          this.setState({isUnknownByScanApi:true});

        } else {
          //server knows - get params & set defaults
          this.setState({currentKeyFoodCategory :serverResp.foodCategory});
          this.setState({currentKeyTypeDish : serverResp.typeDish});
          this.setState({currentKeyTypeMeal : serverResp.typeMeal});
          console.log("found on server:");
          console.log(serverResp.toString())
        }

      })
      .catch((error)=>{
        console.log("404 not found from our Scan API" + error)

      })
  }



  // ########### HANDLERS
  pickerChangeCatego(newkey){
    this.setState({currentKeyFoodCategory:newkey})
  }
  pickerChangeDish(newkey){
    this.setState({currentKeyTypeDish:newkey})
  }
  pickerChangeMeal(newkey){
    this.setState({currentKeyTypeMeal:newkey})
  }

  onChangedIntegerInput(text){
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
      if(numbers.indexOf(text[i]) > -1 ) {
        newText = newText + text[i];
      }
      else {
        // your call back function
        alert("Entiers seulement!");
      }
    }
    this.setState({ quantity: newText });
  }



  onSubmit = () =>{
    //package that in a JSON & POST it

    var newIngredient = {"name":this.state.name,  "typeDish": this.state.currentKeyTypeDish, "typeMeal": this.state.currentKeyTypeMeal, "weight":this.state.weight,"quantity":this.state.quantity,"keywords":[],"barCode": this.state.bcode};
    postAddIngredientFridge(token, newIngredient);
    if (this.state.isUnknownByScanApi) {
      console.log("\nUNKNOWN\n\n");
      postAddIngredientScan(newIngredient);
    }

    /*var fullUrl = fridgeServerURL + addIngredientFrigo  +this.state.token;
    console.log("Attempt url:" + fullUrl);

    fetch(fullUrl, {
      method: 'POST',
      body: JSON.stringify(newIngredient),
      headers:{
        'Content-type': 'application/json'
      }
    })
      .then((resp) =>resp.json())
      .then((respJson)=>{
        console.log("New ingredient server response:");
        console.log(respJson.toString());
        ToastAndroid.show("Ingrédient " + this.state.name + " ajouté " + this.state.quantity +" fois au Frigo", ToastAndroid.LONG)
      })
      .then(()=>{
        if (this.state.isUnknownByScanApi) {
          //l'ajouter
          fetch(scanServerURL + createIngredientEnpoint, {
          method: 'POST',
            body: JSON.stringify(newIngredient),
            headers:{
            'Content-type': 'application/json'
          }
          })
            .then(()=>{

              console.log("added to scan @ :" + scanServerURL+ createIngredientEnpoint)
              console.log("Added ingredient %j " + newIngredient)
            })
            .catch((error)=>{
              console.log("404 not found from our Scan API")

            });
        }
      })
      .catch((error)=>{
        console.log("404 not found from our Scan API")

      });
      */
      this.props.navigation.navigate('BarCodeMenu')
  };

  // ####### Requests



};

// CSS stuff

const styles = StyleSheet.create({

  //containers, divisions, sections...
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  //text styles
  screenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },


  //Positioning stuff
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
