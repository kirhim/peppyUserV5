import React, {Component} from 'react';
import { Button, Dimensions,Platform,Alert, View, TextInput, StyleSheet,Text, Image, SafeAreaView,TouchableOpacity } from 'react-native';
import {store} from '../Mobx/mobxStore'
import {observer} from "mobx-react";
import {connect} from 'react-redux'
import { toJS, observable } from 'mobx';
import { AsyncTrunk } from 'mobx-sync'
import { AsyncStorage } from "react-native"
import SwiperFlatList from 'react-native-swiper-flatlist'
import ImagePicker from 'react-native-image-crop-picker'
import { RNS3 } from 'react-native-aws3'
//import RNKakaoLogins from 'react-native-kakao-logins';

const trunk = new AsyncTrunk(store, {
  storage: AsyncStorage,
  storageKey: '__persist_mobx_stores__',
});


const {
  height: SCREEN_HEIGHT,
  heightxr:SCREEN_HEIGHTXR,
  width: SCREEN_WITDH,
} = Dimensions.get('window')

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const IS_IPHONE_XRW = SCREEN_WITDH === 414;

const BOX_BAR_WITDH = Platform.OS === 'ios' ? (IS_IPHONE_XRW ? 375 : 335) : 0;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 30) : 0;
const HeaderHeight = Platform.OS === 'ios' ? (IS_IPHONE_X ? 205 : 170) : 0;



export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amazonData: [],
      pictures:'',
      showsPagination:'',
      textStatus:true,
      phone:'',
      email:'',
      idx:'',
      list:[],
      setting: false,
      imageUrl:'',
      nameState:''
    }
  }

  componentWillMount(){
    console.log(store.memberObject.idx,'store.idx')
    console.log(toJS(store.memberObject),'store.idx')
    this.makeRemoteRequest()

    this.setState({
      newName:store.memberObject.name,
    },()=> console.log(this.state.newName,'name'))


    console.log(this.state.newName,'nnn')



    this.props.navigation.addListener ('willFocus', () =>{
    this.makeRemoteRequest()
   })

  }


makeRemoteRequest = () => {

      fetch('https://peppy.ai/peppy/v1.0/member/' + store.memberObject.idx)
          .then((response) => response.json())
          .then((response) => {
            console.log(response.data[0],'response')
            const list = response.data[0]
            this.setState({list:list}, ()=>
            {
              console.log(this.state.list,'llist')
              store.myNewName = this.state.list.name
              console.log(store.myNewName, 'store.myNewName')
            });
          })
          .catch((error) => {
            console.error(error)
          })
  }


  makeRemoteRequest2 = () => {
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



  takePics = () => {

      ImagePicker.openPicker({
        multiple: true,
        maxFiles: 1
      }).then(response => {
        store.amazonData = [];

        console.log(response,'imaage')

        let tempArray = []

        response.forEach((item) => {
          let image = {
            uri: item.path,
            width: item.width,
            height: item.height,
            name: item.filename,
            type: 'image/png'

          }
          const config = {

            bucket: 'goodvet',
            region: 'ap-northeast-2',
            accessKey: 'AKIAIJ4ZNXCKL6CIYIXQ',
            secretKey: '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',
            successActionStatus: 201
          }
          tempArray.push(image)

          RNS3.put(image, config)
            .then(responseFromS3 => {
              console.log(responseFromS3, 'responseFromS3')
              this.setState({ amazonData: [...this.state.amazonData, responseFromS3.body.postResponse.location] },
              ()=>
              {
              store.amazonData = this.state.amazonData[0],
              store.memberObject.profileImageUrl = this.state.amazonData[0]
              console.log(store.amazonData,'store.amazonData')
              })
            })
        })
        this.setState({ pictures: tempArray },
        ()=> console.log(this.state.picture, 'picture'))
        { this.hideIcons() }
      })
    }

    hideIcons() {
      if (this.state.pictures.length <= 1) {
        this.setState({ textStatus: false })
        this.setState({ showsPagination: false })
      }
      else if (this.state.pictures.length === 1) {
        this.setState({ showsPagination: false })
        this.setState({ textStatus: false })
      }
      else {
        this.setState({ showsPagination: true })
        this.setState({ textStatus: false })
      }
    }



    takePicHandler() {

      const newImage = this.state.pictures
      const image = index => ({ image: newImage[index % newImage.length] });
      const items = Array.from(Array(newImage.length)).map((_, index) => image(index));

    if(this.state.list.profileImageUrl != null){
      return (
        <View style={{paddingTop:40, width:'100%', height:160, alignItems:'center', justifyContent:'center', backgroundColor:'transparent'}}>

        {
          this.state.textStatus ?
            <Image
              style={{width:114, height:114,borderRadius:57, backgroundColor:'transparent' }}
              source={{uri: this.state.list.profileImageUrl}}/>
            :   null
        }
            <SwiperFlatList
              data={items}
              renderItem={({ item }) =>
              <View style={styles.uploadedImageView}>
                  <Image
                    style={{width:114, height:114,borderRadius:57, alignItems:'center', justifyContent:'flex-end' }}
                    source={item.image}>
                  </Image>
              </View>
              }
                />

      </View>
      )
    }else{
      return(
        <View style={{width:'100%', height:150, alignItems:'center', justifyContent:'center', backgroundColor:'transparent'}}>
        {
          this.state.textStatus ?
          <Image
            style={{width:114, height:114,borderRadius:57, backgroundColor:'transparent' }}
            source={require('../Components/Assets/iconProfile.png')}/>
            :   null
        }
        <SwiperFlatList
          data={items}
          renderItem={({ item }) =>
          <View style={styles.uploadedImageView}>
              <Image
              style={{width:114, height:114,borderRadius:57, alignItems:'center', justifyContent:'flex-end' }}
              source={item}>
              </Image>
          </View>
          }
            />
        </View>
      )
    }
  }


  addPhotoIconStyle(){
  if(this.state.setting == false){
        null
  }
  else{
  return(
    <TouchableOpacity
                    underlayColor="gray"
                    onPress={this.takePics.bind(this)} hitSlop={{top: 40, bottom: 40, left: 40, right: 40}} >
      <View style={{marginLeft:212,marginTop:-30,width:26,height:26, backgroundColor:'#00a2f5', borderRadius:13,justifyContent:'center', alignItems:'center'}}>
          <Image
                    style={{  width:13, height:13}}
                    source={require('../Components/Assets/iconPlusWhite.png')} />
      </View>

    </TouchableOpacity>
  )
  }
}



  putApi(){
    if(this.state.newName == ''){
      alert('닉네임을 입력해주세요.')
      return
    }

    store.myNewName = this.state.newName
    store.memberObject.name = this.state.newName

    fetch('https://peppy.ai/peppy/v1.0/member/' + store.memberObject.idx, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     name:this.state.newName,
     profileImageUrl:this.state.amazonData[0]
    }), // data can be `string` or {object}!
  }).then(res => res.json())
      .then((response) => {
        console.log('Success:', JSON.stringify(response))
        trunk.updateStore(store)
          .then(() => {
            //1-1-4. 저장 완료 후 메인 화면으로 이동한다.
            alert('회원정보가 수정 되었습니다 :)')
            console.log(store,'store')
            this.props.navigation.navigate('ButtomTab');
          });
      })
      .catch((error) => {
        console.error('Errors:', (error))
      })

  }

  changeStatus(){
    this.setState({
        setting: !this.state.setting
      }, console.log(this.state.setting, 'setting status'))
  }

  goBack(){
    if(this.state.setting != false){
      return(
        alert('프로필 정보를 저장해 주세요!')
      )
    }
    else{
      return(
        this.props.navigation.navigate('ButtomTab')
      )
    }
  }

  customHeader(){
    if(this.state.setting == false){
      return(
        <View style={{paddingTop:STATUS_BAR_HEIGHT, height:94, width:'100%',backgroundColor:'white',alignItems: 'center', justifyContent: 'space-between', flexDirection:'row', borderBottomWidth:1, borderColor:'#dddddd'}}>
        <TouchableOpacity
        onPress={() => {this.props.navigation.navigate('ButtomTab')}} hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}>
          <Image
                    style={{width:20, height:17,marginLeft:20 }}
                    source={require('../Components/Assets/iconBackBlack.png')}/>
        </TouchableOpacity>
          <Text style={{fontSize:16, color:'black'}}>프로필 정보</Text>
          <TouchableOpacity onPress={()=>{this.changeStatus()}} hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}>
          <Text style={{fontSize:16, marginRight:20, color:'black'}}>수정</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else{
      return(
        <View style={{paddingTop:STATUS_BAR_HEIGHT, height:94, width:375,backgroundColor:'#1ed0a3',alignItems: 'center', justifyContent: 'space-between', flexDirection:'row'}}>

          <Text style={{paddingLeft:142,fontSize:16, color:'white'}}>프로필 정보</Text>
          <TouchableOpacity onPress={()=>{this.changeStatus(),this.makeRemoteRequest2(), this.putApi()}} hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}>
          <Text style={{fontSize:16, marginRight:20, color:'white'}}>저장</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }


    nickNameContainer(){
      if(this.state.setting == false){
      return(
        <View style={{paddingTop:0}}>
        <Text style={{marginBottom:7,fontSize:12}}>닉네임</Text>
        <View style={{width:BOX_BAR_WITDH, height:50,backgroundColor:'white',borderRadius:4,borderWidth:0.5,borderColor:'#c7c7cd'}}>
          <Text style={{marginTop:15,marginLeft:16,marginBottom:15}}>{store.myNewName}</Text>
        </View>
        </View>
      )
    }else{
      return(
        <View style={{paddingTop:0}}>
        <Text style={{marginBottom:7,fontSize:12}}>닉네임</Text>
        <View style={{width:BOX_BAR_WITDH, height:50,backgroundColor:'white',borderRadius:4,borderWidth:0.5,borderColor:'#40baf8'}}>
          <TextInput
          maxLength={6}
          onChangeText={(name) => this.setState({
             newName:name
           })}
          value={this.state.newName}
          style={{marginTop:15,marginLeft:16,marginBottom:15}}
          placeholder="닉네임을 입력해주세요."
          />
        </View>
        </View>
       )
      }
    }

    EmailContainer(){
      if(this.state.setting == false){
      return(
        <View style={{marginTop:20}}>
          <Text style={{marginBottom:7,fontSize:12}}>이메일</Text>
            <View style={{width:BOX_BAR_WITDH, height:50,backgroundColor:'white',borderRadius:4,borderWidth:0.5,borderColor:'#c7c7cd'}}>
              <Text style={{marginTop:15,marginLeft:16,marginBottom:15}}>{this.state.list.email}</Text>
            </View>
        </View>
      )
    }else{
      return(

        <View style={{marginTop:20}}>
        <Text style={{marginBottom:7,fontSize:12}}>이메일</Text>
        <View style={{width:BOX_BAR_WITDH, height:50,backgroundColor:'white',borderRadius:4,borderWidth:0.5,borderColor:'#c7c7cd'}}>

          <Text style={{marginTop:15,marginLeft:16,marginBottom:15}}>{this.state.list.email}</Text>

        </View>
        </View>
      )
     }
    }

    phoneContainer(){
      if(this.state.setting == false){
      return(
        <View style={{marginTop:20}}>
          <Text style={{marginBottom:7,fontSize:12}}>연락처</Text>
            <View style={{width:BOX_BAR_WITDH, height:50,backgroundColor:'white',borderRadius:4,borderWidth:0.5,borderColor:'#c7c7cd'}}>
            <Text style={{marginTop:15,marginLeft:16,marginBottom:15}}>{this.state.list.phone}</Text>
          </View>
        </View>
      )
    }else{
      return(
        <View style={{marginTop:20}}>
          <Text style={{marginBottom:7,fontSize:12}}>연락처</Text>
            <View style={{width:BOX_BAR_WITDH, height:50,backgroundColor:'white',borderRadius:4,borderWidth:0.5,borderColor:'#c7c7cd'}}>
            <Text style={{marginTop:15,marginLeft:16,marginBottom:15}}>{this.state.list.phone}</Text>

          </View>
        </View>
      )
     }
    }

  logOut(){
      store.memberObject = undefined
      trunk.updateStore(store).then(()=> {

      //   RNKakaoLogins.logout((err, result) => {
      //     if (err) {
      //       console.log(err.toString()),
      //       Alert.alert('로그아웃 되었습니다.'),
      //       console.log('result', result),
      //       console.log(store.memberObject,'store.memberObject'),
      //       this.props.navigation.navigate('Login')
      //   }
      // })
    })
  }


  render() {
  return(
      <View style={styles.container}>

        {this.customHeader()}
        {this.takePicHandler()}
        {this.addPhotoIconStyle()}
        <View style={{justifyContent:'center',alignItems:'center'}}>
        {this.nickNameContainer()}
        {this.EmailContainer()}
        {this.phoneContainer()}
        <TouchableOpacity onPress={()=> this.logOut()}>
          <Text style={{paddingTop:150,fontSize:20, color:'red'}}>로그아웃</Text>
        </TouchableOpacity>



        </View>

      </View>

    )
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  uploadedImageView: {
  width: 114,
  height: 114,
  backgroundColor:'transparent'
 }
});
