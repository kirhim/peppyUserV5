import React, {Component} from 'react';
import { View, TextInput, StyleSheet,Text,TouchableOpacity,TouchableHighlight, Image,SafeAreaView, FlatList} from 'react-native';
import { ListItem } from 'react-native-elements'

const list = [
  {
    name: '그린펫동물병원',
    avatar_url: '../Components/Assets/oval.png',
    subtitle: '12건의 견적서 도착 21시간 남음',
    time:'2019-07-03',
    price:'350,000',
    reply:'진료과목:중성화수술'
  }
]

const list2 = [
  {
    name: '여의도동물병원',
    avatar_url: '../Components/Assets/oval.png',
    subtitle: '12건의 견적서 도착 21시간 남음',
    time:'2019-07-11',
    price:'500,000',
    reply:'진료과목:중성화수술'
  },
  {
    name: '공덕동물병원',
    avatar_url: '../Components/Assets/oval.png',
    subtitle: '12건의 견적서 도착 21시간 남음',
    time:'2019-06-11',
    price:'550,000',
    reply:'진료과목:중성화수술'
  }
]

export default class BookStatus extends Component {
  constructor(props) {
    super(props)
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (

    <ListItem
      containerStyle={styles.cardStyle}
      title={<View><Text style={{fontSize:12,color:'#444444'}}>{item.time}</Text></View>}
      titleStyle={{fontSize:16, color:'black'}}
      subtitleStyle={{fontSize:13, color:'#8a8a8f'}}
      subtitle={<View>
          <Text style={{fontSize:13,marginTop:2}}>{item.name}원</Text>
          <Text style={{fontSize:13,color:'#4c4c4c',marginTop:2}}>{item.reply}</Text>
          <Text style={{fontSize:16,marginTop:6}}>{item.price}원</Text>
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

  )
  render() {
  return(
      <View style={styles.container}>
      <View style={{ width:'100%'}}>
        <View style={{width:375, height:38, backgroundColor:'#f4f4f4'}}>
          <Text style={{marginLeft:16, paddingTop:8.5}}>예약 진행중</Text>
        </View>
          <FlatList
             keyExtractor={this.keyExtractor}
             data={list}
             renderItem={this.renderItem}
           />
        </View>
    <View style={{ width:'100%'}}>
      <View style={{width:375, height:38, backgroundColor:'#f4f4f4'}}>
        <Text style={{marginLeft:16, paddingTop:8.5}}>예약 확정</Text>
      </View>
        <FlatList
           keyExtractor={this.keyExtractor}
           data={list2}
           renderItem={this.renderItem}
         />
    </View>
      </View>

    )
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f4f4f4',
  },
  cardStyle: {
    borderRadius:4,backgroundColor:'white',width:375, height:127,borderBottomWidth:1,
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2
  }
});
