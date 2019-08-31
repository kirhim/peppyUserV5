import React, {Component} from 'react';
import {KeyboardAvoidingView, Dimensions,Platform, View, Alert, TextInput, Button,StyleSheet,Text,ImageBackground, Image,TouchableHighlight, TouchableOpacity, SafeAreaView,ScrollView} from 'react-native';
import SegmentedControlTab from "react-native-segmented-control-tab";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import SelectPetType from '../HospitalStack/SelectPetType'
import Collapsible from 'react-native-collapsible';
import PetTypeButton from './CustomButtons/PetTypeButton'
import PetSexTypeButton from './CustomButtons/PetSexTypeButton'
import PetNeutralStatusButton from './CustomButtons/PetNeutralStatusButton'
import PetBasicCareStatusButton from './CustomButtons/PetBasicCareStatusButton'
import {store} from '../Mobx/mobxStore'
import { toJS, observable } from 'mobx';
import moment from 'moment';
import Accordion from 'react-native-collapsible/Accordion';
import AddPhoto from '../Components/AddPhoto'

const {
  height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 30) : 0;
const HeaderHeight = Platform.OS === 'ios' ? (IS_IPHONE_X ? 205 : 170) : 0;

//image
import ArrowDown from '../Components/Assets/iconFold.png'
import ArrowUp from '../Components/Assets/iconFold2.png'
var _scrollToBottomY

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)

export default class AddPet extends Component {
  initialState = {
       [_today]: {disabled: true}
   }

  constructor(props) {
    super(props)
    this.state = {
   selectedSexIndex: 0,
   selectedTypeIndex: 0,
   selectedType2Index: 0,
   selectedType3Index: 0,
   collapsed: false,
   showImage: true,
   selectedItems: [],
   isDisabled: false,
   isOpen: false,
   region: [],
   bday:'',
   petName:'',
   markedDates:'',
   _markedDates: this.initialState,
   paddingBottom:0
    };
  }

  componentWillMount(){
  //pet 정보 초기화
  store.myPet = {}
  store.petTypeSetting = ''
  store.petGenderSetting = ''
  store.petNeutralSetting = ''
  store.petKindSetting = ''

  console.log(toJS(store.myPet),'store.myPet')

  console.log(store.myPet.vaccin, 'myPet.vaccin')
  console.log(store.newVaccin, 'newVaccin')

  console.log(toJS(store.memberObject.idx),'store.memberObject')

}

updateMobxStore = () => {

const userInfo = {
  id: 1,
  email: 'kirimi@connlab.com',
  petInfo: {
      name: this.state.petName,
      birthday: store.petBB,
      type: store.petType,
      sex: store.petSex,
      species:'',
      netural:'',
      basicCare:'',
      animalNumber:'',
      foodBrand:'',
      history:'',
      alergy:''
  }
}

    store.petName = [...store.petName, userInfo]
    console.log(toJS(store.petName), 'petName')
  }

  //커스텀 해더 특별한 기능 없음
    customHeader(){
      return(
        <View style={{paddingTop:STATUS_BAR_HEIGHT, height:94, width:375,backgroundColor:'#1ed0a3',alignItems: 'center', justifyContent: 'space-between', flexDirection:'row'}}>
        <TouchableOpacity
        onPress={() => {this.props.navigation.navigate('ButtomTab')}} hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}>
          <Image
                    style={{width:20, height:17,marginLeft:20 }}
                    source={require('../Components/Assets/white.png')}/>
        </TouchableOpacity>
          <Text style={{fontSize:16, color:'white'}}>반려동물 정보</Text>
          <TouchableOpacity
          onPress={() => { this.postApi()}} hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}>
          <Text style={{fontSize:16, marginRight:20, color:'white'}}>저장</Text>
          </TouchableOpacity>
        </View>
      )
    }

      typeComment(){
        return(
          <View style={{paddingTop:25,width:'100%', backgroundColor:'white',justifyContent:'center'}}>
            <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>반려동물 이름</Text>
            <View style={{borderRadius:4, marginTop:8, marginLeft:20, width:335, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
            <TextInput style={{marginLeft:14, width:'100%'}}
                      maxLength={6}
                      onChangeText={(petName) => this.setState({
                        petName:petName
                      })}
                      value={this.state.petName}
                      placeholderTextColor='#9f9f9f'
                      keyboardType='web-search'
                      placeholder="이름을 6자 이내로 입력해주세요."/>
            </View>

          </View>
        )
      }

    typeContainer(){
      return(
        <View style={{ paddingLeft:20,width:'50%', backgroundColor:'transparent'}}>
        <Text style={{marginTop:17,paddingBottom:8, fontSize:12, color:'#444444'}}>종류*</Text>
        <PetTypeButton
                        text1='강아지'
                        text2='고양이'
                        />
        </View>
      )
    }

    typeContainer2(){
      return(
        <View style={{paddingLeft:20,width:'50%', backgroundColor:'transparent'}}>
        <Text style={{marginTop:17,paddingBottom:8, fontSize:12, color:'#444444'}}>성별*</Text>
        <PetSexTypeButton
                        text1='남아'
                        text2='여아'
                        />
        </View>
      )
    }

    selectDateChanged(){
      if(this.state.bday == '')
      return(
        <Text style={{marginLeft:14,color:'#9f9f9f'}}>원하는 날짜를 선택해주세요.</Text>
      )
      else{
        return(
          <Text style={{color:'black',marginLeft:14}}>{this.state.bday}</Text>
        )
      }
    }

    selectDate(){
      return(
        <View style={{paddingTop:15, width:'100%', backgroundColor:'white',justifyContent:'center'}}>
          <Text style={{marginLeft:20,color:'#444444'}}>생일</Text>
          <TouchableOpacity style={styles.btn}>
          <View style={{borderRadius:4, marginTop:8, marginLeft:20, width:335, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'center', justifyContent: 'space-between', flexDirection:'row'}}>
            <TextInput style={{marginLeft:14, width:'100%'}}
                      maxLength={6}
                      onChangeText={(petBday) => this.setState({
                        bday:petBday
                      })}
                      keyboardType='web-search'
                      value={this.state.bday}
                      placeholderTextColor='#9f9f9f'
                      keyboardType='number-pad'
                      placeholder="생년월일 6자를 입력해주세요."/>
          </View>
          </TouchableOpacity>
        </View>
      )
    }

  selectPet(){
    return(
      <View style={{paddingTop:17, borderColor: '#e8e8e8', width:'100%', backgroundColor:'white',justifyContent:'center'}}>
        <Text style={{marginLeft:20,paddingBottom:8,color:'#444444',marginBottom:5,marginTop:0}}>품종</Text>
        <View style={{marginLeft:20, width:335, height:62,borderColor:'#e8e8e8',borderWidth:1,borderRadius:4}}>
        <SelectPetType/>
        </View>
      </View>
    )
  }

  typeContainer3(){
    return(
      <View style={{ paddingLeft:20,width:'100%', backgroundColor:'transparent'}}>
      <Text style={{marginTop:17,paddingBottom:8, fontSize:12, color:'#444444'}}>중성화 여부*</Text>
      <PetNeutralStatusButton
                      text1='중성화 완료'
                      text2='중성화 전'
                      />
      </View>
    )
  }

  typeContainer4(){
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

  handleIndexChange = index => {
     this.setState({
       ...this.state,
       selectedTypeIndex: index,

     });
   };
  handleIndexChange1 = index => {
      this.setState({
        ...this.state,
        selectedSexIndex: index,
      });
    };
  handleIndexChange2 = index => {
       this.setState({
         ...this.state,
         selectedType2Index: index,
       });
     };
  handleIndexChange3 = index => {
        this.setState({
          ...this.state,
          selectedType3Index: index,
        });
      };

  toggleExpanded = () => {
          this.setState({ collapsed: !this.state.collapsed })
          }


  petNumber(){
    return(
      <View style={{paddingTop:19,width:'100%', backgroundColor:'white',justifyContent:'center'}}>
        <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>반려동물 등록번호</Text>
          <View style={{borderRadius:4, marginTop:8, marginLeft:20, width:335, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
          <TextInput style={{marginLeft:14, width:300}}
            maxLength={25}
            keyboardType='numeric'
            onChangeText={(petNumber) => this.setState({petNumber:petNumber})}
            placeholderTextColor='#9f9f9f'
            placeholder="반려동물의 등록번호를 입력하세요."/>
          </View>
        </View>

      )
    }

    petFood(){
      return(
        <View style={{paddingTop:20,width:'100%', backgroundColor:'white',justifyContent:'center'}}>
          <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>급여중인 사료이름</Text>
            <View style={{borderRadius:4, marginTop:8, marginLeft:20, width:335, height:50, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start', justifyContent: 'center'}}>
            <TextInput style={{marginLeft:14, width:300}}
              placeholderTextColor='#9f9f9f'
              keyboardType='web-search'
              onChangeText={(petFood) => this.setState({petFood:petFood})}
              placeholder="사료의 브랜드명/제품명"/>
            </View>
          </View>
        )
      }

    petHistory(){
      return(
        <View style={{paddingTop:20,width:'100%', backgroundColor:'white',justifyContent:'center'}}>
          <Text style={{marginLeft:20,color:'#444444',fontSize:12}}>과거 병력/수술이력</Text>
            <View style={{marginTop:11, borderRadius:4, marginTop:8,height:100, marginLeft:20, width:335, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start'}}>
            <TextInput style={{marginLeft:14, width:304, paddingTop:11, height:74}}
              placeholderTextColor='#9f9f9f'
              multiline={true}
              onChangeText={(petHistory) => this.setState({petHistory:petHistory})}
              keyboardType='web-search'
              onFocus={()=> this.setState({paddingBottom:340}, ()=> console.log('paddingBottom'))}
              placeholder="예시)구내염이 심해서 발치 수술을 받았어요."/>
            </View>
          </View>
        )
      }

    petAlergy(){
      return(
          <View style={{paddingTop:20,width:'100%', backgroundColor:'whtie',justifyContent:'center'}}>
              <Text style={{marginTop:11, marginLeft:20,color:'#444444',fontSize:12}}>알러지</Text>
                <View style={{borderRadius:4,height:100, marginTop:8, marginLeft:20, width:335, backgroundColor:'white',borderColor:'#e8e8e8',borderWidth:1,alignItems: 'flex-start'}}>
                <TextInput style={{marginLeft:14, width:304, paddingTop:11, height:74}}
                  placeholderTextColor='#9f9f9f'
                  multiline={true}
                  onChangeText={(petAlergy) => this.setState({petAlergy:petAlergy})}
                  onFocus={()=> this.setState({paddingBottom:340}, ()=> console.log('paddingBottom'))}
                  keyboardType='web-search'
                  placeholder="예시) 알러지가 있어서 알러지용 사료만 먹이고 있어요."/>
                </View>
          </View>
        )
      }

      renderImage = () => {
        var imgSource = this.state.showImage? ArrowDown : ArrowUp
        return (
          <Image
            style={{width:13, height:8,marginRight:32,marginTop:30}}
            source={ imgSource }
          />
        );
      }


  scrollToBottom(){
    if(this.state.collapsed == true){
      this.scrollView.scrollToEnd({ animated: true })
    }
  }

  extraInfoContainer(){
    return(

      <View style={{backgroundColor:'transparent'}}>

        <TouchableOpacity onPress={()=> {this.setState({ showImage: !this.state.showImage }) ,this.toggleExpanded()} }>

          <View style={{width:375,height:72, backgroundColor:'transparent',flexDirection:'row',borderBottomWidth:2, borderColor:'#c7c7cd'}}>

            <View style={{flex:1}}>

                <View style={{width:'80%', height:'50%', backgroundColor:'transparent'}}>
                  <Text style={{fontSize:16,marginTop:12,paddingLeft:20}}>추가 정보입력</Text>
                </View>

                <View style={{width:'90%', height:'50%', backgroundColor:'transparent'}}>
                <Text style={{color:'#444444',fontSize:12,marginTop:5,paddingLeft:20}}>질 높은 서비스 제공을 위해 추가 정보를 입력해주세요.</Text>
                </View>

              </View>

              <View>
              {this.renderImage()}
              </View>

          </View>

          </TouchableOpacity>

          <Collapsible collapsed={!this.state.collapsed}>
                    <View style={{paddingBottom:this.state.paddingBottom}}>
                    {this.petNumber()}
                    {this.petFood()}
                    {this.petHistory()}
                    {this.petAlergy()}
                    </View>
          </Collapsible>

        </View>

    )
  }

  postApi(){
    store.myPet.name = this.state.petName
    store.myPet.birthday = this.state.bday
    store.myPet.imageUrl = store.amazonData[0]

    store.myPet.regNo = this.state.petNumber
    store.myPet.feedBrand = this.state.petFood
    store.myPet.medicalHistory = this.state.petHistory
    store.myPet.allergy = this.state.petAlergy

    store.myPet.memberIdx = store.memberObject.idx

    console.log(toJS(store.myPet), 'store.myPet')
    fetch('https://peppy.ai/peppy/v1.0/pet', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(store.myPet), // data can be `string` or {object}!
  }).then(res => res.json())
      .then((response) => {
        this.props.navigation.goBack();

      })
      .catch((error) => {
        console.error('Errors:', (error))
      })
  }


  render() {

  return(
  <View>
  {this.customHeader()}

<ScrollView style={{marginBottom:100}}>
    <View style={styles.container}>
      <AddPhoto/>

      {this.typeComment()}
      <View style={{ flexDirection: 'row'}}>
      </View>
        <View style={{flexDirection:'row'}}>
        {this.typeContainer()}
        {this.typeContainer2()}
        </View>
      {this.selectDate()}
      {this.selectPet()}
      {this.typeContainer3()}
      {this.typeContainer4()}
      <View style={{width:'100%', height:8, backgroundColor:'#ebebeb'}}></View>
        {this.extraInfoContainer()}

      </View>

      <View style={{width:'100%', height:50, backgroundColor:'transparent'}} />
</ScrollView>
  </View>
    )
  };
}





const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white'
  }
});
