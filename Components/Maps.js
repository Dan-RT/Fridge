// Components/Maps.js

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MapView from 'react-native-maps'
import { getSupermarket } from '../API/PlacesAPI'

class Maps extends React.Component {
    constructor(props) {
    super(props);

    this.supermarkets = []
    this.state = {
      userPosition: {
        latitude: 0,                        //Check life cycle of Component
        longitude: 0,
        latitudeDelta: 0.0622,
        longitudeDelta: 0.0421,
      },
      error: null,
    };
  }

  _getLocation(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userPosition: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0421,
          },
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  _getNearSupermarket () {
    getSupermarket(this.state.userPosition.latitude, this.state.userPosition.longitude, 70000, "supermarket").then(data => {
      data.results.map((element, i) => {
        const arrayMarkers = []
        arrayMarkers.push(
          <MapView.Marker                                         //Change style to make a difference between user and supermarkets
            key={i}
            coordinate={{
                latitude: element.geometry.location.lat,
                longitude: element.geometry.location.lng
            }}
          />
        )
        this.supermarkets = arrayMarkers
      })
    })
  }

  render() {
    this._getLocation()
    this._getNearSupermarket()
    return (

      <View style={styles.main_container}>
          <MapView
            region={this.state.userPosition}
            style={styles.map}
          >
            <MapView.Marker coordinate={this.state.userPosition} />
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
