import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Button } from 'react-native'
import axios from 'axios'

export default class AddList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          title: '',
          emails: '',
          mailList: []
        };
    
        this.updateTitle = this.updateTitle.bind(this);
        this.updateEmails = this.updateEmails.bind(this);
        this.AddNewList = this.AddNewList.bind(this);
      }
    
      updateTitle(title) {
        this.setState({ title });
      }
    
      updateEmails(emails) {        
        this.setState({ emails });
      }

      AddNewList() {
          const { emails, title } = this.state;
          const list = emails.split(',').map(email => email.trim());
          axios.post('')
          console.log(list);
      }

    render() {
        return (
            <View style={styles.container}>
                <Text> Add a New Mailing List </Text>
                <TextInput style={styles.inputs} placeholder={'Title'} onChangeText={this.updateTitle} />
                <TextInput style={styles.inputs} placeholder={'Emails'} onChangeText={this.updateEmails} />
                <Button title={'Add List'} onPress={this.AddNewList} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 70
    },
    inputs: {
      borderBottomWidth: 1,
      height: 50,
      marginBottom: 50
    }
  });
