/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import nodejs from 'nodejs-mobile-react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      server1:'',
      server2:'',
    }
  }
  componentWillMount()
  {
    that = this
    nodejs.start('main.js');
    // Server 1 status
    nodejs.channel.addListener(
      'server1',
      (msg) => {
        that.setState({server1:msg});
      },
      this 
    );
    nodejs.channel.addListener(
      'server2',
      (msg) => {
        that.setState({server2:msg});
      },
      this 
    );
  }
  
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
          <Text style={styles.instructions}>{instructions}</Text>
          <Text style={styles.instructions}>Server 1 : {this.state.server1}</Text>
          <Text style={styles.instructions}>Server 2 : {this.state.server2}</Text>
          <Button style={styles.btn} title="Event trigger { Check in log cat }"
            onPress={() => nodejs.channel.post('myEvent','This message form frontend and show in the logcat {event msg}')}
          />
          <Button style={styles.btn} title="Message Node { Check in log cat } "
            onPress={() => nodejs.channel.send('A message! from front end but only { msg }')}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
