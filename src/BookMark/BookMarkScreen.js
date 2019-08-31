import React, {Component} from 'react';
import { View, TextInput, StyleSheet,Text, Image, SafeAreaView, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import {store} from '../Mobx/mobxStore'

const list = [
  {
    name: '노견 토리의 슬개골 탈구 수술 후기',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: '강형욱 2019.03.05',
    reply:10
  },
  {
    name: '8개월 애기 중성화 했어요',
    subtitle: '강형욱 2019.03.05',
    reply:5
  },
  {
    name: '여의도 동물병원 후기',
    subtitle: '강형욱 2019.03.05',
    reply:3
  },
]

export default class BookMarkScreen extends Component {
  constructor(props) {
    super(props)
  }

  //커스텀 해더 특별한 기능 없음
    customHeader(){
      return(
        <View style={{height:50, width:'100%',backgroundColor:'white',alignItems: 'center', justifyContent: 'space-between', flexDirection:'row'}}>
        <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}>
          <Image
                    style={{width:20, height:17,marginLeft:20 }}
                    source={require('../Components/Assets/black.png')}/>
        </TouchableOpacity>
          <Text style={{fontSize:16, color:'black'}}>북마크</Text>
          <Text style={{fontSize:16, marginRight:20, color:'black'}}>저장</Text>

        </View>

      )
    }

keyExtractor = (item, index) => index.toString()

renderItem = ({ item }) => (
  <TouchableHighlight
          underlayColor="lightgray"
          onPress={() => {
          if(item.invoiceCount != 0)  this.props.navigation.navigate('RealReviewMain', {
              request: item,
            })
          else{
            alert('도착한 견적서가 없습니다.')
          }
          console.log(item,'item')
          }}>
  <ListItem
    containerStyle={{borderTopWidth:1, borderColor:'#dddddd',height:83}}
    title={item.name}
    titleStyle={{fontSize:16, color:'black'}}
    subtitleStyle={{fontSize:13, color:'#8a8a8f'}}
    subtitle={item.subtitle}
    leftAvatar={{
      source: item.avatar_url && { uri: item.avatar_url },
      width: 50,
      height: 50,
      borderRadius: 0,
    }}
    rightAvatar={
    <View style={{
      width: 36,
      height: 36,
      backgroundColor: 'transparent',
      borderRadius:20,
      borderWidth:1,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor:'#979797'}}>
      <Text>{item.reply[0]}</Text>
    </View>
    }
  />
  </TouchableHighlight>

)


  render() {
  return(
    <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
      <View style={styles.container}>
          {this.customHeader()}
          <FlatList
               keyExtractor={this.keyExtractor}
               data={list}
               renderItem={this.renderItem}
             />
      </View>
    </SafeAreaView>
    )
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  }
});
