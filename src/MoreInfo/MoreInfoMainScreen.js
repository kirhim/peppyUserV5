import React, {Component} from 'react';
import { View, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback,Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';

const ListContainerStyle = ({text, ...rest}) => (

<TouchableOpacity
                {...rest}>
  <View style={styles.listStyle}>
    <Text style={{marginLeft:20}}>{text}</Text>
  </View>
</TouchableOpacity>
)

export default class MoreInfoMainScreen extends Component {
  static navigationOptions = {
  header: null
};
  constructor(props) {
    super(props)
  }

//커스텀 해더 특별한 기능 없음
  customHeader(){
    return(
      <View style={{height:50, width:'100%',backgroundColor:'white',alignItems: 'center', justifyContent: 'center', borderBottomWidth:1, borderColor:'#dddddd'}}>
        <Text style={{fontSize:16}}>더보기</Text>
      </View>
    )
  }

//프로필 컨테이너
  // profileContainer(){
  //   return(
  //     <View style={{width:375, height:155,backgroundColor:'#f4f4f4', flexDirection:'row',alignItems: 'center', justifyContent: 'flex-start',borderTopWidth:1, borderBottomWidth:0.5,borderColor:'#dddddd',opacity:50}}>
  //
  //       <View style={{width:120, height:'100%', backgroundColor:'#f4f4f4',alignItems:'flex-end', justifyContent: 'center'}}>
  //         <View style={{width:80, height:80, backgroundColor:'transparent', borderRadius:40}}>
  //         <Image
  //                   style={{width:80, height:79 }}
  //                   source={require('../Components/Assets/iconProfile.png')} />
  //         </View>
  //       </View>
  //
  //       <View style={{width:255, height:'100%', backgroundColor:'#f4f4f4',alignItems: 'flex-start',justifyContent:'center',paddingLeft:26 }}>
  //
  //         <View style={{width:'100%', height:20, backgroundColor:'transparent'}}>
  //           <Text style={{color:'#4a4a4a'}}>쭈리언니</Text>
  //         </View>
  //
  //         <View style={{width:'100%', height:20, backgroundColor:'transparent'}}>
  //           <Text style={{color:'#4a4a4a'}}>kirhim@gmail.com</Text>
  //         </View>
  //
  //         <View style={{width:107, height:34, backgroundColor:'white',marginTop:10,alignItems:'center',justifyContent:'center',borderRadius:19,borderWidth:1,borderColor:'#c7cbcc'}}>
  //           <TouchableOpacity onPress={()=>   this.props.navigation.navigate('EditMyProfile')}>
  //             <Text style={{color:'#4a4a4a'}}>프로필 수정</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //
  //     </View>
  //   )
  // }

  listContainer(){
    return(
      <View style={{height:508, width:'100%',backgroundColor:'white'}}>


        <ListContainerStyle
                            text='공지사항'/>
        <ListContainerStyle
                            text='이벤트'/>
        <ListContainerStyle
                            text='설정'/>
        <ListContainerStyle
                            text='1:1 문의'/>
      </View>
    )
  }

  render() {

  return(
  <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>

    {this.customHeader()}
    {this.listContainer()}

    </View>
  </SafeAreaView>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  listStyle:{
    height:60, width:'100%',borderColor:'#e4e4e4',borderBottomWidth:0.5, justifyContent:'center'
  }
});
