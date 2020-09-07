import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

export default class Authentication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.updateName = this.updateName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  updateName(name) {
    this.setState({ username: name });
  }

  updatePassword(password) {
    this.setState({ password: password });
  }

  render() {
    const { loginAdmin } = this.props;
    const { username, password } = this.state;
    return (
      <View style={styles.container}>
        <TextInput style={styles.inputs} placeholder={'Username'} onChangeText={this.updateName} />
        <TextInput style={styles.inputs} placeholder={'Password'} onChangeText={this.updatePassword} />
        <Button onPress={() => loginAdmin(username, password)} title="Authenticate" />
       </View>
    );
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