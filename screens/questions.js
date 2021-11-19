/**
 * Screen that contains questions about the user's current location.
 *
 * @author: Brian Langejans, David Reidsma, David Heynen, Paul Dick, Kurt Wietelmann
 * 11/16/2021
 */

import React, { useState } from 'react';
import { Image, Button, View, Text, TouchableOpacity, FlatList, ImageBackground, TextInput } from 'react-native';
import { globalStyles } from '../styles/global';

export default function QuestionScreen({ route, navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8C2032' }}>
            <Text style={{ fontSize: 30, color: "#fff", padding: 20 }}>{ route.params.name }</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            />
            <Text style={ globalStyles.Question }>{ route.params.description }</Text>
        </View>
    );
}