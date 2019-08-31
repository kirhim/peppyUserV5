import React, {Component} from 'react';
import { View, TextInput, StyleSheet,Text, Image,SafeAreaView, TouchableOpacity} from 'react-native';

export default class Search extends Component {
  static navigationOptions = {
  header: null
};
  constructor(props) {
    super(props)
  }

  searchHeader(){
    return(
      <View style={{height:64,width:375, backgroundColor:'#fafafa',flexDirection:'row', borderBottomWidth:0.5, borderColor:'#e4e4e4'}}>
        <View style={{marginLeft:20, width:290, height:40, borderColor:'#c7c7cd', borderWidth:0.5, justifyContent:'center'}}>
        <TextInput
                  style={{paddingLeft:20,width:'100%'}}
                  clearButtonMode='always'
                  placeholder='검색어 입력'
                />
        </View>
      <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
      <Text style={{marginTop:12, marginLeft:18,fontSize:16, color:'#16bb92'}}>취소</Text>
      </TouchableOpacity>
      </View>
    )
  }

  popularSearch(){
    return(
      <View style={{height:164, width:375, backgroundColor:'#fafafa'}}>
        <View style={{width:'100%', height:50}}>
          <Text style={{marginTop:20,marginLeft:20, fontSize:14, color:'#4a4a4a'}}>인기 검색어</Text>
        </View>

        <View style={{backgroundColor:'transparent',marginLeft:15 , flexDirection:'row', width:280, marginRight:20,alignItems:'center',flexWrap: "wrap", marginRight:50}}>

          <View style={{marginTop:10,marginLeft:8,borderRadius:18, backgroundColor:'white',alignItems:'center', height:36,justifyContent:'center',borderWidth:0.5, borderColor:'#c7c7cd'}}>
            <Text style={{fontSize:14,color:'#9f9f9f',padding:12, paddingBottom:8}}>방광염</Text>
          </View>

          <View style={{marginTop:10,marginLeft:8,borderRadius:18, backgroundColor:'white', height:36,justifyContent:'center',borderWidth:0.5, borderColor:'#c7c7cd'}}>
          <Text style={{fontSize:14,color:'#9f9f9f',padding:12, paddingBottom:8}}>구토</Text>
          </View>

          <View style={{marginTop:10,marginLeft:8,borderRadius:18, backgroundColor:'white', height:36,justifyContent:'center',borderWidth:0.5, borderColor:'#c7c7cd'}}>
          <Text style={{fontSize:14,color:'#9f9f9f',padding:12, paddingBottom:8}}>결막염</Text>
          </View>

          <View style={{marginTop:10,marginLeft:8,borderRadius:18, backgroundColor:'white', height:36,justifyContent:'center',borderWidth:0.5, borderColor:'#c7c7cd'}}>
          <Text style={{fontSize:14,color:'#9f9f9f',padding:12, paddingBottom:8}}>기침</Text>
          </View>

          <View style={{marginTop:10,marginLeft:8,borderRadius:18, backgroundColor:'white', height:36,justifyContent:'center',borderWidth:0.5, borderColor:'#c7c7cd'}}>
          <Text style={{fontSize:14,color:'#9f9f9f',padding:12, paddingBottom:8}}>심장사상충</Text>
          </View>

          <View style={{marginTop:10,marginLeft:8,borderRadius:18, backgroundColor:'white', height:36,justifyContent:'center',borderWidth:0.5, borderColor:'#c7c7cd'}}>
          <Text style={{fontSize:14,color:'#9f9f9f',padding:12, paddingBottom:8}}>피부질환</Text>
          </View>

        </View>
      </View>
    )
  }

  recentSearch(){
    return(
      <View style={{borderWidth:0.5, borderColor:'#e4e4e4',height:'100%',width:'100%', backgroundColor:'#fafafa'}}>
      <Text style={{fontWeight:'bold',marginTop:22, marginLeft:16,fontSize:14, color:'#4a4a4a'}}>최근 검색어</Text>

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <Text style={{marginTop:22, marginLeft:16,fontSize:14, color:'#4a4a4a'}}>노견 사료 추천</Text>
          <Image
                    style={{ marginRight:20,marginTop:20,width:10, height:10 }}
                    source={require('../Components/Assets/iconX.png')} />
        </View>

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <Text style={{marginRight:20,marginTop:22, marginLeft:16,fontSize:14, color:'#4a4a4a'}}>슬개골 탈구 수술</Text>
        <Image
                  style={{marginRight:20, marginTop:20,width:10, height:10 }}
                  source={require('../Components/Assets/iconX.png')} />
        </View>

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <Text style={{marginRight:20,marginTop:22, marginLeft:16,fontSize:14, color:'#4a4a4a'}}>강아지 장난감 추천</Text>
        <Image
                  style={{marginRight:20, marginTop:20,width:10, height:10 }}
                  source={require('../Components/Assets/iconX.png')} />
        </View>
      </View>
    )
  }

  render() {
  return(
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        {this.searchHeader()}
        {this.popularSearch()}
        {this.recentSearch()}
      </View>
    </SafeAreaView>
    )
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  }
});
