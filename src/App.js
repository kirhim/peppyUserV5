console.disableYellowBox = true;

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import {createStackNavigator, createAppContainer, createSwitchNavigator,createBottomTabNavigator,createMaterialTopTabNavigator, MaterialTopTabBar } from 'react-navigation';
import { BottomTabBar } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

//InitializingScreen
import AuthLoadingScreen from './Initializing/AuthLoadingScreen'
//import Kakao from './Initializing/Kakao'
//LoginScreen
import LoginScreen from './Login/LoginScreen'
import RegisterEmailScreen from './Login/RegisterEmailScreen'
import RegisterNickNameScreen from './Login/RegisterNickNameScreen'
import RegisterPasswordScreen from './Login/RegisterPasswordScreen'
import RegisterPhoneScreen from './Login/RegisterPhoneScreen'
import RegisterAgreeScreen from './Login/RegisterAgreeScreen'
import RegisterPhoneCodeScreen from './Login/RegisterPhoneCodeScreen'
//
import FindEmailScreen from './Login/FindEmailScreen'
import FindEmailResultScreen from './Login/FindEmailResultScreen'
//
import MoreInfoMainScreen from './MoreInfo/MoreInfoMainScreen'

import MyPageScreen from './MoreInfo/MyPageScreen'

import BookMarkScreen from './BookMark/BookMarkScreen'

//HostpitalInvoice
import HospitalInvoiceScreen from './HospitalStack/HospitalInvoiceScreen'
import PriceInvoiceScreen from './HospitalStack/PriceInvoiceScreen'
import SelectPetScreen from './HospitalStack/SelectPetScreen/'
import SelectMedicareScreen from './HospitalStack/SelectMedicareScreen'
import SelectPetType from './HospitalStack/SelectPetType'
import MyExample from './Login/MyExample'
import TestingScreen from './HospitalStack/TestingScreen'

//MyPage
import ArrivedInvoiceScreen from './ArrivedInvoice/ArrivedInvoiceScreen'
import ArrivedInvoiceDetailOne from './ArrivedInvoice/ArrivedInvoiceDetailOne'
import ArrivedInvoiceDetailTwo from './ArrivedInvoice/ArrivedInvoiceDetailTwo'
import RealReviewList from './ArrivedInvoice/RealReviewList'
//import RealReviewMain from './ArrivedInvoice/RealReviewMain'

import OnBoardingScreen from './OnBoarding/OnBoardingScreen'

//BookStatus
import BookStatus from './BookedRequests/BookStatus'
import HistoryStatus from './BookedRequests/HistoryStatus'

// //ProfileStatus
import BookMarkTab from './ProfileTopTabNavigator/BookMarkTab'
import MyPetTab from './ProfileTopTabNavigator/MyPetTab'
import MyReviewTab from './ProfileTopTabNavigator/MyReviewTab'
//AddPet
import AddPet from './AddPet/AddPet'
import Alerts from './AddPet/Alerts'
import Settings from './AddPet/Settings'

//RealReview
import RealReviewMain from './RealReview/RealReviewMain'
import {store} from './Mobx/mobxStore'
//search
import Search from './RealReview/Search'
//WriteReview
import WriteReview from './RealReview/WriteReview'
//RealReviewDetail
import RealReviewDetail from './ArrivedInvoice/RealReviewDetail'
//MyPageTabBarHeader
import MyPageTabBarHeader from './Components/MyPageTabBarHeader'
//BookStatusTabBarHeader
import BookStatusTabBarHeader from './Components/BookStatusTabBarHeader'
import CommentReply from './ArrivedInvoice/CommentReply'

import PetSetting from './ProfileTopTabNavigator/PetSetting'





//로그인 관련 화면들 스택 네비게이터
const AuthStack = createStackNavigator({
  Login:LoginScreen,
  Register: RegisterEmailScreen,
  NickName: RegisterNickNameScreen,
  Password: RegisterPasswordScreen,
  VerifyPhone: RegisterPhoneScreen,
  Agree: RegisterAgreeScreen,
  FindEmail: FindEmailScreen,
  FindEmailResult: FindEmailResultScreen,
  RegisterPhoneCode: RegisterPhoneCodeScreen,
})

//bookmark 화면
const MoreInfoStackNavigator = createStackNavigator({
    More:MoreInfoMainScreen,
    BookMark:BookMarkScreen,
})

//HostpitalInvoice 화면
const HospitalStackNavigator = createStackNavigator({
  HospitalMain:HospitalInvoiceScreen,
  screSelectPeten:SelectPetScreen,
  SelectMedicare:SelectMedicareScreen,
  RealReviewMain:RealReviewMain,
},
 {
  defaultNavigationOptions: {
  header: null
  }
})

const BookStatusTabNavigator = createMaterialTopTabNavigator({
  진행중: BookStatus,
  지난내역: HistoryStatus
},
{
  tabBarOptions: {
  style:{
    backgroundColor:'white'
  },
  activeTintColor: 'black',
  inactiveTintColor: '#4a4a4a',
  indicatorStyle: {
    backgroundColor:'#00d0a3'
  }
  },
})

const ProfileTopTabNavigator = createMaterialTopTabNavigator({
  마이펫: MyPetTab,
  북마크: BookMarkTab,
  내리뷰: MyReviewTab
},
{
tabBarOptions: {
style:{
  backgroundColor:'white',
  marginLeft:13,
  width:220
},
tabStyle:{
  width:73,
},
activeTintColor: 'black',
inactiveTintColor: '#4a4a4a',
indicatorStyle: {
  marginLeft:11,
  width:50,
  backgroundColor:'#00d0a3'
  }
 },
})

const ArrivedInvoiceStack = createStackNavigator({
  ArrivedInvoice:ArrivedInvoiceScreen,
  DetailOne:ArrivedInvoiceDetailOne,
  DetailTwo:ArrivedInvoiceDetailTwo,
},
{
defaultNavigationOptions: {
header: null
 }
})

const ProfileStackNavi = createStackNavigator({
  stackAndTab:{
     screen:ProfileTopTabNavigator,
     navigationOptions: ({navigation}) => ({
       header:
       <MyPageTabBarHeader navigation={navigation}/>
       ,
     })
  },
})


const BookStackNavi = createStackNavigator({
  stackAndTab:{
    screen:BookStatusTabNavigator,
    navigationOptions: ({navigation}) => ({
      header: <BookStatusTabBarHeader navigation={navigation}/>
    })
  }
})

const RealReviewStackNavi = createStackNavigator({
  review:RealReviewMain,
  search:Search,
  write:WriteReview,
  },
  {
  defaultNavigationOptions: {
  header: null
  }
})

const ButtomTabNavigator = createBottomTabNavigator(
  {
  Main: {
      screen:ProfileStackNavi,
      navigationOptions : {
      tabBarLabel:'My',
      tabBarIcon:({tintColor}) =>(
        <Image style={{ width: 18, height: 18,tintColor:tintColor }}
               source={require('./Components/Assets/iconMyGrey.png')}
              />
        ),
      }
    },
  Hospital:{
    screen:HospitalStackNavigator,
    navigationOptions : {
    header: null,
    tabBarLabel:'병원견적',
    tabBarIcon:({tintColor}) =>(
      <Image style={{ width: 18, height: 18,tintColor:tintColor }}
             source={require('./Components/Assets/iconListGrey.png')}
            />
      ),
    }
  },
  RealReview:{
    screen:RealReviewStackNavi,
    navigationOptions : {
    tabBarLabel:'리얼리뷰',
      tabBarIcon:({tintColor}) =>(
      <Image style={{ width: 18, height: 18,tintColor:tintColor }}
             source={require('./Components/Assets/iconRealreviewGrey.png')}
            />
      ),
    }
   },
  MyProfile:{
     screen:MoreInfoMainScreen,
     navigationOptions : {
     tabBarLabel:'더보기',
     tabBarIcon:({tintColor}) =>(
       <Image style={{ width: 18, height: 18, tintColor:tintColor }}
              source={require('./Components/Assets/iconMoreMint.png')}
             />
       ),
     }
   },

  },
  {
  tabBarOptions: {
  activeTintColor: '#16bb92',
  },
  shifting:true,
},
{
    initialRouteName: 'Main',
  }
)

const StartSwitchNavigator = createStackNavigator({
  //Kakao:Kakao,

  AuthLoading:AuthLoadingScreen,
  ButtomTab: ButtomTabNavigator,
  Auth: AuthStack,
  OnBoarding: OnBoardingScreen,
  book: BookStackNavi,
  alerts:Settings,
  write:WriteReview,
  HospitalMain:HospitalInvoiceScreen,
  addPet:AddPet,
  alerts:Alerts,
  settings:Settings,
  PriceInvoice:PriceInvoiceScreen,
  ArrivedInvoice:ArrivedInvoiceStack,
  RealReviewDetail:RealReviewDetail,
  SelectPet:SelectPetScreen,
  Login:LoginScreen,
  booked:BookStackNavi,
  RealReviewStackNavi:RealReviewStackNavi,
  PetSetting:PetSetting,
  profileMain:ProfileStackNavi,
  ProfileTopTabNavigator:ProfileTopTabNavigator
 },
 {
  defaultNavigationOptions: {
  header: null
 }
})

const CombinedNavigator = createAppContainer(StartSwitchNavigator);

export default class App extends Component {
  render(){
    return(
        <CombinedNavigator/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
