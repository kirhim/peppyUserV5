import React, {Component} from 'react';
import { View, TextInput, StyleSheet, Text, Button, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import {store} from '../Mobx/mobxStore'
import { toJS, observable } from 'mobx'

const EmailContainerStyle = ({borderColor, ...rest}) => (
    <View style={{width:295, height: 60,marginTop:40, backgroundColor:'white', borderColor:borderColor, borderWidth:1, borderRadius:4}}>
      <View style={{borderRadius:4, paddingLeft:20,flex:1, backgroundColor:'white', alignItems: 'flex-start',justifyContent: 'center'}}>
        <TextInput
                clearButtonMode='always'
                style={{width:'100%',height:'100%'}}
                placeholder='사용할 이메일 주소를 입력하세요.'
                {...rest}
              />
    </View>
  </View>
)

export default class RegisterEmailScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
  super(props)
  this.state ={
    email:'',
    emailState:''
  }
}

componentWillMount() {
//mobX 스토어에 견적서 오브젝트 리셋
store.memberObject = {};
console.log(toJS(store.memberObject), 'store.memberObject')

this.props.navigation.addListener ('willFocus', () =>{
})

}


makeRemoteRequest = () => {
  fetch('http://peppy.ai/peppy/v1.0/member?filterName=email&searchString=' + this.state.email)
      .then((response) => response.json())
      .then((response) => {
        console.log(response,'response')
        if(response.result == 'ok'){
          this.setState({
            emailState:'error'
          }, ()=> console.log(this.state.emailState, 'emailState'))
        }else{
          this.setState({
            emailState:'confirm'
          }, ()=> console.log(this.state.emailState, 'emailState'))
        }
      })
      .catch((error) => {
        console.error(error)
  })
}




//존재하는 이메일 주소면 에러 메세지를 띄운다
  renderIfUserInfoMatch = () => {
    if(this.state.emailState == "error" && this.state.email != ''){
        return(
          <View>
              <View style={{width:295, height:20, backgroundColor:'transparent', flexDirection:'row',justifyContent:'flex-start', alignItems:'center'}}>
              <Image
                          style={{ paddingTop:2, width:13, height:13 }}
                          source={require('../Components/Assets/error.png')} />
              <Text style={{color:'red', paddingLeft:4}}>이미 존재하는 이메일 입니다.</Text>
              </View>
          </View>
        )
    }else if(this.state.email == ''){
        return(
          <View></View>
        );
    }
}

//사용가능한 이메일이면 파랑색으로 보더를 준다
  renderIfUserInfoAvailable = () => {
      if(this.state.emailState == "confirm"){
        return(
          <View>
              <View style={{width:295, height:20, backgroundColor:'transparent', flexDirection:'row',justifyContent:'flex-start', alignItems:'center'}}>
              <Image
                          style={{ paddingTop:2, width:13, height:13 }}
                          source={require('../Components/Assets/admit.png')} />
              <Text style={{color:'#0091ff', paddingLeft:4}}>사용가능한 이메일 입니다.</Text>
              </View>
          </View>
        )
    }else{
        return(
            <View></View> // OR WHATEVER YOU WANT HERE
        );
    }
}

//존내하는 아이디면 컨테이너 박스를 빨간색으로 하일라이트 해준다
renderContainerBorder = () => {
    if(this.state.emailState == "error" && this.state.email != ''){
        return(
          <View style={{width:295, height: 100, backgroundColor:'transparent',alignItems: 'center',justifyContent: 'flex-start'}}>
            <EmailContainerStyle
                                borderColor='red'
                                onChangeText={email => this.setState({email:email})}
                                />
            {this.renderIfUserInfoMatch()}
          </View>
        );
    }else if(this.state.email == ''){
        return(
          <View style={{width:295, height: 100, backgroundColor:'transparent',alignItems: 'center',justifyContent: 'flex-start'}}>
            <EmailContainerStyle
                                borderColor='transparent'
                                onChangeText={email => this.setState({
                                  email:email,
                                  emailState:''})}
                            />
          </View>
        );
    }else{
      return(
        <View style={{width:295, height: 100, backgroundColor:'transparent',alignItems: 'center',justifyContent: 'flex-start'}}>
          <EmailContainerStyle
                              borderColor='#transparent'
                              onChangeText={email => this.setState({email:email})}
                          />
          {this.renderIfUserInfoAvailable()}
        </View>
      )
    }
}

//Header 뒤로가는 네비게이션
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

//"이메일 가입하기" 텍스트 코드
  topTextContainer(){
    return(
      <View style={{marginTop:54,backgroundColor:'transparent',height:29,width:152, alignItems: 'center',justifyContent: 'center'}}>
        <Text style={{fontSize:20}}>이메일로 가입하기</Text>
      </View>
    )
  }

//이메일 입력하는 컨테이너 코드
  emailContainer(){
    return(
    <View>
      {this.renderContainerBorder()}
    </View>
    )
  }

  updateState(){
    store.memberObject.email = this.state.email
    console.log(this.state.email, 'this.state.email')
    console.log(toJS(store.memberObject), 'memberObject.email')
  }

//다음버튼 코드. 1)존재하는 유저이면 에러메시지 or 2)새로운 유저면 다음화면으로 네비게이션
  nextButton(){
    if(this.state.email != '' && this.state.emailState != 'confirm'){
    return(
      <View>
        <View style={{height:50}}/>
        <TouchableOpacity onPress={()=>{this.updateState(), this.makeRemoteRequest(), this.navigateToNextPage()}}>
          <View style={{borderRadius:4, width:295, height:60, backgroundColor:'#00d4a1',alignItems: 'center',justifyContent: 'center'}}>
              <Text style={{color:'white', fontSize:18}}>확인</Text>
          </View>
      </TouchableOpacity>
      </View>
    )
  }else if(this.state.emailState == 'confirm') {
    return(
      <View>
        <View style={{height:50}}/>
        <TouchableOpacity onPress={()=>{this.navigateToNextPage()}}>
          <View style={{borderRadius:4, width:295, height:60, backgroundColor:'#00d4a1',alignItems: 'center',justifyContent: 'center'}}>
              <Text style={{color:'white', fontSize:18}}>다음</Text>
          </View>
      </TouchableOpacity>
      </View>
    )
  }
  else{
      return(
      <View>

        <View style={{height:50}}/>
        <TouchableOpacity>
          <View style={{borderRadius:4, width:295, height:60, backgroundColor:'#c7cbcc',alignItems: 'center',justifyContent: 'center'}}>
              <Text style={{color:'white', fontSize:18}}>확인</Text>
          </View>
        </TouchableOpacity>
      </View>
      );
  }

}

navigateToNextPage(){
  if(this.state.emailState == 'confirm'){
    this.props.navigation.navigate('NickName')
  }
}

  render() {
    console.log(this.state.email,'email')
  return(
    <SafeAreaView style={{flex:1,backgroundColor:'#fafafa'}}>
        <View style={styles.container}>
        {this.customHeader()}
        {this.topTextContainer()}
        {this.emailContainer()}
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
