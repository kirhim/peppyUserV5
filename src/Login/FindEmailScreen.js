import React, {Component} from 'react';
import { View, TextInput, StyleSheet, Text, Button, SafeAreaView, Image, TouchableOpacity } from 'react-native';

export default class FindEmailScreen extends Component {
  static navigationOptions = {
    header: null
  };

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
      <View style={{marginTop:54,backgroundColor:'transparent',height:29,width:152, alignItems: 'center',justifyContent: 'center'}}>
        <Text style={{fontSize:20}}>이메일 찾기</Text>
      </View>
    )
  }

  findEmailContainer(){
    return(
      <View style={{width:295, height: 60, backgroundColor:'white',marginTop:40}}>
        <View style={{borderRadius:4, marginLeft:20,flex:1, backgroundColor:'white', alignItems: 'flex-start',justifyContent: 'center'}}>
          <TextInput
                  placeholder='가입하신 휴대폰 번호를 입력해주세요.'/>
        </View>
      </View>
    )
  }

  nextButton(){
    return(
    <View>
      <View style={{height:50}}/>
      <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('RegisterPhoneCode')}>
          <View style={{borderRadius:4, width:295, height:60, backgroundColor:'#c7cbcc',alignItems: 'center',justifyContent: 'center'}}>
              <Text style={{color:'white', fontSize:18}}>인증번호 발송</Text>
          </View>
      </TouchableOpacity>
    </View>
    )
  }

  render() {
  return(
    <SafeAreaView style={{flex:1,backgroundColor:'#fafafa'}}>
        <View style={styles.container}>
        {this.customHeader()}
        {this.topTextContainer()}
        {this.findEmailContainer()}
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
