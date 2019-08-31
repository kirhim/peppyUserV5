import React, {Component} from 'react';
import { View, TextInput, StyleSheet,Text, Image, Button , ListView, TouchableHighlight, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper'
import { ListItem } from 'react-native-elements'
import Collapsible from 'react-native-collapsible';

export default class OnBoardingScreen extends Component {
  constructor(props) {
    super(props)

    this.state= {
      slide: 0,
      showsPagination:true
    }
  }


lastOnboardingView = () => {
  if(this.state.slide == 2){
  return(

      <View style={{marginTop:-50,justifyContent:'center',width:'100%', height:60, backgroundColor:'#1ed0a3', flexDirection:'row',  justifyContent:'center',
        alignItems:'center'}} >
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ButtomTab')} hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}>
          <View style={{width:375, height:60, justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:20, color:'white'}}>시작하기</Text>
          </View>
        </TouchableOpacity>

      </View>

  )
  }
}

  render() {

 console.log(this.state.slide, 'slide')
  return(
<View style={{flex:1}}>
<Swiper style={styles.wrapper}
buttonColor={'#1ed0a3'}
loop={false}
index={this.state.slide}
showsPagination={this.state.showsPagination}
onIndexChanged={(index)=> this.setState({slide:index})}
activeDot={<View style={{backgroundColor: '#1ed0a3', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>

  <View style={styles.slide1}>
  <Image
            style={{ width:297, height:270 }}
            source={require('../Components/Assets/imageOn1.png')}/>
  <View style={{backgroundColor:'transparent',width:'100%', height:250,justifyContent: 'center', alignItems: 'center'}}>
    <View style={{backgroundColor:'transparent',width:212,height:60,justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize:20}}>   쉽고 빠르게 우리 아이{"\n"}병원비 확인 할 수 없을까?</Text>
    </View>
      <View style={{ backgroundColor:'transparent',width:257 ,height:60,justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize:14}}> 전화로는 안 알려주고, 여기저기 방문하기에는{"\n"}  시간이 없고, 한 곳만 신뢰하자니 불안하고.</Text>
      </View>
    </View>
  </View>

  <View style={styles.slide2}>
  <View style={{width:'100%', height:310, backgroundColor:'transparent', justifyContent:'space-around',justifyContent:'center',alignItems:'flex-end'}}>
  <Image
            style={{ width:210, height:128,marginRight:36}}
            source={require('../Components/Assets/imageOn22.png')}/>
  <Image
            style={{ width:332, height:180,marginRight:21 }}
            source={require('../Components/Assets/onBoardingImage2.png')}/>
  </View>
  <View style={{backgroundColor:'transparent',width:'100%', height:250,justifyContent: 'center', alignItems: 'center'}}>
    <View style={{backgroundColor:'transparent',width:212,height:60,justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize:20}}>   집에서 간편하게{"\n"}병원비 견적을 받아보세요</Text>
    </View>
      <View style={{ backgroundColor:'transparent',width:257 ,height:60,justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize:14}}> 거품을 뺀 합리적인 가격 비교, 믿을만한 회원{"\n"}  리뷰로 안심하고 우리 아이 건강을 지켜요.</Text>
      </View>
    </View>
  </View>

  <View style={styles.slide3}>
  <Image
            style={{ width:279, height:300 }}
            source={require('../Components/Assets/imageOn3.png')}/>
  <View style={{backgroundColor:'transparent',width:'100%', height:250,justifyContent: 'center', alignItems: 'center'}}>
    <View style={{backgroundColor:'transparent',width:212,height:60,justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize:20}}>합리적인 동물병원 견적{"\n"}비교 지금 시작해보세요.</Text>
    </View>
      <View style={{ backgroundColor:'transparent',width:257 ,height:60,justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize:14}}>    원하는 견적을 요청하면 24시간 안에{"\n"}여러 병원의 견적을 비교하여 보내드릴게요.</Text>
      </View>
    </View>
  </View>


</Swiper>
{this.lastOnboardingView()}


</View>


    )
  };
}
const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    marginTop:20,
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#f4f4f4'
  },
  slide2: {
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#f4f4f4'
  },
  slide3: {
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'transparent'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});
