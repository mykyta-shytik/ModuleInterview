import React from 'react';
import { View, StatusBar } from 'react-native';
import Button from 'react-native-button';
import Auth from 'ModuleInt/screens/Auth.js'
import Transactions from 'ModuleInt/screens/Transactions.js'

export default class App extends React.Component {

	constructor(props) {
		super(props)
		this.authView = (<Auth />);
		this.transactionsView = (<Transactions />)
		this.state = {token: ""}

		this.authView.onAuth = (receivedToken) => { this.setState(token: receivedToken) }
	}

	render() {

		console.log(this.state.token)
		console.log("lol")
		return (
			<View style={{flex: 1}}>
				<StatusBar barStyle='light-content'/>
				{ 
					(this.state.token.length > 0) ? this.transactionsView : this.authView
			 	}
			</View>
		);
	}
}