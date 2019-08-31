import React, { Component } from 'react';
import { Dimensions, Platform, Button, View, TextInput, StyleSheet, Text, Image, FlatList, TouchableHighlight, TouchableOpacity, SafeAreaView } from 'react-native';
import { ListItem } from 'react-native-elements'
import { store } from '../Mobx/mobxStore'
import { CheckBox } from 'native-base';
import { toJS, observable } from 'mobx';
import Dialog, { DialogContent } from 'react-native-popup-dialog';


const {
  height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 30) : 0;
const HeaderHeight = Platform.OS === 'ios' ? (IS_IPHONE_X ? 205 : 170) : 0;


export default class SelectPetScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: null,
      list: [],
      selectedButtonOne: null,
      visible: '',
      selectedPet: null
    }
  }

  componentWillMount() {
    this.props.navigation.addListener('willFocus', () => {
      // do whatever you want to do when focused
      this.makeRemoteRequest()
    });
  }

  makeRemoteRequest = () => {
    fetch('https://peppy.ai/peppy/v1.0/pet?memberIdx=' + store.memberObject.idx)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data, 'response')
        const list = response.data
        this.setState({ list: list })
      })
      .catch((error) => {
        console.error(error)
      })
  }



  _handleOkBtn = () => {
    store.selectedPetObject = this.state.selectedPet 
    console.log(store.selectedPetObject, 'store Pet')
   
    //this.props.navigation.navigate('PriceInvoice')
    this.props.navigation.goBack();
  }

  //커스텀 해더 특별한 기능 없음
  customHeader() {
    return (
      <View style={{ paddingTop: STATUS_BAR_HEIGHT, height: 94, width: '100%', backgroundColor: '#00d4a1', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}>
          <Image
            style={{ width: 20, height: 17, marginLeft: 20 }}
            source={require('../Components/Assets/white.png')} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, color: 'white' }}>반려동물 선택</Text>

        <TouchableOpacity onPress={() => { this._handleOkBtn() }}>
          <Text style={{ fontSize: 16, marginRight: 20, color: 'white' }}>확인</Text>
        </TouchableOpacity>
      </View>

    )
  }



  keyExtractor = (item, index) => index.toString()



  renderItem = ({ item }) => (


    <TouchableHighlight
      onPress={() => this.setState({ checked: item.idx, selectedPet : item })} >

      <ListItem
        containerStyle={styles.cardStyle}
        title={<View><Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text></View>}
        titleStyle={{ fontSize: 16, color: 'black' }}
        subtitleStyle={{ fontSize: 13, color: '#8a8a8f' }}
        subtitle={<View>
          <Text style={{ color: '#444444' }}>
            {item.dogcat == 'd' ? <Text>강아지</Text> : <Text>고양이</Text>} ⋅ {item.gender == 'm' ? <Text>남아</Text> : <Text>여아</Text>}
          </Text>
        </View>}
        leftAvatar={
          <View style={{ paddingLeft: 5 }}>
            <Image
              style={{ width: 58, height: 58, borderRadius: 29 }}
              source={{ uri: item.imageUrl }} />
          </View>
        }
        rightAvatar={
          <View style={{ marginRight: 20 }}>
            <CheckBox
              checkboxBgColor="green"
              checked={this.state.checked === item.idx}
              onPress={() => this.setState({ checked: item.idx, selectedPet : item })}
            />
          </View>
        }
      >
      </ListItem>
    </TouchableHighlight>

  )

  mainViewRender() {
    if (this.state.list != undefined) {
      return (
        <FlatList
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          extraData={this.state}
          data={this.state.list}
        />
      )
    } else {
      return (
        <View style={{ width: '100%', height: '100%', backgroundColor: '#979797', justifyContent: 'center', alignItems: 'center', paddingBottom: 100 }}>

          <View style={{ width: 336, height: 173, borderRadius: 4, backgroundColor: 'white' }}>
            <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 20 }}>반려동물 정보가 없습니다.</Text>
            <Text style={{ color: '#4a4a4a', fontSize: 14, marginTop: 10, marginLeft: 20 }}>견적서를 받으려면 정보를 추가해주세요.</Text>

            <View style={{ backgroundColor: 'transparent', width: '100%', height: 90, flexDirection: 'row', alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Text style={{ marginLeft: 219, fontSize: 14, marginBottom: 22, color: '#444444' }}>닫기</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.setState({ visible: false }), this.props.navigation.navigate('addPet') }}>
                <Text style={{ marginLeft: 20, fontSize: 14, marginBottom: 22, color: '#00a2f5' }}>등록하기</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.customHeader()}
        {this.mainViewRender()}
      </View>
    )
  };
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  cardStyle: {
    borderRadius: 4, marginTop: 0, marginLeft: 0, marginRight: 0, backgroundColor: 'white', width: '100%', height: 96, borderBottomWidth: 0.5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  }
});
