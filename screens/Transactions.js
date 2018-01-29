import React from 'react';
import { StyleSheet, Dimensions, View, FlatList, Text, Image } from 'react-native';

export default class Transactions extends React.Component {
	constructor(props) {
		super(props)
		this.state = {data: transactionsData}
	}

	render() {
		return (
			<View style={styles.container}>
				<Image style={styles.bgImage} source={ui.img.bg}/>

				<View style={styles.navBar}>
					<View style={styles.statusBar}/>
					<View style={styles.navItem}>
						<Text style={styles.navTitle}>Transaktioner</Text>
					</View>
				</View>
				<View style={styles.navSeparator}/>

				<FlatList
					data={this.state.data}
					renderItem = {({item}) => 
						<View style={styles.itemContainerStyle}>
							<Text style={styles.label}>{"※  " + item.name}</Text>
							<Text style={styles.label}>{"※  " + item.destination}</Text>
							<Text style={styles.label}>{"※  " + item.author}</Text>
							<View style={styles.horizontalStack}>
								<Text style={{color: 'white'}}>{item.price}</Text>
								<Text style={{color: 'white'}}>{item.status}</Text>
								<Text style={{color: 'white'}}>{item.date}</Text>
							</View>
						</View>
					}/>

			</View>
		);
	}
}

const ui = {
	img: {
		bg: require("ModuleInt/resource/img/bg.png")
	}
}

const styles = StyleSheet.create({
	container: {flex: 1},

	navBar: {height: 63, backgroundColor: 'transparent'},

	statusBar: {height: 20},

	navItem: {height: 43},

	navTitle: {color: 'white', padding: 10, fontFamily: 'Helvetica', fontWeight: '400', letterSpacing: 2, fontSize: 21, textAlign: 'center'},

	navSeparator: {height: 0.5, backgroundColor: 'black'},

	bgImage: {
  		top: 0, left: 0, width: Dimensions.get('screen').width, height: Dimensions.get('screen').height,
  		position: 'absolute',
  		resizeMode: 'cover',
  		backgroundColor: '#f76b1c'
  	},

  	itemContainerStyle: {
  		flex: 1, margin: 8, padding: 8, 
  		backgroundColor: '#dddddd40', borderRadius: 6, 
  		borderWidth: 0.5, borderColor: "#00000060", overflow: 'hidden'
  	},

  	label: {margin: 4, color: 'white'},

  	horizontalStack: {flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 12}
})

const transactionsData = [
	{
		key: "1",
		name: "Urgent Delivery #236",
		destination: "6 Rue du Fouarre 75005 Paris France",
		author: "Government",
		price: "438.50 kr",
		status: "Overföring",
		date: "2018-01-22"
	},

	{
		key: "2",
		name: "Package Delivery ASAP #421",
		destination: "51 Rue Saint-Didier 75116 Paris France",
		author: "Private order",
		price: "131.50 kr",
		status: "Overföring",
		date: "2018-01-21"
	},

	{
		key: "3",
		name: "Package Delivery Middle Priority #15",
		destination: "151 Boulevard Hausmann 75008 Paris France",
		author: "B2B Delivery Service",
		price: "125.65 kr",
		status: "Overföring",
		date: "2018-01-21"
	},

	{
		key: "4",
		name: "Package Delivery Request",
		destination: "6 Rue du Fouarre 75005 Paris France",
		author: "Government",
		price: "295.00 kr",
		status: "Overföring",
		date: "2018-01-20"
	},

	{
		key: "5",
		name: "Delivery Request #145098",
		destination: "151 Boulevard Hausmann 75008 Paris France",
		author: "B2B Delivery Service",
		price: "56.20 kr",
		status: "Overföring",
		date: "2018-01-20"
	},

	{
		key: "6",
		name: "Low Priority Package Delivery Request",
		destination: "6 Rue du Fouarre 75005 Paris France",
		author: "Government",
		price: "226.50 kr",
		status: "Overföring",
		date: "2018-01-19"
	}
]