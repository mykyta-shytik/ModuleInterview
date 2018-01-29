import React from 'react';
import { View, StatusBar } from 'react-native';
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
      {(this.state.token.length > 0) ? this.transactionsView : this.authView}
    </View>);
  }
}