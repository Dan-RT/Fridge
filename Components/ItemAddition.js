/**
 * Adds an item to the DB if the code has details recorded in inventory
 * checks if we have the definition of it in the DB (e.g. what ingredient/food this bcode is)
 * if we have it pre-fills the info with it
 * If we don't then lets user add the details
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, TextInput, View, Picker} from 'react-native';

import {foodCategories, typeDish, typeMeal} from '../js/utils'
import {fridgeServerURL, scanServerURL} from '../js/utils'
import {endpointIngredientCreate, endpointBcodeCheck} from '../js/utils'



type Props = {};
export default class ItemAddition extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name:"",
      bcode:undefined,
      quantity:undefined,
      currentKeyFoodCategory:"can",
      currentKeyTypeDish:"plats",
      currentKeyTypeMeal:"dinner",
      weight:undefined,
      bcodeCheckURL: scanServerURL,
      scanUrl: scanServerURL,
      serverUrl:fridgeServerURL,
      endpointBcodeCheck: endpointBcodeCheck,
      endpointIngredientCreate: endpointIngredientCreate,
      token:"1868250394",
  }


  }

  componentDidMount(){
    this.setState({bcode : this.props.navigation.getParam('bcode',undefined)});
    this.findInfoBcode()
  }


  render() {
    //this.props.navigation is magically create by react-native and it has a .getParam function


    return (
      <View>
        <Text>Ajouter au Frigo</Text>
        <Text>Code barre lu: {this.state.bcode}</Text>
        <View style={{backgroundColor:'#ff00ff00'}} >
          <TextInput
            placeholder={"Mon nom?"}
            multiline={true}

            onChangedText = {(text)=>{this.setState({name:text})}}
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

  findInfoBcode(){
    console.log("finding bcode with url:"+ this.state.scanUrl + endpointBcodeCheck  +this.state.bcode );
    this.setState({isbcodeChecked:true});
    var serverInfo = fetch(this.state.scanUrl + endpointBcodeCheck  +this.state.bcode )
      .then((resp) => resp.json())
      .then((respJson) =>{
        console.log("server response to bcode check:");
        console.log(respJson);
        return respJson
      })
      .then((serverResp) => {
        if (Object.keys(serverResp).length==={}) {
          //empty object - server doesn't know what this is
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
        console.log("404 not found from our Scan API")
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

  commercialServerCheck(bcode){
    //checks withs ome commercial food server if it knows this bcode. returns a json with data or empty json if not
    console.log("comm server check:" + this.state.bcodeCheckURL + "/"+ bcode);
    return fetch(this.state.bcodeCheckURL + "/" + bcode).json()

  }



  onSubmit = () =>{
    //package that in a JSON & POST it

    var newIngredient = {"name":this.state.name,  "typeDish": this.state.currentKeyTypeDish, "typeMeal": this.state.currentKeyTypeMeal, "weight":this.state.weight,"quantity":this.state.quantity,"barcode": this.state.bcode};
    console.log("Attempt url:" + this.state.serverUrl + this.state.endpointIngredientCreate);

    fetch(this.state.serverUrl + this.state.endpointIngredientCreate, {
      method: 'POST',
      body: JSON.stringify(newIngredient),
      headers:{
        'Content-type': 'application/json'
      }
    })
      .then((resp) =>resp.json())
      .then((respJson)=>{
        console.log("New ingredient server response:");
        console.log(respJson.toString())
      })
      .catch((error)=>{
        console.log("Don't know what that's about");
        console.log(error)
      });

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