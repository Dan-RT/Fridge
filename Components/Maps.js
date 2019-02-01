// Components/Maps.js

import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import MapView, {Marker, Callout} from 'react-native-maps'
import openMap from 'react-native-open-maps'
import { getSupermarket } from '../API/PlacesAPI'

class Maps extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userPosition: {
        latitude: 48.8583701,
        longitude: 2.2922926,
        latitudeDelta: 0.0622,
        longitudeDelta: 0.0421,
      },
      error: null,
      supermarkets: [],
    };
  }

  componentDidMount() {
    this._getLocation(this._getNearSupermarket);
  }

  _getLocation(callback){
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
        callback(position.coords.latitude, position.coords.longitude, this);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000 },
    )
  }

  _getNearSupermarket (lat, long, self) {
    getSupermarket(lat, long, 5000, "supermarket").then((data) => {
      const arrayMarkers = [];
      data.results.map((element, i) => {
        let openInfo = null;
        if (element.opening_hours != undefined) {
          openInfo = element.opening_hours.open_now ? "Yes" : "No";
        } else {
          openInfo = "No information";
        }
        arrayMarkers.push(
          <Marker
            title={element.name}
            key={i}
            coordinate={{
                latitude: element.geometry.location.lat,
                longitude: element.geometry.location.lng
            }}
            >
              <Callout onPress={e => self._openMapsApp(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude)}>
                <View>
                  <Text>{element.name}</Text>
                  <Text>Open now: {openInfo}</Text>
                </View>
              </Callout>
            </Marker>
        )
      });
      self.setState({
        supermarkets: arrayMarkers
      });
    }).catch((error) => console.error("SUPERMARKETS ERROR" + error))
  }

  _openMapsApp(lat,long){
    console.log("OPEN MAPS : " + lat + " " + long);
    openMap({ latitude: lat, longitude: long});
  }

  render() {
    return (
      <View style={styles.main_container}>
          <MapView
            region={this.state.userPosition}
            style={styles.map}
            toolbarEnabled={true}
          >
            <Marker coordinate={this.state.userPosition} pinColor={"yellow"}/>
            {this.state.supermarkets}
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
