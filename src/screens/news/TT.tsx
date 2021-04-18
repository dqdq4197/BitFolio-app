//This is an example code to understand TextInput//
import React from 'react';
//import react in our code.

import { TextInput, View, StyleSheet, Text } from 'react-native';

export default class TT extends React.Component<{}, { username: string }> {
  constructor(props:any) {
    super(props);
    this.state = {
      username: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
      
        <Text style={{ color: 'black', marginBottom: 20 }}>{'Werid behaviour, (check username\nreceived from  onChangeText  callback,\nwhile runing on android device)'}</Text>
        <Text style={{ color: 'red', marginBottom: 20 }}>{'Hint it doubles up, when using toLocaleUpperCase like interceptions'}</Text>
        <Text style={{ color: 'cyan',  marginBottom: 20 }}>{this.state.username}</Text>
        <TextInput
          value={this.state.username}
          onChangeText={(username) =>{
            if(!/[0-9]/.test(username))
              this.setState({ username: username.toLocaleUpperCase() })}
          }
          placeholder={'Username'}
          style={styles.input}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    textAlign: "center",
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ecf0f1',
  },
});
