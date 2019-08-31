import React, {Component} from 'react';
import { View, TextInput, StyleSheet, Keyboard,  TouchableOpacity,Text, Image,Button,SafeAreaView,Alert } from 'react-native';
import {store} from '../Mobx/mobxStore'
import { AsyncTrunk } from 'mobx-sync'
import { AsyncStorage } from "react-native"
//import RNKakaoLogins from 'react-native-kakao-logins';

import { toJS, observable } from 'mobx';

var config = require('../Config/app_config.json');

const trunk = new AsyncTrunk(store, {
  storage: AsyncStorage,
  storageKey: '__persist_mobx_stores__',
})

export default class LoginScreen extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props)
    this.state ={
      isFocused: true,
      email:'',
      password:'',
      text:'',
      password:'',
      passwordConfirm:'',
      isKakaoLogging: false,
      token: 'token has not fetched',
    }
  }

  componentWillMount() {
    trunk.init().then(() => {
      // do any staff with loaded store
      if (store.memberObject.idx != undefined) {
        //alert('자동 로그인 합니다.');
        this.props.navigation.navigate('HospitalMain');
      }
    })
  }


//   // 카카오 로그인 시작.
// kakaoLogin() {
//   console.log('   kakaoLogin   ')
//   RNKakaoLogins.login((err, result) => {
//     if (err) {
//       console.log(err.toString())
//
//       return
//     }
//     else if (result){
//     RNKakaoLogins.getProfile((err, result) => {
//       if (err) {
//         console.log(err.toString())
//         return
//       }
//       // Alert.alert('result id', result.id)
//        console.log(result, 'profile result')
//        console.log(result, 'profile result')
//       this.getMemberInfoFromServer(result.id, result.nickname, result.profile_image_path, result.email)
//
//     })
//   }
//   })
// }
//
// kakaoLogout() {
//   console.log('   kakaoLogout   ');
//    RNKakaoLogins.logout((err: string, result: string) => {
//      if (err) {
//        console.log(err.toString(), 'dddd');
//        console.log(result,'result')
//        return;
//      }
//      Alert.alert('result', result);
//    });
// }
//
// // 로그인 후 내 프로필 가져오기.
// getProfile() {
//   console.log('getKakaoProfile');
//   RNKakaoLogins.getProfile((err, result) => {
//     if (err) {
//       console.log(err.toString());
//       return;
//     }
//     Alert.alert('result id', result.id);
//   });
// }
//
// getMemberInfoFromServer(userid, name, image, email) {
//   console.log('getMemberInfoFromServer')
//   const url = 'https://peppy.ai/peppy/v1.0/auth/login';
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       kakaoToken: userid,
//       name:name,
//       profileImageUrl:image
//     }),
//   })
//     .then((response) => {
//       return response.json();
//       console.log('Success:', response)
//     })
//     .then((responseJson) => {
//       if (responseJson.result === "nouser") {
//         console.log(responseJson, 'responseJson')
//         //1-2. 만약 토큰이 서버DB에 존재하지 않는다면, 신규 회원이므로, 신규회원 가입 절차를 진행한다.
//         //1-2-1. 페이스북 토큰을 store에 저장한다.
//         store.memberObject = {};
//         store.memberObject.kakaoToken = userid
//         store.memberObject.name = name
//         store.memberObject.profileImageUrl = image
//         store.memberObject.email = email
//         console.log(toJS(store.memberObject), 'store.memberObject')
//
//         //1-2-2. 저장 후 신규 회원 가입 화면으로 이동한다.
//       this.props.navigation.navigate('VerifyPhone');
//       }
//       //존재하는 회원이면 메인페이지로 이동
//       else {
//         console.log(responseJson,'responseJson show this')
//
//           fetch('http://peppy.ai/peppy/v1.0/member?filterName=kakaoToken&searchString=' + userid)
//               .then((response) => response.json())
//               .then((response) => {
//                 console.log(response.data,'response')
//                 const list = response.data
//                 store.kakaoIdx = response.data[0].idx
//                 console.log(response.data[0],'response[0].idx')
//                   store.memberObject = {}
//                   store.memberObject.kakaoToken = userid
//                   store.memberObject.name = name
//                   store.memberObject.profileImageUrl = image
//                   store.memberObject.email = email
//                   store.memberObject.idx = response.data[0].idx
//                   console.log(toJS(store.memberObject), 'store.memberObject')
//                   trunk.updateStore(store)
//                     .then(() => {
//                       console.log('working?')
//                       //1-1-4. 저장 완료 후 메인 화면으로 이동한다.
//                       this.props.navigation.navigate('ButtomTab');
//                     });
//               })
//               .catch((error) => {
//                 console.error(error)
//           })
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

  loginWithEmailAndPassword() {
    //Keyboard.dismiss();
    console.log("test");
    console.log(store.memberObject);
    const url = config.api_server_url + 'auth/login';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
    })
      .then((response) => {

        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);

        if (responseJson.result === "nouser") {
          //이메일이 없음.
          store.memberObject = null;
          alert('등록되지 않은 이메일 입니다.');
        }
        else if (responseJson.result === "wrong password") {
          //이메일이 없음.
          store.memberObject = null;
          alert('비밀번호를 확인해 주세요.');
        }
        else {
          //console.log(responseJson);
          //1-1-2. 가져온 회원 정보를 store에 저장한다
          //store에 responseJson.data 저장할것.
          store.memberObject = responseJson.data[0];
          //푸시 토큰 업데이트
          //store.memberObject.pushToken = store.memberDevToken;
          //store.memberObject.os = store.memberOS;
          //1-1-3. store값을 trunk에 저장한다.
          trunk.updateStore(store)
            .then(() => {
              this.props.navigation.navigate('ButtomTab')
            });
          //Keyboard.dismiss();
        }
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
    //this.props.screenProps.setEmail(this.state.email);
    //this.props.navigation.navigate('Sub')
  }

  onFacebookLogin(error, result) {
      if (error) {
        console.log("login has error: " + result.error);
      } else if (result.isCancelled) {
        console.log("login is cancelled.");
      } else {
        AccessToken.getCurrentAccessToken().then(
          (data) => {
            console.log('facebook login success!')
            console.log('facebook userid is:', data)

            //1. 받아온 페이스북 토큰이 서버DB의 멤버테이블에 이미 있는지 확인해서 있으면 가져오고 스토어 및 트렁크에 저장.
            this.getMemberInfoFromServer(data.userID);
          }
        )
        //this.props.navigation.navigate('PhoneCode')
      }
    }


  renderIfUserInfoMatch = () => {
    if(this.state.password != this.state.passwordConfirm){
        return(

          <View>

              <View style={{width:295, height: 20, backgroundColor:'transparent', flexDirection:'row',justifyContent:'flex-start', alignItems:'center'}}>
              <Image
                          style={{ paddingTop:2, width:13, height:13 }}
                          source={require('../Components/Assets/group2.png')} />
              <Text style={{color:'red', paddingLeft:4}}>회원정보가 일치하지 않습니다..</Text>
              </View>
          </View>
        );
    }else{
        return(
            <View></View> // OR WHATEVER YOU WANT HERE
        );
    }
}

//정확한 유저정보면 확인메시지
renderIfUserInfoAvailable = () => {
  if(this.state.password == this.state.passwordConfirm){
      return(

        <View>

            <View style={{width:295, height: 20, backgroundColor:'transparent', flexDirection:'row',justifyContent:'flex-start', alignItems:'center'}}>
            <Image
                        style={{ paddingTop:2, width:13, height:13 }}
                        source={require('../Components/Assets/group.png')} />
            <Text style={{color:'#00a2f5', paddingLeft:4}}>로그인 가능합니다.</Text>
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
                  style={{width:'100%'}}
                  placeholder='이메일 주소'
                  onChangeText={email => this.setState({email:email})}
                  clearButtonMode='always'
                  />
      </View>
    </View>

    <View style={styles.typePasswordCointainerStyle}>
      <View style={styles.typeIdPasswordContainerStyleSub}>
        <TextInput
                  style={{width:'100%'}}
                  onChangeText={password => this.setState({password:password})}
                  placeholder='비밀번호.'
                  clearButtonMode='always'
                  secureTextEntry/>
      </View>
    </View>
  </View>
  )
}

renderContainerBorder = () => {
  if(this.state.password != '' && this.state.passwordConfirm != '' && this.state.password != this.state.passwordConfirm ){
        return(
        <View style={{width:315, height: 144}}>
          <View style={{width:315, height: 122, backgroundColor:'white', justifyContent:'center', alignItems:'center',borderColor:'red',borderWidth:1}}>
          {this.passwordContiner()}
          </View>
          {this.renderIfUserInfoMatch()}
        </View>
        );
    }else if(this.state.password == '' && this.state.passwordConfirm == ''){
        return(
        <View style={{width:315, height: 144}}>
          <View style={{width:315, height: 122, backgroundColor:'white', borderRadius:4, justifyContent:'center', alignItems:'center',borderColor:'transparent',borderWidth:1}}>
          {this.passwordContiner()}
          </View>
          {this.renderIfUserInfoMatch()}
        </View>
        );
    }else if (this.state.password != '' && this.state.passwordConfirm != '' && this.state.password == this.state.passwordConfirm) {
      return(
      <View style={{width:315, height: 144}}>
        <View style={{width:315, height: 122, backgroundColor:'white', justifyContent:'center', alignItems:'center',borderColor:'transparent',borderWidth:1}}>
        {this.passwordContiner()}
      </View>
    </View>
    )
    } else{
      return(
      <View style={{width:315, height: 144}}>
        <View style={{width:315, height: 122, backgroundColor:'white',justifyContent:'center', alignItems:'center'}}>
        {this.passwordContiner()}
        </View>
      </View>
      )
    }
}


userInfoBox(){
  return(
    <View style={{marginTop:40}}>
    {this.renderContainerBorder()}
    </View>
  )
}

goToOnBoardingScreen(){

    this.props.navigation.navigate('OnBoarding')

}

loginButton(){
  return(
    <View>
      <View style={{height:30, backgroundColor:'transparent'}}/>
      <TouchableOpacity onPress={()=>this.loginWithEmailAndPassword()}>
        <View style={styles.loginContainerStyle}>
          <Text style={styles.loginTextStyle}>로그인</Text>
      </View>
      </TouchableOpacity>
    </View>
  )
}

findIdPassword(){
  return(
    <View style={styles.findUserInfoContainer}>

      <View style={styles.findUserInfoId}>
        <TouchableOpacity>
        <Text style={{fontSize:12,textDecorationLine: 'underline',color:'#6d7278'}}>이메일 찾기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.findUserInfoPassword}>
        <TouchableOpacity>
        <Text style={{fontSize:12,textDecorationLine: 'underline',color:'#6d7278'}}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

orLoginWithText(){
  return(
    <View style={{backgroundColor:'transparent', flexDirection:'row', paddingTop:35, alignItems:'center'}}>
      <View style={{width:101,height:0.2,backgroundColor:'black'}}/>
      <Text style={styles.orLoginWithTextStyle}>Or login with</Text>
      <View style={{ width:101,height:0.2,backgroundColor:'black'}}/>
    </View>
  )
}

otherLoginButtons(){
  return(
  <View>
    <View style={{height:25}}/>
    <View style={styles.otherLoginButtonsContainerStyle}>

     <View style={styles.otherLoginButtonsContainerStyleSub}>

     <TouchableOpacity >
      <View style={styles.otherLoginFacebookContainer}>
        <Image
                    style={{ width:13, height:25 }}
                    source={require('../Components/Assets/facebook.png')} />
      </View>
     </TouchableOpacity>

     <TouchableOpacity>
      <View style={styles.otherLoginKakaoContainer}>
        <Image
                    style={{ width:21.6, height:19.2 }}
                    source={require('../Components/Assets/group3.png')} />
      </View>
     </TouchableOpacity>

     </View>
    </View>
  </View>
  )
}

bottomText(){
  return(
    <View>
      <View style={{height:15}}/>
      <View style={styles.bottomTextContainerStyle}>

      <View style={styles.bottomTextContainerStyleSub}>

      <Text style={{color:'#444444'}}>계정이 없으신가요?</Text>
       <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
        <Text style={{fontWeight:'bold',textDecorationLine: 'underline',color:'#444444'}}> 이메일로 가입하기</Text>
       </TouchableOpacity>
      </View>

      </View>
    </View>
  )
}

// logOut(){
//     store.memberObject = undefined
//     trunk.updateStore(store).then(()=> {
//       RNKakaoLogins.logout((err, result) => {
//         if (err) {
//           console.log(err.toString()),
//           Alert.alert('로그아웃 됬습니다.'),
//           console.log('result', result),
//           console.log(store.memberObject,'store.memberObject'),
//           this.props.navigation.navigate('Login')
//       }
//     })
//   })
// }

  render() {


  return(
  <SafeAreaView style={{flex:1,backgroundColor:'#fafafa'}}>
    <View style={styles.container}>
    <Text style={styles.titleTextStyle}>로그인</Text>
        {this.userInfoBox()}
        {this.loginButton()}
        {this.findIdPassword()}
        {this.orLoginWithText()}
        {this.otherLoginButtons()}
        {this.bottomText()}

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
  input: {
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 3,
    backgroundColor: '#ffffff70',
    marginVertical: 5,
  },
  titleTextStyle:{
    fontWeight:'bold',
    fontSize:20,
    marginTop:85
  },
  typeIdPasswordContainerStyle:{
    width:295,
    height:120,
    borderRadius:4,
    backgroundColor:'white',
    borderWidth:1,
    alignItems: 'center',justifyContent: 'center'
  },
  typeIdPasswordContainerStyleSub:{
    width:'100%',height:'100%',alignItems: 'flex-start',justifyContent: 'center'
  },
  typeIdContainerStyle:{
    backgroundColor:'white',width:'100%',height:'50%',  borderColor:'#c7c7cc',
    height:60, width:256,
    borderBottomWidth:0.2,
    marginLeft:20,
    marginRight:20},
    loginTextStyle:{
    fontSize:16,
    color:'white',
  },
  typePasswordCointainerStyle:{
    marginLeft:20,
    backgroundColor:'white',
    height:50, width:256,
    marginRight:20
  },
  loginContainerStyle:{
    backgroundColor:'#00d4a1',
    height:60,
    width:295,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4,
    },
  findUserInfoContainer:{
    marginTop: 18, width:295, height:50, backgroundColor:'transparent',flexDirection:'row',alignItems: 'center'
  },
  findUserInfoId:{
    marginLeft:72, width:65, height:18, backgroundColor:'transparent'
  },
  findUserInfoPassword:{
    marginLeft:18,width:69, height:18, backgroundColor:'transparent'
  },
  orLoginWithTextContainerStyle:{
    backgroundColor:'red',
    height:60,
    width:295,
    justifyContent: 'center',
    flexDirection:'row',
    borderRadius:4,
    marginTop: 0
    },
  orLoginWithTextStyle:{
    marginLeft:10,marginRight:10, color:'#c7c7cc'
  },
  otherLoginButtonsContainerStyle:{
    width:295,
    height:40,
    borderRadius:4,
    backgroundColor:'transparent',
    alignItems:'center',
    flexDirection:'row',
  },
  otherLoginButtonsContainerStyleSub:{
    height:41, width:'100%', alignItems: 'center', justifyContent: 'center', flexDirection:'row', backgroundColor:'transparent'
  },
  otherLoginFacebookContainer:{
    justifyContent:'center',alignItems:'center',
    backgroundColor:'#3b5997',width:40, height:40,borderRadius:20
  },
  otherLoginKakaoContainer:{
    justifyContent:'center',alignItems:'center',
    backgroundColor:'#fae100', width:40, height:40, marginLeft:20,borderRadius:20
  },
  bottomTextContainerStyle:{
    backgroundColor:'transparent',
    height:40,
    width:295,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4,
  },
  bottomTextContainerStyleSub:{
    height:30, width:'100%', alignItems: 'center', justifyContent: 'center', flexDirection:'row', backgroundColor:'transparent'
  },
});
