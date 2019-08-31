import React, {Component} from 'react';
import { View, TextInput, StyleSheet, Text, Button, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import {store} from '../Mobx/mobxStore'
import { toJS, observable } from 'mobx'

export default class RegisterPasswordScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
  super(props)
  this.state ={
    password:'',
    passwordConfirm:'',
    finalPassword:''
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

  //존재하는 닉네임이면 에러 메세지를 띄운다
  renderIfUserInfoMatch = () => {
    if(this.state.password != this.state.passwordConfirm){
        return(

          <View>

              <View style={{width:295, height: 20, backgroundColor:'transparent', flexDirection:'row',justifyContent:'flex-start', alignItems:'center'}}>
              <Image
                          style={{ paddingTop:2, width:13, height:13 }}
                          source={require('../Components/Assets/group2.png')} />
              <Text style={{color:'red', paddingLeft:4}}>비밀번호가 일치하지 않습니다.</Text>
              </View>
          </View>
        );
    }else{
        return(
            <View></View> // OR WHATEVER YOU WANT HERE
        );
    }
}

//존재하는 닉네임이면 에러 메세지를 띄운다
renderIfUserInfoAvailable = () => {
  if(this.state.password == this.state.passwordConfirm){
      return(

        <View>
            <View style={{width:295, height: 20, backgroundColor:'transparent', flexDirection:'row',justifyContent:'flex-start', alignItems:'center'}}>
            <Image
                        style={{ paddingTop:2, width:13, height:13 }}
                        source={require('../Components/Assets/group.png')} />
            <Text style={{color:'#00a2f5', paddingLeft:4}}>비밀번호가 일치 합니다.</Text>
            </View>
        </View>
      );
  }else{
      return(
          <View></View> // OR WHATEVER YOU WANT HERE
      );
  }
}



passwordContiner(){
  return(
  <View>
    <View style={styles.typeIdContainerStyle}>
      <View style={styles.typeIdPasswordContainerStyleSub}>
        <TextInput
                  style={{width:'100%',height:'100%'}}
                  placeholder='사용할 비밀번호를 입력하세요.'
                  onChangeText={password => this.setState({password:password})}
                  clearButtonMode='always'
                  secureTextEntry/>
      </View>
    </View>

    <View style={styles.typePasswordCointainerStyle}>
      <View style={styles.typeIdPasswordContainerStyleSub}>
        <TextInput
                  style={{width:'100%',height:'100%'}}
                  onChangeText={passwordConfirm => this.setState({passwordConfirm:passwordConfirm})}
                  placeholder='비밀번호를 한번 더 입력하세요.'
                  clearButtonMode='always'
                  secureTextEntry/>
      </View>
    </View>
  </View>
  )
}

//존내하는 닉네임이 컨테이너 박스를 빨간색으로 하일라이트 해준다
renderContainerBorder = () => {
  if(this.state.password != '' && this.state.passwordConfirm != '' && this.state.password != this.state.passwordConfirm ){
        return(
          <View>
          <View style={{width:315, height: 122, backgroundColor:'white',marginTop:40, justifyContent:'center', alignItems:'center',borderColor:'red',borderWidth:1}}>
          {this.passwordContiner()}
          </View>
          {this.renderIfUserInfoMatch()}
        </View>
        );
    }else if(this.state.password == '' && this.state.passwordConfirm == ''){
        return(
        <View>
          <View style={{width:315, height: 122, backgroundColor:'white',marginTop:40, borderRadius:4, justifyContent:'center', alignItems:'center',borderColor:'transparent',borderWidth:1}}>
          {this.passwordContiner()}
          </View>
        </View>
        );
    }else if (this.state.password != '' && this.state.passwordConfirm != '' && this.state.password == this.state.passwordConfirm) {
      return(
      <View>
        <View style={{width:315, height: 122, backgroundColor:'white',marginTop:40, justifyContent:'center', alignItems:'center',borderColor:'#0091ff',borderWidth:1}}>
          {this.passwordContiner()}
        </View>
        {this.renderIfUserInfoAvailable()}
      </View>
    )
    } else{
      return(
      <View>
        <View style={{width:315, height: 122, backgroundColor:'white',marginTop:40, justifyContent:'center', alignItems:'center'}}>
        {this.passwordContiner()}
        </View>
      </View>
      )
    }
}

  topTextContainer(){
    return(
      <View style={{marginTop:54,backgroundColor:'transparent',height:29,width:152, alignItems: 'center',justifyContent: 'center'}}>
        <Text style={{fontSize:20}}>비밀번호 설정</Text>
      </View>
    )
  }

  userInfoBox(){
    return(
      <View>
        {this.renderContainerBorder()}
      </View>
    )
  }

  updateState(){
    store.memberObject.password = this.state.passwordConfirm
    this.setState({finalPassword:this.state.passwordConfirm}, ()=> console.log(this.state.finalPassword,'finalPassword'))

    console.log(this.state.finalPassword, 'this.state.finalPassword')
    console.log(toJS(store.memberObject.password), 'memberObject.password')
  }

  nextButton(){
    if(this.state.password == this.state.passwordConfirm && this.state.password != ''){
    return(
      <View>
        <View style={{height:50}}/>
      <TouchableOpacity
                        onPress={()=>{this.updateState(),this.props.navigation.navigate('VerifyPhone')}}>
          <View style={{borderRadius:4, width:295, height:60, backgroundColor:'#00d4a1', alignItems: 'center',justifyContent: 'center'}}>
              <Text style={{color:'white', fontSize:18}}>다음</Text>
          </View>
      </TouchableOpacity>
      </View>
      )
    }else{
      return(
        <View>
          <View style={{height:50}}/>
        <TouchableOpacity>
            <View style={{borderRadius:4, width:295, height:60, backgroundColor:'#c7cbcc', alignItems: 'center',justifyContent: 'center'}}>
                <Text style={{color:'white', fontSize:18}}>다음</Text>
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
        {this.userInfoBox()}
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
  },
  typeIdPasswordContainerStyle:{
    width:295,
    height:120,
    marginTop:40,
    borderRadius:4,
    backgroundColor:'white',
  },
  typeIdPasswordContainerStyleSub:{
    width:'100%',height:'100%',alignItems: 'flex-start',justifyContent: 'center'
  },
  typeIdContainerStyle:{
    backgroundColor:'white',width:'100%',height:'50%',  borderColor:'#c7c7cc',
    height:60, width:256,
    borderBottomWidth:0.2,
    paddingLeft:20,
    marginRight:20},
    loginTextStyle:{
    fontSize:16,
    color:'white',
  },
  typePasswordCointainerStyle:{
    paddingLeft:20,
    backgroundColor:'white',
    height:60, width:256,
    marginRight:20
  },
});
