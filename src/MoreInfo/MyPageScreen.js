import React, {Component} from 'react';
import { View, TextInput, StyleSheet,Text, Image, SafeAreaView } from 'react-native';

export default class TestingScreen extends Component {
  constructor(props) {
    super(props)
  }

  //커스텀 해더 특별한 기능 없음
    customHeader(){
      return(
        <View style={{height:50, width:'100%',backgroundColor:'#1ed0a3',alignItems: 'center', justifyContent: 'flex-end', flexDirection:'row'}}>
          <Image
                    style={{width:22, height:23,marginRight:21 }}
                    source={require('../Components/Assets/iconBell.png')} />
        </View>
      )
    }

    topContainer(){
      return(
        <View style={{height:117, width:'100%', backgroundColor:'transparent',flexDirection:'row'}}>

          <View style={{width:'50%', height:'100%',backgroundColor:'red', alignItems: 'center',justifyContent: 'center'}}>
            <Text style={{fontSize:24}}>
              쭈리언니님,
            </Text>

            <Text style={{fontSize:24}}>
            안녕하세요
            </Text>
          </View>

          <View style={{width:'50%', height:'100%',backgroundColor:'blue',alignItems: 'flex-end',justifyContent: 'center'}}>
          <Image
                    style={{width:68, height:68,marginRight:23 }}
                    source={require('../Components/Assets/iconProfile.png')} />
          </View>
        </View>
      )
    }

    addPetButtonContainer(){
      return(
      <View>
        <View style={{height:20}}/>

        <View style={{width:350, height:62, backgroundColor:'white',justifyContent: 'center', alignItems:'center',flexDirection:'row'}}>

          <Text style={{fontSize:16,color:'#4a4a4a'}}>반려동물추가</Text>
        </View>
      </View>
      )
    }

  render() {
  return(
  <SafeAreaView style={{flex:1, backgroundColor:'blue'}}>

    <View style={styles.container}>
        {this.customHeader()}
        {this.topContainer()}
        <View style={{width:'100%', height:20, backgroundColor:'green'}}>
        <Text style={{marginLeft:26, fontSize:14,color:'#4a4a4a'}}>반려동물 정보를 등록해주세요.</Text>
        </View>

        {this.addPetButtonContainer()}

    </View>

  </SafeAreaView>

    )
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems:'center',
    backgroundColor: '#f4f4f4',
  }
});
