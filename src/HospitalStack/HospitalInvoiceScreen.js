import React, {Component} from 'react';
import { View, TextInput, StyleSheet,Text, Image, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';

export default class HospitalInvoiceScreen extends Component {

  constructor(props) {
    super(props)
  }

    topContainer(){
      return(
         <View style={{marginLeft:36, height:'8.3%', width:'100%', backgroundColor:'transparent', justifyContent:'center',alignItems:'flex-start'}}>
          <Text style={{fontSize:22}}>간단하게 수술 및 진료</Text>
          <Text style={{fontSize:22}}>견적을 비교해요</Text>
        </View>
      )
    }

    addPetButtonContainer(){
      return(
      <View style={{height:'100%'}}>

      <View style={{height:'15%'}}/>
      {this.topContainer()}

      <View style={{height:'5%'}}/>


      <View style={styles.buttonStyle2}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('PriceInvoice')}>
          <View style={{width:240,height:'100%', backgroundColor:'transparent',alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize:16,color:'white'}}>견적요청하기</Text>
          </View>
        </TouchableOpacity>
      </View>


        <View style={{height:'1.5%'}}/>

        <View style={styles.buttonStyle}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('ArrivedInvoice')}>
            <View style={{width:240,height:'100%', backgroundColor:'transparent',alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize:16,color:'black'}}>도착 견적 보기</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{height:'1.5%'}}/>

        <View style={styles.buttonStyle}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('booked')}>
            <View style={{width:240,height:'100%', backgroundColor:'transparent',alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize:16,color:'black'}}>예약내역</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{height:'2.7%'}}/>

          <ImageBackground source={require('../Components/Assets/backgroundshape.png')} style={{width: '100%', height: 332, alignItems:'flex-end', justifyContent:'center'}}>
            <Image
                 style={{width:339, height:214}}
                 source={require('../Components/Assets/mainBackGroundImage.png')} />
          </ImageBackground>

      </View>
      )
    }


  render() {
  return(

    <View style={styles.container}>

        {this.addPetButtonContainer()}

    </View>
    )
  };
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fafafa',
  },
  buttonStyle:{
  marginLeft:38, borderRadius:4, width:240, height:'7%', backgroundColor:'white',justifyContent: 'center', alignItems:'center',flexDirection:'row',
  shadowOffset: {
  width: 0,
  height: 1,
  },
  shadowOpacity: 0.20,
  shadowRadius: 1.41,
  elevation: 2
  },
  buttonStyle2:{
  marginLeft:38, borderRadius:4, width:240, height:'7%', backgroundColor:'#1ed0a3',justifyContent: 'center', alignItems:'center',flexDirection:'row',
  shadowOffset: {
  width: 0,
  height: 1,
  },
  shadowOpacity: 0.20,
  shadowRadius: 1.41,
  elevation: 2
  }
});
