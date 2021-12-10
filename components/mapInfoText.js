import React from 'react';
import {View, Text, StyleSheet } from 'react-native';


const styles = StyleSheet.create ({

});


export default class MapInfoText extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
          showText: 'hidden',
          message: 'No location near by!',
        };
      }

    showText() {
        this.setState({showText:'visible'});
    }


    render() {
        if (this.state.showText == 'visible') {
            return(
                <Text>this works!</Text>
            )
        }
        return null;
    }

}