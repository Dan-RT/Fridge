// Components/Maps.js

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class Maps extends React.Component {
  render() {

    return (
      <View style={styles.main_container}>
        <Text>Page Maps</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  }
})

export default Maps
