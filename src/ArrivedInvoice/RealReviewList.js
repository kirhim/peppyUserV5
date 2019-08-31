import React, {Component} from 'react';
import { View, TextInput, StyleSheet,Text, Image,TouchableOpacity,SafeAreaView, FlatList,TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements'


const list = [
  {
    name: '코코',
    avatar_url: '../Components/Assets/oval.png',
    subtitle: '12건의 견적서 도착 21시간 남음',
    time:'2019-07-02',
    price:'350,000',
    reply:'2건의 견적서 도착 21시간 남음'
  },
  {
    name: '쭈리',
    subtitle: '23건의 견적서 도착',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    reply:'3건의 견적서 도착 5시간 남음',
    time:'2019-06-21',
    price:'290,000',
  },
]


export default class RealReview extends Component {
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
          <Text style={{fontSize:16, color:'black'}}>리얼리뷰</Text>
          <Text style={{fontSize:16, marginRight:20, color:'white'}}></Text>
        </View>
      )
    }

    statusContainer(){
      return(
        <View style={{padding:10,width:'100%',height:40,backgroundColor:'#1ed0a3',justifyContent:'flex-start',flexDirection:'row',alignItems:'center'}}>
          <Image
                    style={{marginLeft:10, width:17, height:17}}
                    source={require('../Components/Assets/iconInfo.png')}/>
          <Text style={{marginLeft:7, fontSize:12,color:'white'}}>리얼리뷰는 실제 병원을 방문하신 고객님들의 생생한 후기입니다.</Text>
        </View>
      )
    }

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
        containerStyle={styles.cardStyle}
        titleStyle={{fontSize:16, color:'black'}}
        subtitleStyle={{fontSize:13, color:'#8a8a8f'}}
        subtitle={<View>
          <View style={{marginTop:16, marginRight:14, marginLeft:20, backgroundColor:'transparent', width:272, height:24}}>
            <Text style={{fontSize:16}}>노견 토리의 슬개골 수술 후기</Text>
          </View>

          <View style={{marginTop:4, marginRight:14, marginLeft:20, backgroundColor:'transparent', width:272, height:37}}>
            <Text style={{fontSize:12, color:'#8a8a8e'}}>정당은 법률이 정하는 바에 의하여 국가의 보호를 받으며, 국가는 법률이 정하는 바에 의하여 정당운영에 필요</Text>
          </View>

          <View style={{marginTop:8, marginRight:14, marginLeft:20, backgroundColor:'transparent', width:272, height:20}}>
            <Text style={{fontSize:12, color:'#8a8a8e'}}>강형욱 2019.03.05 댓글 5</Text>
          </View>
            </View>}
        leftAvatar={
          <View>
          <Image
                    style={{width:50, height:50 }}
                    source={require('../Components/Assets/iconNonimage.png')} />
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
    {this.statusContainer()}
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
    backgroundColor: 'white',
  },
  cardStyle: {
    marginRight:10, backgroundColor:'white',width:'100%', height:127,borderBottomWidth:1,
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2
  }
});
