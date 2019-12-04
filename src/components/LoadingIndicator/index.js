import React from 'react';
import { ActivityIndicator, StyleSheet, View, StatusBar, Image } from 'react-native';

export default () => (
    <View style={styles.container}>
        <StatusBar backgroundColor="#36404a" barStyle="light-content" />
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
});