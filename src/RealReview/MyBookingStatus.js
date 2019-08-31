import React from 'react';
import { Dimensions, Platform, View, TextInput, StyleSheet,Text, Image,FlatList, TouchableOpacity,ScrollView,TouchableHighlight, Button} from 'react-native';
import { ListItem } from 'react-native-elements'
import {store} from '../Mobx/mobxStore'
import { toJS, observable } from 'mobx';

export default class MyBookingStatus extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      petList: []
    }
  }

  componentWillMount(){
    console.log(toJS(store.memberObject.idx), 'myPetTab initial')
    const priceScreenIdx = store.memberObject.idx
    store.PriceScreenIdx = priceScreenIdx
    console.log(store.PriceScreenIdx, 'PriceScreenIdx')
    this.makeRemoteRequest()

  }

  makeRemoteRequest = () => {
    store.myPetList = undefined;

    fetch('https://peppy.ai/peppy/v1.0/invoice?memberIdx=' + store.PriceScreenIdx + '&offset=0&status=7')
        .then((response) => response.json())
        .then((response) => {
          console.log(response.data,'my booking response')
          const list = response.data
          store.myPetList = list
          this.setState({petList:list});
          console.log(toJS(store.myPetList), 'mypetlist')

        })
        .catch((error) => {
          console.error(error)
        })
  }



  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (

    <TouchableOpacity
    onPress={()=> this.setState({
      petName:item.petName,
      regDate:item.regDate.slice(0,10),
      medicalKind:item.medicalKindIdx
    }, ()=> {
      store.bookingPetName = item.petName
      store.bookingRegDate = item.regDate.slice(0,10),
      store.bookingMedicalKind = item.medicalKindIdx
      store.bookingPetIdx = item.petIdx

      console.log(store.bookingPetName, 'store.bookingPetName')
      console.log(store.bookingRegDate, 'store.bookingRegDate')
      console.log(store.bookingMedicalKind, 'store.bookingMedicalKind')
    })}
    >
      <ListItem
        containerStyle={{borderBottomWidth:0.5, borderColor:'#e4e4e4',width:352, height:50, marginTop:0, marginBottom:6, backgroundColor:'transparent', borderRadius:4}}
        title={
          <View style={{width:336, flexDirection:'row'}}>
            <Text style={{color:'#9f9f9f'}}>{item.regDate.slice(0,10)}</Text>
            <Text style={{paddingLeft:12}}>{item.petName}/</Text>
            <Text style={{paddingTop:2}}>
              {item.medicalKindIdx == '0'? <Text>중성화수술</Text>: null}
            </Text>

          </View>
        }
        titleStyle={{fontSize:16, color:'black'}}
        subtitleStyle={{fontSize:13, color:'#8a8a8f'}}

        >
        </ListItem>
      </TouchableOpacity>

  )

  render() {

    return (
      <FlatList
           keyExtractor={this.keyExtractor}
           renderItem={this.renderItem}
           extraData={this.state}
           data={this.state.petList}
         />
    );
  }
}
