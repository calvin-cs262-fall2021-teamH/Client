import React from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';


const styles = StyleSheet.create ({

});


export default class InteractionButton extends React.Component {

  state = {
    fadeValue: new Animated.Value(0)
  };

  _start = () => {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 1000
    }).start();
  };

    render() {
        return(
            <Animated.View
            style={{
              opacity: this.state.fadeValue,
              height: 250,
              width: 200,
              margin: 5,
              borderRadius: 12,
            }}>

            <TouchableOpacity style={[{ bottom: 0, position: 'absolute', alignItems: 'center' }, globalStyles.noInteractionButton ]}>
            </TouchableOpacity>
            </Animated.View>
        )
    }

}