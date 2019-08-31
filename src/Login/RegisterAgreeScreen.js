import React, {Component} from 'react';
import { View, TextInput, StyleSheet, Text, Button, SafeAreaView, Image, TouchableOpacity,ScrollView } from 'react-native';
import {store} from '../Mobx/mobxStore'
import { toJS, observable } from 'mobx'
import { AsyncStorage } from "react-native"

const imageOn = require('../Components/Assets/iconCheck.png')
const imageOff = require('../Components/Assets/iconEmptyCheck.png')


import { AsyncTrunk } from 'mobx-sync'

const trunk = new AsyncTrunk(store, {
  storage: AsyncStorage,
  storageKey: '__persist_mobx_stores__',
});

export default class RegisterAgreeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props)
    this.state = {
    check:'',
    nextButton:''
    }
  }

  componentWillMount() {
    console.log(toJS(store.memberObject), 'store.memberObject')
  }


  customHeader(){
    return(
      <View style={{width:'100%',backgroundColor:'transparent',alignItems: 'flex-start',marginTop:15}}>
        <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}>
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
      <View style={{marginTop:0,backgroundColor:'transparent',height:29,width:152, alignItems: 'center',justifyContent: 'center'}}>
        <Text style={{fontSize:20}}>회원약관 및 마케팅 동의</Text>
      </View>
    )
  }

  agreeContainer(){
    return(
      <View style={{width:310, height: 374, backgroundColor:'white',marginTop:40, borderRadius:4,}}>
        <View style={{width:267, height: 332, borderRadius:4, margin:20,flex:1, backgroundColor:'white'}}>
          <ScrollView>
            <Text>모든 국민은 행위시의 법률에 의하여 범죄를 구성하지 아니하는 행위로 소추되지 아니하며, 동일한 범죄에 대하여 거듭 처벌받지 아니한다. 헌법개정안은 국회가 의결한 후 30일 이내에 국민투표에 붙여 국회의원선거권자 과반수의 투표와 투표자 과반수의 찬성을 얻어야 한다.
                  국토와 자원은 국가의 보호를 받으며, 국가는 그 균형있는 개발과 이용을 위하여 필요한 계획을 수립한다. 모든 국민은 그 보호하는 자녀에게 적어도 초등교육과 법률이 정하는 교육을 받게 할 의무를 진다. 국회는 국민의 보통·평등·직접·비밀선거에 의하여 선출된 국회의원으로 구성한다. 헌법재판소 재판관은 정당에 가입하거나 정치에 관여할 수 없다. 국회는 국정을 감사하거나 특정한 국정사안에 대하여 조사할 수 있으며, 이에 필요한 서류의 제출 또는 증인의 출석과 증언이나 의견의 진술을 요구할 수 있다.
                  국가는 법률이 정하는 바에 의하여 재외국민을 보호할 의무를 진다. 국가는 대외무역을 육성하며, 이를 규제·조정할 수 있다. 대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.
                  재판관은 정당에 가입하거나 정치에 관여할 수 없다. 국회는 국정을 감사하거나 특정한 국정사안에 대하여 조사할 수 있으며, 이에 필요한 서류의 제출 또는 증인의 출석과 증언이나 의견의 진술을 요구할 수 있다.
            </Text>
          </ScrollView>
        </View>
      </View>
    )
  }

  agreeCheckContainer(){

    var imgSource = this.state.check? imageOn : imageOff;

    return(
      <TouchableOpacity
                        onPress={()=>this.setState({check:!this.state.check,
                                                    nextButton:!this.state.check})}>
        <View style={{marginTop:14, height:20,width:310,backgroundColor:'transparent',alignItems: 'center',justifyContent: 'flex-start',flexDirection:'row'}}>
          <View style={{marginLeft:7, width:20,height:20,backgroundColor:'white',borderRadius:10,alignItems: 'center',justifyContent: 'center'}}>
            <Image
                    style={{width:12.4, height:9.5 }}
                    source={imgSource} />
          </View>

          <Text style={{marginLeft:8}}>위 이용약관에 동의합니다</Text>
        </View>
      </TouchableOpacity>

    )
  }

  postApi(){
    fetch('https://peppy.ai/peppy/v1.0/member', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(store.memberObject), // data can be `string` or {object}!
  }).then(res => res.json())
      .then((response) => {
        console.log('Success:', JSON.stringify(response))

        store.memberObject = response.data[0]
        console.log(response.data[0],'response')
        console.log(toJS(store.memberObject),'memberObject')

        trunk.updateStore(store)
          .then(() => {
            //1-1-4. 저장 완료 후 메인 화면으로 이동한다.
            alert('회원가입이 완료 되었습니다 :)')
            console.log(store,'store')
            this.props.navigation.navigate('ButtomTab');
          });
      })
      .catch((error) => {
        console.error('Errors:', (error))
      })

  }


  nextButton(){
    if(this.state.nextButton == true){
      return(
        <View>
        <View style={{height:20}}></View>

        <TouchableOpacity
                          onPress={()=>this.postApi()}>

            <View style={{borderRadius:4, width:295, height:60, backgroundColor:'#00d4a1',marginTop:0,alignItems: 'center',justifyContent: 'center'}}>
                <Text style={{color:'white', fontSize:18}}>다음</Text>
            </View>
        </TouchableOpacity>
        </View>
      )
    }else{
        return(
          <View>
          <View style={{height:20}}></View>
          <TouchableOpacity>
            <View style={{borderRadius:4, width:295, height:60, backgroundColor:'#c7cbcc',alignItems: 'center',justifyContent: 'center'}}>
                <Text style={{color:'white', fontSize:18}}>다음</Text>
            </View>
          </TouchableOpacity>
        </View>
        );
    }

  }

  render() {
  return(
    <SafeAreaView style={{flex:1,backgroundColor:'#fafafa'}}>
          <View style={styles.container}>

          {this.customHeader()}
          {this.topTextContainer()}
          {this.agreeContainer()}
          {this.agreeCheckContainer()}
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
