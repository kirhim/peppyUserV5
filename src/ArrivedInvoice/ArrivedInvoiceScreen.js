import React, {Component} from 'react';
import { Dimensions,Platform, View, TextInput, StyleSheet,Text, TouchableHighlight, Image, FlatList,TouchableOpacity,SafeAreaView ,Button} from 'react-native';
import { ListItem } from 'react-native-elements'
import {store} from '../Mobx/mobxStore'
import { toJS, observable } from 'mobx';
import { CheckBox } from 'native-base';

const {
  height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 30) : 0;
const HeaderHeight = Platform.OS === 'ios' ? (IS_IPHONE_X ? 205 : 170) : 0;

export default class ArrivedInvoiceScreen extends Component {
  static navigationOptions  = ({ navigation }) => {
    tabBarVisible : false
  }
  constructor(props) {
    super(props)
    this.state = {
      sentRequest: []
    }
  }

  componentWillMount(){

    this.props.navigation.addListener ('willFocus', () =>{
      // do whatever you want to do when focused
      this.makeRemoteRequest()
      this.makeRemoteRequest2()
    })
    const priceScreenIdx = store.memberObject.idx
    store.PriceScreenIdx = priceScreenIdx

  }


  makeRemoteRequest = () => {
    store.sentRequest = undefined;

    fetch('https://peppy.ai/peppy/v1.0/request?memberIdx=' + store.PriceScreenIdx + '&offset=0')
        .then((response) => response.json())
        .then((response) => {
          console.log(response.data,'response')
          const list = response.data
          store.sentRequest = list
          this.setState({sentRequest:list});
          console.log(toJS(store.sentRequest), 'sentRequest')
        })
        .catch((error) => {
          console.error(error)
        })
  }

  makeRemoteRequest2 = () => {

    fetch('https://peppy.ai/peppy/v1.0/pet?memberIdx=' + store.memberObject.idx)
        .then((response) => response.json())
        .then((response) => {

          const list = response.data
          this.setState({petList:list},
          () => console.log(this.state.petList, 'this.state.petList'))
        })
        .catch((error) => {
        console.error(error)
        })
  }



  //커스텀 해더 특별한 기능 없음
    customHeader(){
      return(
        <View style={{paddingTop:STATUS_BAR_HEIGHT, height:94, width:'100%',backgroundColor:'white',alignItems: 'center', justifyContent: 'space-between', flexDirection:'row'}}>
        <TouchableOpacity
        onPress={() => this.props.navigation.navigate('ButtomTab')}hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}>
          <Image
                    style={{width:20, height:17,marginLeft:20 }}
                    source={require('../Components/Assets/black.png')}/>
        </TouchableOpacity>
          <Text style={{fontSize:16, color:'black'}}>도착 견적 보기</Text>

          <Text style={{fontSize:16, marginRight:20, color:'white'}}></Text>


        </View>
      )
    }

keyExtractor = (item, index) => index.toString()

renderItem = ({ item }) => (
  <TouchableHighlight
          underlayColor="lightgray"
          onPress={() => {
          if(item.invoiceCount != 0)  this.props.navigation.navigate('DetailOne', {
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
      <View style={{flexDirection:'row'}}>
      <Text style={{fontSize:16, color:'#444444'}}>{item.petName}</Text>
      <Text style={{fontSize:16, color:'#444444'}}>의 견적</Text>
      <Text style={{fontSize:16, color:'#16bb92'}}> 요청중</Text>
      </View>}
    titleStyle={{fontSize:16, color:'black'}}
    subtitleStyle={{fontSize:13, color:'#8a8a8f'}}
    subtitle={
      <View style={{paddingBottom:5}}>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:12,color:'#4c4c4c'}}>{item.invoiceCount}</Text>
          <Text style={{fontSize:12,color:'#4c4c4c'}}> 건의 견적서 도착 ⋅ </Text>
          <Text style={{fontSize:12,color:'#4c4c4c'}}>21시간 남음</Text>
        </View>

        <View style={{flexDirection:'row', paddingTop:8}}>
          <Text style={{fontSize:12,color:'#4c4c4c',paddingTop:6}}>현재 평균가</Text>
          <Text style={{paddingLeft:3, fontSize:20,color:'#444444'}}>{item.avgPrice}</Text>
          <Text style={{paddingLeft:3, fontWeight:'bold',fontSize:14,color:'#444444',paddingTop:6}}>원</Text>
        </View>
      </View>

    }
    leftAvatar={
      <View>
      <Image
                style={{width:50, height:50,borderRadius:25, marginBottom:20, marginLeft:5}}
                source={{uri: item.image1}}/>
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

convertDate(){
  var userList = this.state.petList
  var findUser = userList.find(find => find.idx == 74)
  console.log(findUser.name, 'sss')
}




  render() {
  return(
      <View style={styles.container}>
          {this.customHeader()}
          <FlatList
               keyExtractor={this.keyExtractor}
               data={this.state.sentRequest}
               renderItem={this.renderItem}
             />

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
    borderRadius:4, marginTop:5,marginLeft:10,marginRight:10, backgroundColor:'white',width:352, height:111,borderBottomWidth:1,
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2
  }
});
