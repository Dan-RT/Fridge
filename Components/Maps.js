// Components/Maps.js

import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import MapView, {Marker, Callout} from 'react-native-maps'
import openMap from 'react-native-open-maps'
import { getSupermarket } from '../API/PlacesAPI'

class Maps extends React.Component {
  constructor(props) {
    super(props);

    this.supermarkets = []
    this.state = {
      userPosition: {
        latitude: 48.8583701,
        longitude: 2.2922926,
        latitudeDelta: 0.0622,
        longitudeDelta: 0.0421,
      },
      error: null,
    };
  }

  componentDidMount() {
    console.log("TEST componentDidMount");
    //this._getLocation(() => this._getNearSupermarket());
    this._getLocation(this._getNearSupermarket);
  }

  _getLocation(callback){
    console.log("GET LOCATION");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userPosition: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221,
          },
          error: null,
        });
        console.log("LOCATION LATITUDE : " + this.state.userPosition.latitude + "\n LOCATION LONGITUDE : " + this.state.userPosition.longitude);
        callback(this.state.userPosition.latitude, this.state.userPosition.longitude);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000 },
    )
  }

  _getNearSupermarket (lat, long) {
    console.log("_getNearSupermarket");
    //getSupermarket(this.state.userPosition.latitude, this.state.userPosition.longitude, 5000, "supermarket").then(data => {
    getSupermarket(lat, long, 5000, "supermarket").then(data => {
      const arrayMarkers = []
      data.results.map((element, i) => {
        arrayMarkers.push(
          <Marker
            key={i}
            coordinate={{
                latitude: element.geometry.location.lat,
                longitude: element.geometry.location.lng
            }}
            >
              <Callout onPress={e => this._openMapsApp(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude)}>
                <View>
                  <Text>{element.name}</Text>
                  <Text>Open now: {element.opening_hours.open_now ? "Yes" : "No"}</Text>
                </View>
              </Callout>
            </Marker>
        )
      })
      this.supermarkets = arrayMarkers
      //console.log("SUPERMARKETS :"+ this.supermarkets[1].coordinate.latitude)
    })
  }

  _openMapsApp(lat,long){
    console.log("OPEN MAPS : " + lat + " " + long);
    openMap({ latitude: lat, longitude: long });
  }

  render() {
     //this._getLocation()
     //this._getNearSupermarket();
    console.log("\n RENDER POSITION ERROR \n" + this.state.error);
    return (
      <View style={styles.main_container}>
          <MapView
            region={this.state.userPosition}
            style={styles.map}
            toolbarEnabled={true}
          >
            <Marker coordinate={this.state.userPosition} pinColor={"yellow"}/>
            {this.supermarkets}

          </MapView>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%"
  }
})

export default Maps
