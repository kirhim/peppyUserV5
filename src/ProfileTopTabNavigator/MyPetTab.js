import React, {Component} from 'react';
import { Dimensions, Platform, View, TextInput, StyleSheet,Text, Image,FlatList, TouchableOpacity,ScrollView,TouchableHighlight, Button} from 'react-native';
import {store} from '../Mobx/mobxStore'
import {observer} from "mobx-react";
import { toJS, observable } from 'mobx';

import { CheckBox } from 'native-base';
import { ListItem } from 'react-native-elements'


import { AsyncTrunk } from 'mobx-sync'
import { AsyncStorage } from "react-native"

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').Height


const {
  height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 55 : 40) : 0;

const HeaderHeight = Platform.OS === 'ios' ? (IS_IPHONE_X ? 205 : 170) : 0;


const trunk = new AsyncTrunk(store, {
  storage: AsyncStorage,
  storageKey: '__persist_mobx_stores__',
});

export default class MyPetTab extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pet:'',
      checked: null,
      petList: []
    }
  }

componentWillMount(){
  const priceScreenIdx = store.memberObject.idx
  store.PriceScreenIdx = priceScreenIdx
  //console.log(store.PriceScreenIdx, 'PriceScreenIdx')

  this.props.navigation.addListener ('willFocus', () =>{
    // do whatever you want to do when focused
    this.makeRemoteRequest()
  });
}

makeRemoteRequest = () => {
  store.myPetList = undefined;

  fetch('https://peppy.ai/peppy/v1.0/pet?memberIdx=' + store.memberObject.idx)
      .then((response) => response.json())
      .then((response) => {
        //console.log(response.data,'response')
        const list = response.data
        store.myPetList = list
        this.setState({petList:list});
        //console.log(store.myPetList, 'mypetlist')

      })
      .catch((error) => {
        console.error(error)
      })
}

keyExtractor = (item, index) => index.toString()

renderItem = ({ item }) => (
  <TouchableHighlight
          underlayColor="lightgray"
          onPress={() =>{
        console.log(item,'item'),
        this.props.navigation.navigate('PetSetting', {request: item})}}>
  <ListItem
    containerStyle={{width:352, height:100, marginTop:0, margin:10, marginBottom:6, backgroundColor:'white', borderRadius:4}}
    title={<View><Text style={{fontWeight:'bold'}}>{item.name}</Text></View>}
    titleStyle={{fontSize:16, color:'black'}}
    subtitleStyle={{fontSize:13, color:'#8a8a8f'}}
    subtitle={<View>
        <Text>언니랑 산책가면 기분이 좋아!{"\n"}자주 산책시켜줘 :3</Text>
        </View>}
  leftAvatar={
    <View>
    <Image
              source={{ uri: item.imageUrl }}
              style={{width:58, height:58, borderRadius:29 }} />
    </View>
  }


  rightAvatar={
      <View>
      <Image
                style={{width:8, height:14 }}
                source={require('../Components/Assets/iconMoreCopy.png')} />
      </View>
    }
    >

    </ListItem>
    </TouchableHighlight>

)


  mainViewContainer (){
    if(store.myPetList != undefined){
      return(
        <View style={{width:'100%', height:350, backgroundColor:'#f4f4f4',  justifyContent: 'space-between', alignItems:'center'}}>
          <View style={{marginTop:10}}>
            <FlatList
                 keyExtractor={this.keyExtractor}
                 renderItem={this.renderItem}
                 extraData={this.state}
                 data={this.state.petList}
               />
          </View>
          <View style={{marginLeft:295, marginRight:30, width:50, height:50, borderRadius:25, backgroundColor:'transparent', justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('addPet'), console.log(deviceWidth,deviceHeight)}} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <Image
                      style={{ width:58,height:58}}
                      source={require('../Components/Assets/iconAddpet.png')}/>
          </TouchableOpacity>
          </View>

        </View>
      )
    }
    else {
      return(
      <View style={{marginTop:STATUS_BAR_HEIGHT, width:'100%',height:'100%', alignItems:'flex-end', justifyContent:'space-around', backgroundColor:'transparent'}}>



      <View style={{width:'100%', backgroundColor:'transparent'}}>
        <Image
                  style={{ width:195, height:120,marginLeft:90 }}
                  source={require('../Components/Assets/imageNone.png')}/>

          <Text style={{fontSize:16,paddingTop:18,paddingLeft:93}}>아직 반려동물 정보가 없어요!</Text>
          <Text style={{paddingTop:8, paddingLeft:114,fontSize:14, color:'#4a4a4a'}}>병원견적을 받아보기 위해{"\n"}새롭게 등록해주세요.</Text>
      </View>
      <View style={{ paddingTop:STATUS_BAR_HEIGHT, marginLeft:295, marginRight:30, justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('addPet'), console.log(deviceWidth,deviceHeight)}} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
        <Image
                  style={{ width:58,height:58}}
                  source={require('../Components/Assets/iconAddpet.png')}/>
      </TouchableOpacity>
      </View>
      </View>
     )
    }
  }

  logOut(){
        store.memberObject = undefined
        trunk.updateStore(store)
        console.log(store.memberObject,'sss')
        this.props.navigation.navigate('Login')
      }

  render() {


  return(
    <View style={styles.container}>
      <ScrollView>
        {this.mainViewContainer()}
      </ScrollView>
    </View>
    )
  };
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  }
});
