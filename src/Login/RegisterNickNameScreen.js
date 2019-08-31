import React, {Component} from 'react'
import { View, TextInput, StyleSheet, Text, Button, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import {store} from '../Mobx/mobxStore'
import { toJS, observable } from 'mobx'

//Email 컨테이너 코드 활용. 같은 코드 그러나 다른 borderColor
const EmailContainerStyle = ({borderColor, ...rest}) => (
  <View style={{height:100,width:295,backgroundColor:'transparent'}}>
    <View style={{width:295, height: 60, backgroundColor:'white',marginTop:40,borderColor:borderColor, borderWidth:1}}>
      <View style={{borderRadius:4, marginLeft:20,flex:1, backgroundColor:'white', alignItems: 'flex-start',justifyContent: 'center'}}>
        <TextInput
                clearButtonMode='always'
                style={{width:'100%',height:'100%'}}
                placeholder='사용할 닉네임을 6자내로 입력하세요.'
                {...rest}/>
        </View>
      </View>
    </View>
)
//BUTTON 컨테이너 코드 활용. 같은 코드 그러나 다른 backgroundColor
const ButtonContainerStyle = ({backgroundColor, text, ...rest}) => (
  <View>
  <View style={{height:50}}/>
  <TouchableOpacity
                  {...rest}>
      <View style={{borderRadius:4, width:295, height:60, backgroundColor:backgroundColor ,alignItems: 'center',justifyContent: 'center'}}>
          <Text style={{color:'white', fontSize:18}}>{text}</Text>
      </View>
  </TouchableOpacity>
  </View>
)

export default class RegisterNickNameScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
  super(props)
  this.state ={
    name:'',
    nameState:''
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

  makeRemoteRequest = () => {
    fetch('http://peppy.ai/peppy/v1.0/member?filterName=name&searchString=' + this.state.name)
        .then((response) => response.json())
        .then((response) => {
          console.log(response,'response')
          if(response.result == 'ok'){
            this.setState({
              nameState:'error'
            }, ()=> console.log(this.state.nameState, 'nameState'))
          }else{
            this.setState({
              nameState:'confirm'
            }, ()=> console.log(this.state.nameState, 'nameState'))
          }
        })
        .catch((error) => {
          console.error(error)
    })
  }

  //존재하는 닉네임이면 에러 메세지를 띄운다
  renderIfUserInfoMatch = () => {
    if(this.state.nameState == "error" && this.state.name != ''){
        return(
          <View>
              <View style={{width:295, height:20, backgroundColor:'white', flexDirection:'row',justifyContent:'flex-start', alignItems:'center'}}>
                <Image
                            style={{ paddingTop:2, width:13, height:13 }}
                          source={require('../Components/Assets/error.png')} />
                <Text style={{color:'red', paddingLeft:4}}>이미 존재하는 닉네임 입니다.</Text>
              </View>
          </View>
        );
    }else{
        return(
            <View></View> // OR WHATEVER YOU WANT HERE
        );
    }
}

//사용가능한 닉네임이면 파랑색으로 보더를 준다
  renderIfUserInfoAvailable = () => {
    if(this.state.nameState == "confirm"){
        return(
          <View>
              <View style={{width:295, height:20, backgroundColor:'transparent', flexDirection:'row',justifyContent:'flex-start', alignItems:'center'}}>
              <Image
                          style={{ paddingTop:2, width:13, height:13 }}
                          source={require('../Components/Assets/admit.png')} />
              <Text style={{color:'#0091ff', paddingLeft:4}}>사용가능한 닉네임 입니다.</Text>
              </View>
          </View>
        )
    }else{
        return(
            <View></View> // OR WHATEVER YOU WANT HERE
        );
    }
}

//존내하는 닉네임이 컨테이너 박스를 빨간색으로 하일라이트 해준다
renderContainerBorder = () => {
  if(this.state.nameState == "error" && this.state.name != ''){
        return(
          <View style={{width:295, height: 100, backgroundColor:'transparent',alignItems: 'center',justifyContent: 'flex-start'}}>
              <EmailContainerStyle
                borderColor='red'
                onChangeText={name => this.setState({name:name})}
                />
                {this.renderIfUserInfoMatch()}
          </View>
        );
    }else if(this.state.name == ''){
        return(
          <View style={{width:295, height: 100, backgroundColor:'transparent',alignItems: 'center',justifyContent: 'flex-start'}}>
          <EmailContainerStyle
            borderColor='transparent'
            onChangeText={name => this.setState({
              nameState:'',
              name:name})}
            />
          </View>
        );
    }
    else{
      return(
        <View style={{width:295, height: 100, backgroundColor:'transparent',alignItems: 'center',justifyContent: 'flex-start'}}>
            <EmailContainerStyle
              borderColor='transparent'
              onChangeText={name => this.setState({name:name})}
              />
              {this.renderIfUserInfoAvailable()}
        </View>
      )
    }
}
//"닉네임" 텍스트 코드
  topTextContainer(){
    return(
      <View style={{marginTop:54,backgroundColor:'transparent',height:29,width:152, alignItems: 'center',justifyContent: 'center'}}>
        <Text style={{fontSize:20}}>닉네임</Text>
      </View>
    )
  }
//닉네임 입력하는 컨테이너 코드
  nickNameContainer(){
    return(
      <View>
      {this.renderContainerBorder()}
      </View>
    )
  }

  updateState(){
    store.memberObject.name = this.state.name
    console.log(this.state.name, 'this.state.name')
    console.log(toJS(store.memberObject.name), 'memberObject.name')
  }

  //다음버튼 코드. 1)존재하는 닉네임이면 에러메시지 or 2)새로운 유저면 다음화면으로 네비게이션
  nextButton(){
    if(this.state.name != '' && this.state.nameState != 'confirm'){
    return(
      <View>
        <ButtonContainerStyle
                            backgroundColor='#00d4a1'
                            onPress={()=>{this.updateState(), this.makeRemoteRequest(), this.navigateToNextPage()}}
                            text='확인'
                            />
      </View>
          )
    }else if(this.state.nameState == 'confirm') {
      return(
        <View>
          <ButtonContainerStyle
                              onPress={()=>this.navigateToNextPage()}
                              backgroundColor='#00d4a1'
                              text='다음'
                              />
        </View>
      )
    }
    else{
      return(
        <View>
          <ButtonContainerStyle
                              text='확인'
                              backgroundColor='#c7cbcc'
                              />
        </View>
      )
  }
}

navigateToNextPage(){
  if(this.state.nameState == 'confirm'){
    this.props.navigation.navigate('Password')
  }
}

  render() {


  return(
    <SafeAreaView style={{flex:1,backgroundColor:'#fafafa'}}>
        <View style={styles.container}>
        {this.customHeader()}
        {this.topTextContainer()}
        {this.nickNameContainer()}
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
