import React, {Component} from 'react';
import { View, TextInput, StyleSheet, Text,Alert, Button, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import {store} from '../Mobx/mobxStore'
import { toJS, observable } from 'mobx'
export default class RegisterPhoneCodeScreen extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
  super(props)
  this.state ={
    phoneCode:'',
    code:''
  }
}

  componentDidMount() {
    this.setState({
      phoneCode:123,
      code:123
    }, ()=> {
      console.log(this.state.code, 'code')
      console.log(this.state.phoneCode, 'phoneCode')
  })

    this.props.navigation.addListener ('willFocus', () =>{
      this.requestPhoneCode()
  })
}

requestPhoneCode(){

  fetch('https://peppy.ai/peppy/v1.0/auth/sendSMS', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    phone: 123,
  }), // data can be `string` or {object}!
}).then(response => response.json())
    .then((response) => {
      console.log('Success:', JSON.stringify(response))
      store.phoneCode = 123
      this.setState({
        code:123
      }, console.log(this.state.code, 'state.code'))
      console.log(store.phoneCode,'phoneCode')
    })
    .catch((error) => {
      console.error('Errors:', (error))
    })
  }

  callState = () => {
    store.phoneCode
    console.log(store.phoneCode, 'show phoneCode')
    this.setState({
      code:store.phoneCode
    }, ()=> console.log(this.state.code, 'code'))

  }

  customHeader(){
    return(
      <View style={{width:'100%',backgroundColor:'transparent',alignItems: 'flex-start',marginTop:15}}>
        <TouchableOpacity
                onPress={() => this.props.navigation.goBack()} hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}>
          <View style={{marginLeft:18}}>
            <Image
                      style={{width:10, height:18 }}
                      source={require('../Components/Assets/backArrow.png')} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  //존재하는 이메일 주소면 에러 메세지를 띄운다
    renderIfUserInfoMatch = () => {
      if(this.state.code == this.state.phoneCode && this.state.code != '' && this.state.phoneCode != '' ){
          return(
            <View>
                <View style={{marginTop:8, width:295, height:20, backgroundColor:'transparent', flexDirection:'row',justifyContent:'flex-start', alignItems:'center'}}>
                <Image
                            style={{ paddingTop:2, width:13, height:13 }}
                            source={require('../Components/Assets/group.png')} />
                <Text style={{color:'#0091ff', paddingLeft:4}}>인증번호가 일치합니다.</Text>
                </View>
            </View>
          )
      }else if(this.state.code != this.state.phoneCode && this.state.phoneCode != ''){
          return(

            <View>
                <View style={{marginTop:8, width:295, height:20, backgroundColor:'transparent', flexDirection:'row',justifyContent:'flex-start', alignItems:'center'}}>
                <Image
                            style={{ paddingTop:2, width:13, height:13 }}
                            source={require('../Components/Assets/error.png')} />
                <Text style={{color:'red', paddingLeft:4}}>인증번호가 일치하지 않습니다.</Text>
                </View>
            </View>
          );
      }else if(this.state.phoneCode == ''){
        return(
          <View>
              <View style={{width:295, height:20, backgroundColor:'transparent', flexDirection:'row',justifyContent:'flex-start', alignItems:'center'}}>

              </View>
          </View>
        )
      }
  }

  topTextContainer(){
    return(
      <View style={{marginTop:54,backgroundColor:'transparent',height:29,width:152, alignItems: 'center',justifyContent: 'center'}}>
        <Text style={{fontSize:20}}>인증번호 입력</Text>
      </View>
    )
  }

  phoneCodeContainer(){
    return(
      <View>
      <View style={{width:295, height: 60, backgroundColor:'white',marginTop:40}}>
        <View style={{borderRadius:4, marginLeft:20,flex:1, backgroundColor:'white', alignItems: 'flex-start',justifyContent: 'center'}}>
          <TextInput
            onChangeText={phoneCode => this.setState({
                        phoneCode:phoneCode,
                        })}
            placeholder='전송된 인증번호를 입력해주세요.'/>
        </View>
      </View>
      {this.renderIfUserInfoMatch()}
      </View>
    )
  }

  nextButton(){
    if(this.state.phoneCode == this.state.code){
    return(
    <View>
      <View style={{height:50}}/>
      <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('Agree')}>
          <View style={{borderRadius:4, width:295, height:60, backgroundColor:'#00d4a1',alignItems: 'center',justifyContent: 'center'}}>
              <Text style={{color:'white', fontSize:18}}>다음</Text>
          </View>
      </TouchableOpacity>
    </View>
    )
  }else{
    return(
      <View>
        <View style={{height:50}}/>
        <TouchableOpacity onPress={()=> {this.renderIfUserInfoMatch()} }>
            <View style={{borderRadius:4, width:295, height:60, backgroundColor:'#00d4a1',alignItems: 'center',justifyContent: 'center'}}>
                <Text style={{color:'white', fontSize:18}}>다음</Text>
            </View>
        </TouchableOpacity>
      </View>
    )
   }
  }


  confirmCode(){
    if(store.phoneCode != '')
    return(
      <Text style={{paddingTop:30}}>인증번호 : {this.state.code}</Text>
    )
    else{
      return(
        null
      )
    }
  }

  render() {
  return(
    <SafeAreaView style={{flex:1,backgroundColor:'#fafafa'}}>
        <View style={styles.container}>
        {this.customHeader()}
        {this.topTextContainer()}
        {this.phoneCodeContainer()}
        {this.confirmCode()}
        {this.nextButton()}
        </View>
      </SafeAreaView>
    )
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  }
});
