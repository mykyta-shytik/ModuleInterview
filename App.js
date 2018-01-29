import React from 'react';
import { StyleSheet, Dimensions, View, StatusBar, Image } from 'react-native';

import Button from 'react-native-button';

import Auth from 'ModuleInt/screens/Auth.js'
import Transactions from 'ModuleInt/screens/Transactions.js'

export default class App extends React.Component {

  // Init

  constructor(props) {
    super(props)
    this.state = {token: ""}
    this.authView = (<Auth onAuth={(receivedToken) => {this.setState({token: receivedToken})} }/>)
    this.transactionsView = (<Transactions onLogOut={() => {this.setState({token: ""})} } />)
  }

  // Lifecycle

  render() {
    return (<View style={{flex: 1}}>
      <StatusBar barStyle='light-content'/>
      <Image style={styles.bgImg} source={ui.img.bg}/>
      {(this.state.token.length > 0) ? this.transactionsView : this.authView}
    </View>);
  }
}

const ui = {
  img: {
    bg: require("ModuleInt/resource/img/bg.png")
  }
}

const styles = StyleSheet.create({
  bgImg: {
    top: 0, left: 0, width: Dimensions.get('screen').width, height: Dimensions.get('screen').height,
    position: 'absolute',
    backgroundColor: '#f76b1cff'
  }
})