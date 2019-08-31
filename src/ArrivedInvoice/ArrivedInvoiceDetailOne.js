import React, {Component} from 'react';
import { View, TextInput, StyleSheet,Text,FlatList, Image,TouchableOpacity, SafeAreaView, ScrollView,TouchableHighlight} from 'react-native';
import { ListItem } from 'react-native-elements'

const list = [
  {
    name: '***** 동물병원',
    avatar_url: '../Components/Assets/iconMore.png',
    subtitle: '페피 진료/수술 30건 후기 26건',
    price:'250,000',
    reply:10,
    region:'강남구'
  },
  {
    name: '***** 동물병원',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: '페피 진료/수술 10건 후기 5건',
    reply:10,
    price:'350,000',
    region:'서초구'

  },
  {
    name: '***** 동물병원',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: '페피 진료/수술 5건 후기 3건',
    reply:10,
    price:'450,000',
    region:'반포구'

  },
  {
    name: '***** 동물병원',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: '페피 진료/수술 6건 후기 3건',
    reply:10,
    price:'290,000',
    region:'서초구'

  },
]

export default class ArrivedInvoiceDetailOne extends Component {
  constructor(props) {
    super(props)
    this.state = {
      request: this.props.navigation.getParam('request', undefined),
    }
    console.log(this.state.request)
  }

  //커스텀 해더
    customHeader(){
      return(
        <SafeAreaView style={{backgroundColor: '#1ed0a3'}}>

          <View>
            <View style={{marginLeft:0, width:'100%', height:38,justifyContent: 'space-between', flexDirection:'row', backgroundColor:'#1ed0a3', alignItems:'center'}}>
                <TouchableOpacity
                onPress={() => this.props.navigation.goBack()} hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}>
                <View style={{marginLeft:20}}>
                <Image
                          style={{marginLeft:20, width:20, height:17,marginLeft:0 }}
                          source={require('../Components/Assets/white.png')}/>
                </View>
                </TouchableOpacity>
                <Text style={{fontSize:16, color:'white',marginRight:20}}>{this.state.request.petIdx} 의 견적서</Text>

                <Text style={{fontSize:16, marginRight:20, color:'white'}}></Text>
            </View>

            <View style={{height:52, width:'100%', backgroundColor:'transparent', justifyContent:'flex-end', alignItems:'center'}}>
              <Text style={{fontSize:14, color:'white'}}>현재 평균가</Text>
            </View>

            <View style={{height:47, width:'100%', backgroundColor:'transparent', justifyContent:'flex-end', alignItems:'center'}}>
              <Text style={{fontSize:28, color:'white'}}>{this.state.request.avgPrice}</Text>
            </View>

            <View style={{height:65, width:'100%', backgroundColor:'transparent', justifyContent:'center', alignItems:'center',flexDirection:'row'}}>

            <View style={{height:24,width:50,backgroundColor:'white',borderRadius:12.5,margin:2,justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:12}}>강남구</Text>
            </View>

            <View style={{height:24,width:50,backgroundColor:'white',borderRadius:12.5,margin:2,justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:12}}>서초구</Text>
            </View>

            <View style={{height:24,width:50,backgroundColor:'white',borderRadius:12.5,margin:2,justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:12}}>반포구</Text>
            </View>

            </View>
          </View>



        </SafeAreaView>
      )
    }

  statusContainer(){
    return(
      <View style={{padding:10,width:'100%',height:40,backgroundColor:'#16bb92',justifyContent:'space-between',flexDirection:'row'}}>
        <Text style={{fontSize:14,color:'white'}}>중성화수술 견적요청중...</Text>
        <Text style={{fontSize:14,color:'white'}}>21시간 남음</Text>
      </View>
    )
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <TouchableHighlight
            underlayColor="lightgray"
            onPress={() => {
            if(item.invoiceCount != 0)  this.props.navigation.navigate('DetailTwo', {
                request: item,
              })
            else{
              alert('도착한 견적서가 없습니다.')
            }
            console.log(item,'item')
            }}>
    <ListItem
      containerStyle={styles.cardStyle}
      title={
        <View style={{height:24, width:95,backgroundColor:'transparent',flexDirection:'row'}}>
          <Text>****동물병원</Text>
          <View style={{marginLeft:7, height:20, width:58, borderRadius:11.5, backgroundColor:'#00a2f5',  alignItems: 'center',
            justifyContent: 'center', flexDirection:'row'}}>
            <Image
                      style={{width:9, height:11}}
                      source={require('../Components/Assets/iconPlace.png')} />

            <Text style={{marginLeft:4,fontSize:10,color:'white'}}>{item.region}</Text>
          </View>
        </View>
      }
      titleStyle={{fontSize:16, color:'black'}}
      subtitleStyle={{fontSize:13, color:'#8a8a8f'}}
      subtitle={<View>
          <Text style={{fontSize:16}}>{item.subtitle}</Text>
          <Text>진료금액{item.price}원</Text>
          </View>}
      leftAvatar={
        <View>
        <Image
                  style={{width:50, height:50,borderRadius:25 }}
                  source={require('../Components/Assets/imageDoctor1.png')} />
        </View>
      }
      rightAvatar={
      <View>
      <Image
                style={{width:8, height:14 }}
                source={require('../Components/Assets/iconMoreCopy.png')} />
      </View>
      }
    />
    </TouchableHighlight>

  )

  render() {
  return(
    <View style={styles.container}>
      {this.customHeader()}
      {this.statusContainer()}
      <FlatList
           keyExtractor={this.keyExtractor}
           data={list}
           renderItem={this.renderItem}
         />
    </View>
    )
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  cardStyle: {
    borderRadius:4, marginTop:5,marginLeft:10,marginRight:10, backgroundColor:'white',width:352, height:127,borderBottomWidth:1,
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2
  }
});
