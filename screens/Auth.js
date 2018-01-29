import React from 'react';
import { StyleSheet, Dimensions, View, Text, Image, TextInput, ScrollView } from 'react-native';
import Button from 'react-native-button';

export default class Auth extends React.Component {

  // Props

  onAuth = (text) => { console.log("what is love?") }

  // Init
  constructor(props) {
    super(props)
    this.state = {email: "", password: ""}
  }

  // Lifecycle

  render() {
    const canPressLogin = this.isLoginAvailable()

    return (
      <View style={styles.container}>
        <Image style={styles.bgImage} source={ui.img.bg}/>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

          <View style={this.headerContainerStyle()}>
            <Image style={styles.plainShape} source={ui.img.hex}/>
            <View style={this.titlePushViewStyle()}/>
            <Text style={styles.header}>{ui.text.title}</Text>
          </View>

      		{this.separator(ui.layout.titleSpacing)}

      		<View style={styles.horizontalStack} width={ui.layout.contentW}>
      			<TextInput style={styles.inputTitle} 
      					   placeholder={ui.text.emailTitle} 
      					   placeholderTextColor={ui.color.inputTitle} 
      					   editable={false}/>
      			<TextInput style={styles.textInput} 
      					   placeholder={ui.text.emailPlaceholder} 
      					   placeholderTextColor={ui.color.placeholder}
      					   autoCorrect={false}
      					   autoCapitalize='none'
      					   onChangeText={(text) => this.setState({email: text})}/>
      		</View>

      		<View style={styles.separator}/>

      		<View style={styles.horizontalStack} width={ui.layout.contentW}>
      			<TextInput style={styles.inputTitle} 
      					   placeholder={ui.text.passwordTitle} 
      					   placeholderTextColor={ui.color.inputTitle} 
      					   editable={false}/>
      			<TextInput style={styles.textInput} 
      					   placeholder={ui.text.passwordPlaceholder} 
      					   placeholderTextColor={ui.color.placeholder} 
      					   secureTextEntry={true}
      					   autoCorrect={false}
      					   autoCapitalize='none'
      					   onChangeText={(text) => this.setState({password: text})}/>
      		</View>

      		{this.separator(ui.layout.inputSpacing)}

      		<View style={styles.bgButtonContainer}>
      			<Button containerStyle={styles.buttonBox} 
      					style={canPressLogin ? styles.buttonText : styles.buttonTextDisabled} 
      					disabledStyle={styles.buttonTextDisabled}
      					disabled={!canPressLogin}
                onPress={this.onSignInPress()}>{ui.text.loginButton}</Button>
      		</View>

      		{this.separator(ui.layout.helperSpacing)}
      		<Text style={styles.helperLabel}>{ui.text.orLabel}</Text>
      		{this.separator(ui.layout.helperSpacing)}

      		<View style={styles.bgButtonContainer}>
      			<Button containerStyle={styles.buttonBox} 
      					style={styles.buttonText} 
      					disabledStyle={styles.buttonTextDisabled}>{ui.text.bankIdButton}</Button>
      		</View>

      		{this.separator(ui.layout.signUpSpacing)}
      		<Text style={styles.helperLabel}>{ui.text.signUp}</Text>

      	</ScrollView>
      </View>
    );
  }

  // Actions

  onSignInPress() {
    // TODO: API Connect
    this.onAuth("placeholder_token")
  }

  // State helpers

  inputError() {
  	var result = ""
  	const email = this.state.email
  	const password = this.state.password

  	if ((email.length > 0) && (ui.reg.email.test(email) == false)) { result+="Email has incorrect format. " }
  	if ((password.length > 0) && (password.length < 5)) { result+="Password entered is too short." }

  	return result
  }

  isLoginAvailable() {
  	const email = this.state.email
  	const password = this.state.password
  	return ((email.length > 0) && ui.reg.email.test(email) && (password.length > 5))
  }

  // Layout helpers

  separator(height) { return <View style={{width:ui.layout.contentW, height:height}}/> }

  headerContainerStyle() { return {width:ui.layout.contentW, height:this.titlePosition() + ui.layout.titleH} }

  titlePosition() { return Dimensions.get("screen").height - this.contentH() }

  titlePushViewStyle() { return {width:ui.layout.contentW, height:this.titlePosition()} }

  contentH() {
  	l = ui.layout
  	return l.titleSpacing 
  		   + (2 * (2 * l.inputM + l.inputH)) + l.separatorH + l.inputSpacing 
  		   + 2 * (l.buttonH + l.helperSpacing) + l.helperH
  		   + l.signUpSpacing + 2 * (l.helperH + l.bottomSpacing)
  }
}


// UI constants

const ui = {
	img: {
		hex: require("ModuleInt/resource/img/hex.png"),
		bg: require("ModuleInt/resource/img/bg.png")
	},

	text: {
		title: "Välkommen",
		emailTitle: "E-post",
		emailPlaceholder: "john@gmail.com",
		passwordTitle: "Lösenord",
		passwordPlaceholder: "* * * * * * * *",
		loginButton: "Logga in",
		orLabel: "Eller",
		bankIdButton: "BankID",
		signUp: "Inte medlem än? Skapa konto"
	},

	reg: {
		email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	},

	color: {
		inputTitle: "#ffffffbb",
		placeholder: "#ffffff80",
		buttonBg: "ffffff44",
		buttonText: "white"
	},

	layout: {
		sideM: 16,
		contentW: (Dimensions.get('screen').width - 2 * this.sideM),

		hexY: -20,

		titleH: 35,
		titleSpacing: 90,
		inputH: 20,
		inputM: 8,
		separatorH: 0.5,
		inputSpacing: 30,
		buttonH: 45,
		helperSpacing: 25,
		helperH: 13,
		signUpSpacing: 50,
		bottomSpacing: 20,
	}
}

// Styles

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f76b1c'},

  bgImage: {
  	top: 0, left: 0, width: Dimensions.get('screen').width, height: Dimensions.get('screen').height,
  	position: 'absolute',
  	resizeMode: 'cover'
  },

  plainShape: { 
  	top: ui.layout.hexY, left: Dimensions.get('screen').width - 160, width: 250, height: 250, 
  	position: 'absolute', 
  	resizeMode: 'contain', 
  	opacity: 0.8
  },

  scroll: {width: Dimensions.get('screen').width - 32, overflow: 'visible', flex: 1},

  header: {
  	height: ui.layout.titleH,
  	color: 'white',
  	fontFamily: 'Helvetica',
  	fontWeight: '300',
  	fontSize: 27,
  	letterSpacing: 4,
  	textAlign: 'center'
  },

  textInput: {
  	textAlign: 'right',
  	color: 'white',
  	fontFamily: 'Helvetica',
  	fontWeight: '300',
  	fontSize: 17,
  	height: ui.layout.inputH,
  	width: 150
  },

  horizontalStack: {
  	flex: 1,
  	flexDirection: 'row',
  	justifyContent: 'space-between',
  	margin: ui.layout.inputM,
  	height: ui.layout.inputH
  },

  separator: {height: ui.layout.separatorH, backgroundColor: "#ffffff45"},

  inputTitle: {
  	color: 'white',
  	fontFamily: 'Helvetica',
  	fontWeight: '300',
  	fontSize: 17,
  	textAlign: 'left',
  	height: ui.layout.inputH
  },

  bgButtonContainer: {height: ui.layout.buttonH, borderRadius: 6, backgroundColor: '#ffffff55'},

  buttonBox: {padding: 13, height:45, alignItems: 'center'},

  buttonText: {fontSize:13, color:ui.color.buttonText, textAlign:'center', height:45},

  buttonTextDisabled: {fontSize:13, color: '#ffffff80', textAlign:'center', height:45},

  helperLabel: {
  	height: ui.layout.helperH,
  	color: "white",
  	fontFamily: 'Helvetica',
  	fontSize: 13,
  	textAlign: 'center'
  }

});