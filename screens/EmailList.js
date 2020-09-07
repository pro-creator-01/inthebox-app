import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Modal, Button, TextInput } from 'react-native'
import axios from 'axios'
import { FontAwesome } from '@expo/vector-icons'

export default class EmailList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emails: [],
            name: '',
            modalVisible: false,
            additionalEmail: ''
        };

        this.updateEmail = this.updateEmail.bind(this);
        this.addEmail = this.addEmail.bind(this);
    }
    
    async componentDidMount() {
        const { id, name } = this.props.route.params;
        try {
            const res = await axios.get(`https://inthebox-server.herokuapp.com/api/list/${id}`);
            res.data.emails.map(email => {
                this.setState({ emails: [...this.state.emails, email], name });
            })
        } catch (e) {
            console.log(e);
        }
    }

    async addEmail() {
        const { id } = this.props.route.params;
        try {
            const res = await axios.post(`https://inthebox-server.herokuapp.com/api/list/${id}`, {
                email: this.state.additionalEmail
            });
            this.setState({ emails: [...this.state.emails, this.state.additionalEmail] });
            this.closeModal();
        } catch (e) {
            console.log(e);
        }
    }

    openModal() {
        this.setState({modalVisible:true});
    }
    
    closeModal() {
        this.setState({modalVisible:false});
    }

    updateEmail(email) {
        this.setState({ additionalEmail: email });
    }

    async deleteEmail(email) {
        const { id } = this.props.route.params;
        const { emails } = this.state;
        try {
            await axios.delete(`https://inthebox-server.herokuapp.com/api/list/${id}/${email}`);
            const newValues = emails.filter(value => value !== email);
            this.setState({ emails: newValues });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{marginVertical: 20, alignSelf: 'center', fontSize: 24}}> {this.state.name} </Text>
                {this.state.emails.map(email => (
                    <View key={email} style={styles.entry} >
                        <Text>{email}</Text>
                        <TouchableOpacity onPress={() => this.deleteEmail(email)}>
                            <FontAwesome name="trash" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity style={styles.addBtn} onPress={() => this.openModal()}>
                    <FontAwesome name="plus" size={24} color="#A9A9A9" />
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}
                >
                    <TouchableOpacity style={styles.modalContainer} onPress={() => this.closeModal()}>
                    <View style={styles.innerContainer}>
                        <View style={{alignItems:'center', backgroundColor: 'purple', width: '100%', justifyContent: 'center', height: 50, borderBottomColor: 'black', borderBottomWidth: 1}}><Text style={{color: 'white'}}>Add another Email</Text></View>
                        <TextInput placeholder={'Email'} autoFocus={true} onChangeText={this.updateEmail} style={styles.inputs} />
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Button
                                onPress={() => this.addEmail()}
                                style={{marginBottom: 10}}
                                title="Add Email"
                            ></Button>
                        </View>
                    </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue'
    },
    entry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
        height: 60,
        paddingLeft: 20,
        marginHorizontal: 10,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
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
    },
    addBtn: {
        height: 60,
        marginHorizontal: 10,
        justifyContent: 'center',        
        borderStyle: "dashed",
        borderColor: '#A9A9A9',
        borderWidth: 2,
        alignItems: 'center',
        borderRadius: 1
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        width: 350,
        height: 250,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputs: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingHorizontal: 15,
        margin: 10,
        width: 300,
        marginBottom: 25
    }
})
