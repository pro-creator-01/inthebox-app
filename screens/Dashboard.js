import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

export default class Dashboard extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View>
                <Text> Dashboard </Text>
                <Button onPress={() => navigation.navigate('NewCampaign')} title={'Create a Campaign'} />
            </View>
        )
    }
}

const styles = StyleSheet.create({})
