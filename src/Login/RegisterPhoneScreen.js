import React, {Component} from 'react';
import {Alert, View, TextInput, StyleSheet, Text, Button, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import {store} from '../Mobx/mobxStore'
import { toJS, observable } from 'mobx'
//import RNKakaoLogins from 'react-native-kakao-logins';
import { AsyncTrunk } from 'mobx-sync'
import { AsyncStorage } from "react-native"

const trunk = new AsyncTrunk(store, {
  storage: AsyncStorage,
  storageKey: '__persist_mobx_stores__',
});

export default class RegisterPhoneScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
  super(props)
  this.state ={
    phone:''
  }
}

componentWillMount() {
  console.log(toJS(store.memberObject), 'store.memberObject')
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

  topTextContainer(){
    return(
      <View style={{marginTop:54,backgroundColor:'transparent',height:29,width:152, alignItems: 'center',justifyContent: 'center'}}>
        <Text style={{fontSize:20}}>휴대폰 인증</Text>
      </View>
    )
  }

  phoneCodeContainer(){
    return(
      <View style={{width:295, height: 60, backgroundColor:'white',marginTop:40}}>
        <View style={{borderRadius:4, marginLeft:20,flex:1, backgroundColor:'white', alignItems: 'flex-start',justifyContent: 'center'}}>
          <TextInput
                  style={{width:'100%'}}
                  onChangeText={phone => this.setState({phone:phone})}
                  placeholder='"-"없이 휴대폰 번호를 입력하세요.'/>
        </View>
      </View>
    )
  }

  updateState(){
    store.memberObject.phone = this.state.phone
    console.log(this.state.phone, 'this.state.phone')
    console.log(toJS(store.memberObject.phone), 'memberObject.phone')
  }

  nextButton = () => {
    if(this.state.phone != ''){
    return(
    <View>
      <View style={{height:50}}/>
      <TouchableOpacity
                        onPress={()=>{this.updateState(),this.props.navigation.navigate('RegisterPhoneCode')}}>
          <View style={{borderRadius:4, width:295, height:60, backgroundColor:'#00d4a1',alignItems: 'center',justifyContent: 'center'}}>
              <Text style={{color:'white', fontSize:18}}>인증번호 발송</Text>
          </View>
      </TouchableOpacity>
    </View>
    )
  }else{
    return(
    <View>
      <View style={{height:50}}/>
      <TouchableOpacity>
          <View style={{borderRadius:4, width:295, height:60, backgroundColor:'#c7cbcc',alignItems: 'center',justifyContent: 'center'}}>
              <Text style={{color:'white', fontSize:18}}>인증번호 발송</Text>
          </View>
      </TouchableOpacity>
    </View>
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
