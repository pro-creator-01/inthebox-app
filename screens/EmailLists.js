import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { FontAwesome } from '@expo/vector-icons'

function getRandomColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

export default class EmailLists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: []
        }
    }

    async componentDidMount() {
        try {
            const res = await axios.get('https://inthebox-server.herokuapp.com/api/lists');
            res.data.map(list => {
                this.setState({ lists: [...this.state.lists, list] })
            });            
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        const { lists } = this.state;
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                
                {lists.map(list => (
                    <TouchableOpacity key={list._id} onPress={() => navigation.navigate('Emails', {
                        id: list._id,
                        name: list.title
                    })} >
                    <View style={{height: 150,
                        width: 350,
                        paddingTop: 40,
                        paddingLeft: 40,
                        borderRadius: 15,
                        marginTop: -20,
                        shadowColor: '#000000',
                        shadowOpacity: 10,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.50,
                        shadowRadius: 3.84,
                        elevation: 5,
                        backgroundColor: getRandomColor()  }}>
                        <Text style={{color: 'black', fontSize: 24, marginBottom: 10}}>{list.title}</Text>
                        <Text>Number of Emails: 0</Text>
                    </View>
                    </TouchableOpacity>
                ))}
                <View style={styles.floatingAction}>                    
                    <TouchableOpacity onPress={() => navigation.navigate('NewList')}>
                        <FontAwesome name="plus" size={34} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center'
    },
    card: {
             
    },
    floatingAction: {
        backgroundColor: 'red',
        color: 'white',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 100,
        position: 'absolute',
        bottom: 30,
        right: 10
    }
})
