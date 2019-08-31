import React, {Component} from 'react';
import { Button, View, TextInput, StyleSheet,Text, Image, TouchableOpacity,SafeAreaView, Dimensions,Platform} from 'react-native';
import {store} from '../Mobx/mobxStore'
import { toJS, observable } from 'mobx';

const {
  height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 30) : 0;
const HeaderHeight = Platform.OS === 'ios' ? (IS_IPHONE_X ? 205 : 170) : 0;

export default class MyPageTabBarHeader extends Component {
  constructor(props) {
    super(props)
    this.state ={
      userName: '',
      data:[]
    }
  }

  componentWillMount(){
     //const memberIdx = store.PriceScreenIdx
     //console.log(memberIdx, 'idx')
     this.props.navigation.addListener ('willFocus', () =>{
     this.makeRemoteRequest()
     this.state.data
    })
  }

  makeRemoteRequest = () => {
    fetch('https://peppy.ai/peppy/v1.0/member/' + store.memberObject.idx, )
        .then((response) => response.json())
        .then((response) => {
          //console.log(response.data,'respsssssssonse')
          const data = response.data[0]
          this.setState({data:data})
        })
        .catch((error) => {
          console.error(error)
        })
  }

  profileImageRender(){
    if(this.state.data.profileImageUrl == null){
      return(
          <Image
                       style={{width:70, height:70,marginRight:23 }}
                       source={require('../Components/Assets/iconProfile.png')}/>
      )
    }
    else if(this.state.data.profileImageUrl != null){
      return(
          <Image
                    style={{width:70, height:70,marginRight:23,borderRadius:35 }}
                    source={{uri: this.state.data.profileImageUrl}}/>
      )
    }
  }

  render() {

  return(
<View style={styles.container}>

   <View style={{marginTop:STATUS_BAR_HEIGHT+10,width:'100%',height:HeaderHeight,backgroundColor:'white'}}>

        <View style={{width:'100%',flexDirection:'row',justifyContent:'flex-end', alignItems:'center', backgroundColor:'transparent'}}>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('settings')} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>

            <Image
                      style={{width:23, height:23, marginRight:20}}
                      source={require('../Components/Assets/iconEdit.png')} />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.props.navigation.navigate('alerts')} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                      <Image
                      style={{width:23, height:23,marginRight:23}}
                                source={require('../Components/Assets/iconBell.png')} />
          </TouchableOpacity>
        </View>

      <View style={{ width:'100%', backgroundColor:'transparent',flexDirection:'row',paddingTop:'10%'}}>

        <View style={{paddingLeft:28, width:'50%', height:70,backgroundColor:'white', alignItems: 'flex-start',justifyContent: 'center'}}>
          <Text style={{fontSize:24}}>
          {this.state.data.name}님,
          </Text>

          <Text style={{fontSize:24}}>
          안녕하세요
          </Text>


        </View>

        <View style={{width:'50%', height:70,backgroundColor:'transparent',alignItems: 'flex-end',justifyContent: 'center'}}>
          {this.profileImageRender()}
        </View>
      </View>

  </View>
  </View>
    )
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});
