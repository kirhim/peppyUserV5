import React, {Component} from 'react';
import {Dimensions,Platform, View, TextInput, StyleSheet,Text, Image ,TouchableOpacity,SafeAreaView} from 'react-native';

const AlertStyle = ({dotColor, text, status,comment}) => (
  <View style={{width:'100%', height:82, backgroundColor:'white', borderBottomWidth:0.5, borderColor:'#e4e4e4'}}>
    <View style={{paddingLeft:16,width:'100%', height:40, backgroundColor:'white', alignItems:'center',flexDirection:'row'}}>
    <View style={{width:10,height:10, backgroundColor:dotColor,borderRadius:5}}></View>
    <Text style={{paddingLeft:6,fontSize:16}}>{text}</Text>
    <Text style={{paddingLeft:200, color:'#8a8a8f'}}>{status}</Text>
    </View>
    <Text style={{paddingLeft:32, fontSize:13, color:'#8a8a8f'}}>{comment}</Text>
  </View>
)

const {
  height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 30) : 0;
const HeaderHeight = Platform.OS === 'ios' ? (IS_IPHONE_X ? 205 : 170) : 0;


export default class Alerts extends Component {
  constructor(props) {
    super(props)
  }

  //커스텀 해더 특별한 기능 없음
    customHeader(){
      return(
        <View style={{paddingTop:STATUS_BAR_HEIGHT, height:90, width:'100%',backgroundColor:'white',alignItems: 'center', justifyContent: 'space-between', flexDirection:'row',borderBottomWidth:1, borderColor:'#979797'}}>
          <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <Image
                      style={{width:20, height:17,marginLeft:20 }}
                      source={require('../Components/Assets/black.png')} />
          </TouchableOpacity>
          <Text style={{fontSize:16, color:'black'}}>알림</Text>
          <Text style={{fontSize:16, marginRight:20, color:'white'}}></Text>

        </View>
      )
    }

  render() {
  return(
    <View style={styles.container}>
    {this.customHeader()}
      <AlertStyle
        dotColor='#1ed0a3'
        text='새 견적서 도착!'
        comment='서초구 ****동물병원에서 견적을 보냈습니다.'
        status='방금'/>
        <AlertStyle
          dotColor='#1ed0a3'
          text='새 견적서 도착!'
          comment='서초구 ****동물병원에서 견적을 보냈습니다.'
          status='방금'/>
          <AlertStyle
            dotColor='#00a2f5'
            text='12건의 견적이 도착했습니다.'
            comment='12건의 견적이 도착했습니다.'
            status='6월 23일'/>
            <AlertStyle
              dotColor='#00a2f5'
              text='강남구 ****동물병원에서 견적을 보냈습니다.'
              comment='강남구 ****동물병원에서 견적을 보냈습니다.'
              status='읽음'/>
      </View>
    )
  };
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  }
});
