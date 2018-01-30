import React from 'react';
import { StyleSheet, Dimensions, View, ScrollView, Text, Image, TextInput, ActivityIndicator } from 'react-native';
import Button from 'react-native-button';

// Auth component

export default class Auth extends React.Component {

  // Init

  constructor(props) {
    super(props)
    this.state = {email: ui.text.empty, password: ui.text.empty, isPerformingRequest: false}
    this.props.onAuth = (text) => { console.log(ui.text.defaultOnAuthMessage) }
  }

  // Lifecycle

  render() {
    const canPressLogin = this.isLoginAvailable()
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={this.headerContainerStyle()}>
            <Image style={styles.hexImage} source={ui.img.hex}/>
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
                       keyboardType='email-address'
                       blurOnSubmit={false}
                       onSubmitEditing={(event) => this.refs.passwordTextInput.focus()}
                       onChangeText={(text) => this.setState({email: text})}/>
          </View>
          <View style={styles.separator}/>
          <View style={styles.horizontalStack} width={ui.layout.contentW}>
            <TextInput style={styles.inputTitle}
                       placeholder={ui.text.passwordTitle}
                       placeholderTextColor={ui.color.inputTitle}
                       editable={false}/>
            <TextInput style={styles.textInput}
                       ref={ui.refs.passwordTextInput}
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
                    onPressOut={() => this.onSignInPress()}>{ui.text.loginButton}</Button>
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

          <View style={styles.signUpOuterContainer}>
            <View style={styles.signUpInnerContainer}>
              <Text style={styles.helperLabel}>{ui.text.signUp0}</Text>
              <Text style={styles.helperLabel}>{ui.text.signUp1}</Text>
              <Text style={styles.helperLabel2}>{ui.text.signUp2}</Text>
            </View>
          </View>
          {this.state.isPerformingRequest ? this.activityIndicator() : <View />}
        </ScrollView>
      </View>
    );
  }

  // Actions (networking)

  onSignInPress() {
    this.showIndicator()
    setTimeout(() => {this.fetch()}, ui.time.requestDelay)
  }

  fetch() {
    fetch('https://sejfqa.stage3.develit.se/api/v1/auth/login', this.authRequestData())
    .then((response) => response.json())
    .then((responseJson) => {this.hideIndicator(); this.props.onAuth(responseJson.meta.apiToken)})
    .catch((error) => {this.hideIndicator(); console.log(error)})
  }

  authRequestData() {
    return {
      method: "POST",
      headers: {Accept: "application/json", "Content-Type": "application/json"},
      body: JSON.stringify({
        "email": this.state.email, 
        "password": this.state.password, 
        "deviceToken": "ReYNvvfvFFFJAiKb5VIa93etvpgALyuiPf3hb675Zyzbjim1wrgjunwM2aJawTtE"
      })
    }
  }

  // Activity indicator

  showIndicator() { this.setState({isPerformingRequest: true}) }
  hideIndicator() { this.setState({isPerformingRequest: false}) }
  activityIndicator() { return (<View style={styles.indicatorContainer}><ActivityIndicator size='large' color='white' /></View>) }

  // State helpers

  inputError() {
    var result = ""
    const email = this.state.email
    const password = this.state.password
    if ((email.length > 0) && !ui.reg.email.test(email)) { result+="Email has incorrect format. " }
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
    const x = ui.layout
    return x.titleSpacing
           + (2 * (2 * x.inputM + x.inputH)) + x.separatorH + x.inputSpacing + 2 * (x.buttonH + x.helperSpacing)
           + x.helperH + x.signUpSpacing + 2 * (x.helperH + x.bottomSpacing)
  }
}

// UI config

const ui = {
  refs: {
    passwordTextInput: "passwordTextInput"
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
    signUp0: "                      ",
    signUp1: "Inte medlem än?",
    signUp2: "Skapa konto",

    defaultOnAuthMessage: "Auth.onAuth default callback",
    empty: ""
  },

  img: {
    hex: require("ModuleInt/resource/img/hex.png")
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

  time: {
    requestDelay: 1000
  },

  layout: {
    sideM: 16,
    contentW: (Dimensions.get('screen').width - 2 * this.sideM),
    hexY: -20,
    indicatorS: 80,
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
    bottomSpacing: 20
  }
}

// Styles config

const styles = StyleSheet.create({
  
  // Containers

  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},

  scroll: {width: Dimensions.get('screen').width - 32, overflow: 'visible', flex: 1},

  // Images

  bgImage: {
    top: 0, left: 0, width: Dimensions.get('screen').width, height: Dimensions.get('screen').height,
    position: 'absolute', resizeMode: 'cover'
  },

  hexImage: {
    top: ui.layout.hexY, left: Dimensions.get('screen').width - 160, width: 250, height: 250,
    position: 'absolute', resizeMode: 'contain',
    opacity: 0.8
  },

  // Loading indicator

  indicatorContainer: {
    top: (Dimensions.get('screen').height - ui.layout.indicatorS) / 2,
    left: (Dimensions.get('screen').width - ui.layout.indicatorS) / 2,
    width: ui.layout.indicatorS, height: ui.layout.indicatorS,
    position: 'absolute',
    backgroundColor: '#ffffff44', 
    borderRadius: 8, borderColor: '#f76b1c', borderWidth: 0.5, overflow: 'hidden',
    flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
  },

  // Scroll view elements

  header: {
    height: ui.layout.titleH,
    color: 'white',
    fontFamily: 'Helvetica', fontWeight: '300', fontSize: 27, letterSpacing: 4, textAlign: 'center'
  },

  horizontalStack: {
    height: ui.layout.inputH, margin: ui.layout.inputM,
    flex: 1, flexDirection: 'row', justifyContent: 'space-between'
  },

  inputTitle: {
    height: ui.layout.inputH,
    color: 'white',
    fontFamily: 'Helvetica', fontWeight: '400', fontSize: 17, textAlign: 'left'
  },

  textInput: {
    width: 200, height: ui.layout.inputH,
    color: 'white',
    fontFamily: 'Helvetica', fontWeight: '400', fontSize: 17, textAlign: 'right'
  },

  separator: {height: ui.layout.separatorH, backgroundColor: "#ffffff45"},

  bgButtonContainer: {height: ui.layout.buttonH, borderRadius: 6, backgroundColor: '#ffffff55'},

  buttonBox: {padding: 13, height: 45, alignItems: 'center'},

  buttonText: {fontSize: 13, color: ui.color.buttonText, textAlign: 'center', height: 45},

  buttonTextDisabled: {fontSize: 13, color: '#ffffff80', textAlign: 'center', height: 45},

  helperLabel: {
    height: ui.layout.helperH,
    color: "white",
    fontFamily: 'Helvetica', fontSize: 13, textAlign: 'center'
  },

  helperLabel2: {
    height: ui.layout.helperH,
    color: "#ffffff80",
    fontFamily: 'Helvetica', fontSize: 13, textAlign: 'center'
  },

  signUpOuterContainer: {height: ui.layout.helperH, flex: 1, alignItems: 'center', justifyContent: 'center'},

  signUpInnerContainer: {height: ui.layout.helperH, width: 290, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}
});