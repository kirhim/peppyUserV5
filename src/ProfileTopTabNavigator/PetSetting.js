import React, {Component} from 'react'
import { View,Button, TextInput, StyleSheet,Text,TouchableOpacity, Image,Dimensions,Platform,ScrollView } from 'react-native'
import AddPhoto from '../Components/AddPhoto'
import {store} from '../Mobx/mobxStore'
import { toJS, observable } from 'mobx';
import { RNS3 } from 'react-native-aws3'
import SwiperFlatList from 'react-native-swiper-flatlist'
import ImagePicker from 'react-native-image-crop-picker'
import PetTypeButton from '../AddPet/CustomButtons/PetTypeButton'
import PetSexTypeButton from '../AddPet/CustomButtons/PetSexTypeButton'
import PetNeutralStatusButton from '../AddPet/CustomButtons/PetNeutralStatusButton'
import PetBasicCareStatusButton from '../AddPet/CustomButtons/PetBasicCareStatusButton'
import SelectPetType from '../HospitalStack/SelectPetType'
import PopupDialog, { DialogContent } from 'react-native-popup-dialog';

const {
  height: SCREEN_HEIGHT,
  heightxr:SCREEN_HEIGHTXR,
  width: SCREEN_WITDH,

} = Dimensions.get('window')

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const IS_IPHONE_XR = SCREEN_HEIGHTXR === 896;
const IS_IPHONE_XRW = SCREEN_WITDH === 414;


const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 30) : 0;
const BOX_BAR_WITDH = Platform.OS === 'ios' ? (IS_IPHONE_XRW ? 375 : 335) : 0;
const BOX_BAR_WITDH_ONE = Platform.OS === 'ios' ? (IS_IPHONE_XRW ? 190 : 170) : 0;
const BOX_BAR_WITDH_TWO = Platform.OS === 'ios' ? (IS_IPHONE_XRW ? 166 : 146) : 0;

const HeaderHeight = Platform.OS === 'ios' ? (IS_IPHONE_X ? 205 : 170) : 0;

var switchData = store.petListSetting

export default class PetSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      request: this.props.navigation.getParam('request', undefined),
      visible3:'',
      amazonData: [],
      pictures:'',
      showsPagination:'',
      textStatus:true,
      setting: false,
      petType:'',
      petGender:'',
      petTypeName:'',
      regNo:'',
      medicalHistory:'',
      allergy:'',
    }
    console.log(this.state.request,'request')
  }

  componentWillMount(){
    console.log(toJS(store.myPet),'store.myPet1')

     const memberIdx = store.PriceScreenIdx
     console.log(memberIdx, 'idx')
     console.log(this.state.request, 'state request')

     this.setState({
       newName:this.state.request.name,
       newDogcat:this.state.request.dogcat,
       newBirthday:this.state.request.birthday,
       newgender:this.state.request.gender,
       newNeutral:this.state.request.neutral,
       newVaccin:this.state.request.vaccin,
       newRegNo:this.state.request.regNo,
       newFeedBrand:this.state.request.feedBrand,
       newMedicalHistory:this.state.request.medicalHistory,
       newAllergy:this.state.request.allergy,
       newPetKind:this.state.request.petkindIdx

     },()=> console.log(this.state.newPetKind,'newPetKindnewPetKind'))

     store.myPet = {}
     store.myPet.name = this.state.request.name
     store.myPet.dogcat = this.state.request.dogcat
     store.myPet.gender = this.state.request.gender
     store.myPet.birthday = this.state.request.birthday
     store.myPet.petkindIdx = this.state.request.petkindIdx
     store.myPet.neutral = this.state.request.neutral
     store.myPet.medicalHistory = this.state.request.medicalHistory
     store.myPet.regNo = this.state.request.regNo
     store.myPet.vaccin = this.state.request.vaccin
     store.myPet.feedBrand = this.state.request.feedBrand
     store.myPet.allergy = this.state.request.allergy




     console.log(toJS(store.myPet),'store.myPet2')
     console.log(store.petKindSetting,'store.petKindSetting1')


     store.petTypeSetting = this.state.request.dogcat
     store.petGenderSetting = this.state.request.gender
     store.petNeutralSetting = this.state.request.neutral
     store.petVaccinSetting = this.state.request.vaccin
     store.petKindSetting = this.state.request.petkindIdx

     console.log(store.petKindSetting,'store.petKindSetting2')

     store.myPet.name = this.state.request.name
     this.props.navigation.addListener ('willFocus', () =>{
     this.makeRemoteRequest()
     this.state.setting

    })
    // store.myPet.name = this.state.request.name
    // store.myPet.dogcat = this.state.request.dogcat
    // store.myPet.petSex = this.state.request.gender
    // store.myPet.birthday = this.state.request.birthday
    // store.myPet.petkindIdx = this.state.request.petkindIdx
    // store.myPet.neutral = this.state.request.neutral
    // store.myPet.vaccin = this.state.request.vaccin
    // store.myPet.regNo = this.state.request.regNo
    // store.myPet.feedBrand = this.state.request.feedBrand
    // store.myPet.medicalHistory = this.state.request.medicalHistory
    // store.myPet.allergy = this.state.request.allergy
    // store.myPet.imageUrl = this.state.request.imageUrl
    // store.myPet.memberIdx = this.state.request.memberIdx
  }

  changeStatus(){
    this.setState({
        setting: !this.state.setting
      }, console.log(this.state.setting, 'setting status'))
  }


  makeRemoteRequest = () => {

    fetch('https://peppy.ai/peppy/v1.0/pet?memberIdx=' + store.PriceScreenIdx, )
        .then((response) => response.json())
        .then((response) => {
          console.log(response.data,'response')

        })
        .catch((error) => {
          console.error(error)
        })
  }

  goBack(){
    if(this.state.setting != false){
      return(
        alert('반려동물 정보를 저장해 주세요!')
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
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('ButtomTab')}>
          <Image
                    style={{width:20, height:17,marginLeft:20 }}
                    source={require('../Components/Assets/iconBackBlack.png')}/>
        </TouchableOpacity>
          <Text style={{fontSize:16, color:'black'}}>반려동물 정보</Text>
          <TouchableOpacity
                  onPress={() => this.setState({visible3:true})} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
          <Text style={{fontSize:16, marginRight:20, color:'black'}}>수정</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else{
      return(
        <View style={{paddingTop:STATUS_BAR_HEIGHT, height:94, width:375,backgroundColor:'#1ed0a3',alignItems: 'center', justifyContent: 'space-between', flexDirection:'row'}}>

          <Text style={{paddingLeft:142,fontSize:16, color:'white'}}>반려동물 정보</Text>
          <TouchableOpacity onPress={()=>{this.changeStatus(), this.putMyPetInfoToServer()}} hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}>
          <Text style={{fontSize:16, marginRight:20, color:'white'}}>저장</Text>
          </TouchableOpacity>
        </View>
      )
    }
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
              console.log(store.amazonData[0],'store.amazonData')
              })
            })
        })
        this.setState({ pictures: tempArray },
        console.log(this.state.picture, 'pictures'))
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
      return (
        <View style={{marginTop:40, width:'100%', height:110, alignItems:'center', justifyContent:'center', backgroundColor:'transparent',paddingBottom:20}}>
        <View style={{ width: 106,borderRadius:53, height: 106, backgroundColor: 'transparent', borderBottomWidth: 0.3, borderColor: 'gray', alignItems:'center', justifyContent:'center'}}>
        {
          this.state.textStatus ?
                  <Image
                            style={{marginTop:1,width:114, height:114,borderRadius:57, backgroundColor:'transparent' }}
                            source={{ uri: this.state.request.imageUrl }}
                            />
                             :null
        }
            <SwiperFlatList
              data={items}
              renderItem={({ item }) =>
                <View style={styles.uploadedImageView}>
                  <Image
                    style={{ width: "100%", height: '100%',borderRadius:53, alignItems:'center', justifyContent:'flex-end' }}
                    source={item.image}>
                  </Image>
              </View>
              }
                />
        </View>
      </View>
      )
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


petNameContainer(){
  var nameValue = this.state.request.name
  if(this.state.setting == false){
  return(
    <View style={{paddingTop:25,width:'100%', backgroundColor:'white',justifyContent:'center'}}>
      <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>반려동물 이름</Text>
      <View style={{borderRadius:4, marginTop:8, marginLeft:20, width:BOX_BAR_WITDH, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
      <Text style={{marginLeft:14, width:'100%'}}>{store.myPet.name}</Text>
      </View>

    </View>
  )
}else{
  return(

  <View style={{paddingTop:25,width:'100%', backgroundColor:'white',justifyContent:'center'}}>
    <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>반려동물 이름</Text>
    <View style={{borderRadius:4, marginTop:8, marginLeft:20, width:BOX_BAR_WITDH, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
    <TextInput style={{marginLeft:14, width:'100%'}}
              maxLength={6}
              onChangeText={(petName) => this.setState({
                 newName:petName
               })}
              value={this.state.newName}
              placeholderTextColor='#9f9f9f'
              keyboardType='web-search'
              placeholder="이름을 6자 이내로 입력해주세요."/>
    </View>
  </View>
    )
  }
}
// 데이터 변화 핸들러
petTypeHandler(){
  if(store.myPet.dogcat == 'd'){
    return '강아지'
  }
  else if(store.myPet.dogcat == 'c'){
    return '고양이'
  }
}

petGenderHandler(){
  if(store.myPet.gender == 'm'){
    return '남아'
  }
  else if(store.myPet.gender == 'f'){
    return '여아'
  }
}

petNeutralHandler(){
  if(store.myPet.neutral == "0"){
    return '중성화완료'
  }
  else if(store.myPet.neutral == "1"){
    return '중성화전'
  }
}

petVaccinHandler(){
  if(store.myPet.vaccin == 0 ){
    return '모름'
  }
  else if(store.myPet.vaccin == 1){
    return '접종전'
  }
  else if(store.myPet.vaccin == 2){
    return '접종중'
  }
  else if(store.myPet.vaccin == 3){
    return '접종완료'
  }
}


petTypeNameHandler(){
  if(store.petKindSetting == 1){
    return(
      <Text>말티즈</Text>
    )
  }else if (store.petKindSetting == 2) {
    return(
      <Text>포메라이언</Text>
    )
  }else if (store.petKindSetting == 3) {
    return(
      <Text>푸들</Text>
    )
  }else if (store.petKindSetting == 4) {
    return(
      <Text>뱅갈</Text>
    )
  }else if (store.petKindSetting == 5) {
    return(
      <Text>샴</Text>
    )
  }
}



petTypeContainer(){
  if(this.state.setting == false){
  return(
    <View style={{paddingTop:17,width:'100%', backgroundColor:'white',justifyContent:'center', flexDirection:'row'}}>
      <View>
        <Text style={{color:'#444444',fontSize:12}}>종류</Text>
        <View style={{borderRadius:4, marginTop:8,  width:BOX_BAR_WITDH_ONE, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
        <Text style={{marginLeft:14, width:'100%'}}>{this.petTypeHandler()}</Text>
        </View>
      </View>

      <View style={{marginLeft:19}}>
        <Text style={{color:'#444444',fontSize:12}}>성별</Text>
        <View style={{borderRadius:4, marginTop:8, width:BOX_BAR_WITDH_TWO, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
        <Text style={{marginLeft:14, width:'100%'}}>{this.petGenderHandler()}</Text>
        </View>
      </View>
    </View>
  )
}else{
  return(
  <View style={{paddingTop:17,width:'100%', backgroundColor:'white',justifyContent:'center', flexDirection:'row'}}>
    <View>
      <Text style={{color:'#444444',fontSize:12}}>종류</Text>
      <View style={{borderRadius:4, marginTop:8,  width:BOX_BAR_WITDH_ONE, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
        <PetTypeButton
                        text1='강아지'
                        text2='고양이'
                        />
      </View>
    </View>

    <View style={{marginLeft:19}}>
      <Text style={{color:'#444444',fontSize:12}}>성별</Text>
      <View style={{borderRadius:4, marginTop:8, width:BOX_BAR_WITDH_TWO, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
      <PetSexTypeButton
                      text1='남아'
                      text2='여아'
                      />
      </View>
    </View>
  </View>
  )
 }
}


petBirthContainer(){
  if(this.state.setting == false){
  return(
    <View style={{paddingTop:20,width:'100%', backgroundColor:'white',justifyContent:'center'}}>
      <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>생일</Text>
      <View style={{borderRadius:4, marginTop:8, marginLeft:20, width:BOX_BAR_WITDH, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
      <Text style={{marginLeft:14, width:'100%'}}>{store.myPet.birthday}</Text>
      </View>

    </View>
  )
}else{
  return(
    <View style={{paddingTop:20,width:'100%', backgroundColor:'white',justifyContent:'center'}}>
      <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>생일</Text>
      <View style={{borderRadius:4, marginTop:8, marginLeft:20, width:BOX_BAR_WITDH, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
      <TextInput style={{marginLeft:14, width:'100%'}}
                maxLength={6}
                onChangeText={(birthday) => this.setState({
                   newBirthday:birthday
                 })}
                 value={this.state.newBirthday}
                placeholderTextColor='#9f9f9f'
                keyboardType='numeric'
                placeholder="생년월일을 입력해주세요."/>
      </View>
    </View>
  )
 }
}

petTypeNameContainer(){
  if(this.state.setting == false){
  return(
    <View style={{paddingTop:20,width:'100%', backgroundColor:'white',justifyContent:'center'}}>
      <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>품종</Text>
      <View style={{borderRadius:4, marginTop:8, marginLeft:20, width:BOX_BAR_WITDH, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
      <Text style={{marginLeft:14, width:'100%'}}>{this.petTypeNameHandler()}</Text>
      </View>
    </View>
  )
}else{
 return(
   <View style={{paddingTop:20,width:'100%', backgroundColor:'white',justifyContent:'center'}}>
     <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>품종</Text>
     <View style={{borderRadius:4, marginTop:8, marginLeft:20, width:BOX_BAR_WITDH, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
     <SelectPetType/>

     </View>
   </View>
   )
  }
}

petNeutralContainer(){
  if(this.state.setting == false){
  return(
    <View style={{paddingTop:20,width:'100%', backgroundColor:'white',justifyContent:'center'}}>
      <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>중성화 여부*</Text>
      <View style={{borderRadius:4, marginTop:8, marginLeft:20, width:BOX_BAR_WITDH, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
      <Text style={{marginLeft:14, width:'100%'}}>{this.petNeutralHandler()}</Text>
      </View>
    </View>
  )
}else{
  return(
  <View style={{ paddingLeft:20,width:'100%', backgroundColor:'transparent'}}>
  <Text style={{marginTop:17,paddingBottom:8, fontSize:12, color:'#444444'}}>중성화 여부*</Text>
  <PetNeutralStatusButton
                  text1='중성화 완료'
                  text2='중성화 전'/>
  </View>
  )
 }
}

petBacisCareContainer(){
  if(this.state.setting == false){
  return(
    <View style={{paddingTop:20,width:'100%', backgroundColor:'white',justifyContent:'center'}}>
      <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>기초접종여부</Text>
      <View style={{borderRadius:4, marginTop:8, marginLeft:20, width:BOX_BAR_WITDH, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
      <Text style={{marginLeft:14, width:'100%'}}>{this.petVaccinHandler()}</Text>
      </View>

    </View>
  )
}else{
    return(
      <View style={{marginBottom:20, paddingLeft:20,width:'100%', backgroundColor:'white'}}>
      <Text style={{marginTop:17,paddingBottom:8, fontSize:12, color:'#444444'}}>기초접종여부</Text>
      <PetBasicCareStatusButton
                      text1='모름'
                      text2='접종전'
                      text3='접종중'
                      text4='접종완료'
                      />
      </View>
  )
 }
}

petIdNumberContainer(){
  if(this.state.setting == false){
  return(
    <View style={{paddingTop:20,width:'100%', backgroundColor:'white',justifyContent:'center'}}>
      <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>반려동물 등록번호</Text>
      <View style={{borderRadius:4, marginTop:8, marginLeft:20, width:BOX_BAR_WITDH, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
      <Text style={{marginLeft:14, width:'100%'}}>{store.myPet.regNo}</Text>
      </View>
    </View>
  )
}else{
  return(
    <View style={{paddingTop:20,width:'100%', backgroundColor:'white',justifyContent:'center'}}>
      <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>반려동물 등록번호</Text>
        <View style={{borderRadius:4, marginTop:8, marginLeft:20, width:BOX_BAR_WITDH, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
          <TextInput style={{marginLeft:14, width:'100%'}}
                    onChangeText={(regNo) => this.setState({
                      newRegNo:regNo
                    })}
                    value={this.state.newRegNo}
                    placeholderTextColor='#9f9f9f'
                    keyboardType='web-search'
                    placeholder="반려동물 등록번호를 입력해주세요"/>
        </View>
    </View>
  )
 }
}

petFoodBrandContainer(){
  if(this.state.setting == false){
  return(
    <View style={{paddingTop:20,width:'100%', backgroundColor:'white',alignItems: 'flex-start', justifyContent: 'flex-start'}}>
      <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>급여중인 사료이름</Text>
        <View style={{borderRadius:4, marginTop:8, marginLeft:20, width:BOX_BAR_WITDH, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1}}>
          <Text style={{paddingTop:15,marginLeft:14, width:'100%',height:'100%'}}>{store.myPet.feedBrand}</Text>
        </View>
    </View>
  )
}else{
  return(
    <View style={{paddingTop:20,width:'100%', backgroundColor:'white',justifyContent:'flex-start'}}>
      <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>급여중인 사료이름</Text>
        <View style={{borderRadius:4, marginTop:8, marginLeft:20, width:BOX_BAR_WITDH, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1}}>
          <TextInput style={{marginLeft:14, width:'100%',height:'100%'}}
                    onChangeText={(feedBrand) => this.setState({
                      newFeedBrand:feedBrand
                    })}
                    value={this.state.newFeedBrand}
                    placeholderTextColor='#9f9f9f'
                    keyboardType='web-search'
                    multiline={true}
                    placeholder="사료이름을 입력해주세요."/>
        </View>
    </View>
  )
 }
}

petHistoryContainer(){
  if(this.state.setting == false){
  return(
    <View style={{paddingTop:20,width:'100%', backgroundColor:'white',justifyContent:'center'}}>
      <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>과거 병력 / 수술 이력</Text>
      <View style={{borderRadius:4, marginTop:8, marginLeft:20, width:BOX_BAR_WITDH, height:100, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
      <Text style={{paddingTop:15, marginLeft:14, width:'100%',height:'100%'}}>{store.myPet.medicalHistory}</Text>
      </View>
    </View>
  )
}else{
  return(
    <View style={{paddingTop:20,width:'100%', backgroundColor:'white',justifyContent:'center'}}>
      <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>과거 병력 / 수술 이력</Text>

      <View style={{borderRadius:4,height:100, marginTop:8, marginLeft:20, width:BOX_BAR_WITDH, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start'}}>
      <TextInput style={{marginLeft:14, width:304, paddingTop:11, height:74,width:'100%',height:'100%'}}
                onChangeText={(medicalHistory) => this.setState({
                  newMedicalHistory:medicalHistory
                })}
                value={this.state.newMedicalHistory}
                placeholderTextColor='#9f9f9f'
                keyboardType='web-search'
                multiline={true}
                placeholder="왼쪽 시력을 잃어버렸어요."/>
      </View>
    </View>
  )
 }
}

petAlergyContainer(){
  if(this.state.setting == false){
  return(
    <View style={{paddingTop:20,width:'100%', backgroundColor:'white',justifyContent:'center',paddingBottom:50}}>
      <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>알러지</Text>
      <View style={{borderRadius:4, marginTop:8, marginLeft:20, width:BOX_BAR_WITDH, height:100, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
      <Text style={{paddingTop:15, marginLeft:14, width:'100%',height:'100%'}}>{store.myPet.allergy}</Text>
      </View>
    </View>
  )
}else{
  return(
    <View style={{paddingTop:20,width:'100%', backgroundColor:'white',justifyContent:'center',paddingBottom:50}}>
      <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>알러지</Text>
        <View style={{borderRadius:4, marginTop:8, marginLeft:20, width:BOX_BAR_WITDH, height:100, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
          <TextInput style={{marginLeft:14, width:'100%',height:'100%'}}
                    onChangeText={(allergy) => this.setState({
                      newAllergy:allergy
                    })}
                    value={this.state.newAllergy}
                    placeholderTextColor='#9f9f9f'
                    keyboardType='web-search'
                    multiline={true}
                    placeholder="환절기에 알러지가 심해져서 주의하고 있어요."/>
        </View>
    </View>
  )
 }
}

  putMyPetInfoToServer(){

    store.myPet.name = this.state.newName
    store.myPet.birthday = this.state.newBirthday
    store.myPet.regNo = this.state.newRegNo
    store.myPet.feedBrand = this.state.newFeedBrand
    store.myPet.medicalHistory = this.state.newMedicalHistory
    store.myPet.allergy = this.state.newAllergy


    store.myPet.dogcat = store.newDogcat
    store.myPet.gender = store.newgender
    store.myPet.neutral = store.newNeutral
    store.myPet.vaccin = store.newVaccin

    store.myPet.petkindIdx = store.petKindSetting
    store.myPet.imageUrl = this.state.amazonData[0]

    console.log(toJS(store.myPet,'store.myPet'))
    console.log(toJS(store.myPet), 'store.myPet')

    fetch('https://peppy.ai/peppy/v1.0/pet/' + this.state.request.idx, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(store.myPet), // data can be `string` or {object}!
  }).then(res => res.json())
      .then((response) => {
        console.log('Success:', JSON.stringify(response))
        alert('반려동물 정보가 수정되었습니다.')
        this.props.navigation.goBack()

      })
      .catch((error) => {
        console.error('Errors:', (error))
      })
  }

  deletePet(){

  }

  popUpConfirmView(){
    return(
      <PopupDialog
        containerStyle={{ justifyContent: 'flex-end', paddingBottom:30, backgroundColor:'transparent'}}
        visible={this.state.visible3}
        onTouchOutside={() => {
          this.setState({ visible3: false });
        }}
      >

      <View style={{height: 80,width: 336, backgroundColor:'white', borderRadius:4, marginBottom:10}}>

        <View style={{height:40, borderBottomWidth:0.5, borderColor:'#e4e4e4',justifyContent:'center', alignItems:'center'}}>
          <TouchableOpacity onPress={()=>{this.changeStatus(), this.setState({visible3: false})}}>
            <Text style={{paddingBottom:10,paddingTop:10,fontSize:15, color:'#4a4a4a'}}>정보 수정하기</Text>
          </TouchableOpacity>
        </View>

        <View style={{height:40,justifyContent:'center', alignItems:'center'}}>
          <TouchableOpacity>
            <Text style={{paddingBottom:5,paddingTop:10,fontSize:15, color:'#4a4a4a'}}>반려동물 삭제하기</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View style={{height: 50,width: 336, backgroundColor:'white', borderRadius:4}}>

      <View style={{ borderTopWidth:0.5, borderColor:'#e4e4e4',justifyContent:'center', alignItems:'center'}}>
          <TouchableOpacity onPress={()=>this.setState({ visible3: false })}>
              <Text style={{paddingTop:15,fontSize:15, color:'red'}}>취소</Text>
            </TouchableOpacity>
      </View>

      </View>
    </PopupDialog>
    )
  }


  render() {
  return(
  <View>
    {this.customHeader()}
    <ScrollView style={{marginBottom:100}}>
      <View>
        {this.takePicHandler()}
        {this.addPhotoIconStyle()}
        {this.petNameContainer()}
        {this.petTypeContainer()}
        {this.petBirthContainer()}

        {this.petTypeNameContainer()}
        {this.petNeutralContainer()}
        {this.petBacisCareContainer()}
        {this.petIdNumberContainer()}
        {this.petFoodBrandContainer()}
        {this.petHistoryContainer()}
        {this.petAlergyContainer()}
      </View>
    </ScrollView>
    {this.popUpConfirmView()}

  </View>
    )
  };
}
const styles = StyleSheet.create({
  uploadedImageView: {
  width: 106,
  height: 106,
  backgroundColor:'transparent'
},
modalcal3: {
 alignItems:'center',
 justifyContent:'center',
 height: 356,
 width: 336,
 borderRadius:4
},
});
