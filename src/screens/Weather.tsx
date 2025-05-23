import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Weather = () => {
    return (
        <SafeAreaView>
            <View style={styles.weatherContainer}>
                <View style={styles.headerContainer}>
                    <MaterialCommunityIcons size={48} name="weather-sunny" color={'#fff'} />
                    <Text style={styles.tempText}>Temperature˚</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <Text style={styles.title}>So Sunny</Text>
                    <Text style={styles.subtitle}>It hurts my eyes!</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    weatherContainer: {
        flex: 1,
        backgroundColor: '#0f00ff'
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tempText: {
        fontSize: 48,
        color: '#f7b733'
    },
    bodyContainer: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        marginBottom: 40
    },
    title: {
        fontSize: 48,
        color: '#f7b733'
    },
    subtitle: {
        fontSize: 24,
        color: '#f7b733'
    }
});

export default Weather;