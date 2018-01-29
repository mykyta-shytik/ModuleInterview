import React from 'react';
import { StyleSheet, Dimensions, View, FlatList, Text, Image } from 'react-native';

export default class Transactions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {data: transactionsData}
    this.onLogOut = (text) => { console.log("Transactions.onLogOut default callback") }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <View style={styles.statusBar}/>
          <View style={styles.navItem}>
            <Text style={styles.navTitle}>Transaktioner</Text>
          </View>
        </View>

        <View style={styles.navSeparator}/>

        <FlatList data={this.state.data}
                  renderItem = {({item}) => 
                    <View style={styles.itemContainerStyle}>
                      <Text style={styles.labelBold}>{"※  " + item.name}</Text>
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
  layout: {
    contentInset: {top: 16, left: 0, right: 0, bottom: 0}
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},

  navBar: {height: 63, backgroundColor: 'transparent'},

  statusBar: {height: 20},

  navItem: {height: 43},

  navTitle: {
    padding: 10, 
    color: 'white', 
    fontFamily: 'Helvetica', fontWeight: '500', fontSize: 19, letterSpacing: 1, textAlign: 'center'
  },

  navSeparator: {height: 1, backgroundColor: '#00000099'},

  itemContainerStyle: {
    flex: 1, margin: 8, padding: 8,
    backgroundColor: '#dddddd40', borderRadius: 6,
    borderWidth: 0.5, borderColor: "#00000099", overflow: 'hidden'
  },

  labelBold: {fontFamily: 'Helvetica', fontSize: 15, fontWeight: '500', margin: 4, color: 'white'},

  label: {fontFamily: 'Helvetica', fontSize: 13, fontWeight: '400', margin: 4, color: 'white'},

  horizontalStack: {margin: 8, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}
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
    price: "335.50 kr",
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
    price: "212.50 kr",
    status: "Overföring",
    date: "2018-01-19"
  }
]