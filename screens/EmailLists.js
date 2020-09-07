import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

export default class EmailLists extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View>
                <Text> Email Lists </Text>
                <Button title={'Create a new list'} onPress={() => navigation.navigate('NewList')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({})
