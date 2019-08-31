import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Button,
  Image
}
  from 'react-native'
import Collapsible from 'react-native-collapsible';
import _ from 'lodash'
import { SelectMultipleButton } from 'react-native-selectmultiple-button'
import { store } from '../Mobx/mobxStore'

const numColumns = 3;

export default class SelectRegion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false,
      isSelected: false,
      collapsed: true,
      collapsed2: true,
      multipleSelectedDataLimited: [],  //선택한 지역들, 최대 3개
      regionData: [],
      seoulData: [],
      incheonData: []
    }
  }

  componentWillMount() {
    this.getRegion()
    console.log('https://peppy.ai/peppy/v1.0/region')
  }

  getRegion = () => {
    const url = 'https://peppy.ai/peppy/v1.0/region'

    fetch(url)
      .then(res => res.json())
      .then(res => {

        //console.log(res.data, 'resdata')
        /*
                tempData.map((region) => {
                  this.setState({
                    regionDate1: [...this.state.regionDate1, region]
                  }, () => console.log(this.state.regionDate1, 'this.state.regionDate1'))
                })
                var seoul = this.state.regionDate1.slice(0, 5)
                var incheon = this.state.regionDate1.slice(5, 10)
                this.setState({
                  seoulData: seoul,
                  incheonData: incheon
                }, () => {
                  console.log(this.state.seoulData, 'seoulData'),
                    console.log(this.state.incheonData, 'incheonData')
                })
                */


        this.setState({
          regionData: res.data
        })
      })
      .catch(error => {
      })
  }





  regionSelectHandler(props, sido) {

    let regionData = []
    props.map(region => {
      if(region.sido === sido) regionData.push(region)
    });

    return (
      <View style={{ flexWrap: 'wrap', flexDirection: 'row', backgroundColor: '#f4f4f4', borderColor: '#b7b7b7', borderWidth: 1 }}>
        {regionData.map(interest => (
          <SelectMultipleButton
            containerViewStyle={{
            }}
            key={interest.idx}
            buttonViewStyle={{
              backgroundColor: 'red',
              borderRadius: 0,
              height: 58,
              width: 124,
              margin: 0,
              borderWidth: 0.5
            }}
            textStyle={{
              fontSize: 15
            }}
            highLightStyle={{
              borderColor: 'white',
              backgroundColor: 'transparent',
              textColor: '#444444',
              borderTintColor: 'white',
              backgroundTintColor: '#e4f5ff',
              textTintColor: '#444444',
            }}
            value={interest.gugun}
            selected={this.state.multipleSelectedDataLimited.includes(
              interest
            )}
            singleTap={valueTap =>
              this._singleTapMultipleSelectedButtons_limited(interest)
            }
          />
        ))}
      </View>
    )
  }




  //지역 선택시.
  _singleTapMultipleSelectedButtons_limited(interest) {

    if (this.state.multipleSelectedDataLimited.includes(interest)) {
      _.remove(this.state.multipleSelectedDataLimited, ele => {
        return ele === interest;
      });
    } else {
      if (this.state.multipleSelectedDataLimited.length < 3)
        this.state.multipleSelectedDataLimited.push(interest);
    }

    this.setState({
      multipleSelectedDataLimited: this.state.multipleSelectedDataLimited
    });

    if (this.state.multipleSelectedDataLimited.length > 0) {
      let arr1 = [];
      this.state.multipleSelectedDataLimited.forEach(element => {
        arr1.push(element.idx);
      });

      //스토어에 저장.
      store.requestObject.region = arr1.join()
    }

    console.log(store.requestObject)

  }


  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  toggleExpanded2 = () => {
    this.setState({ collapsed2: !this.state.collapsed2 });
  };



  modalHeader() {
    return (
      <SafeAreaView style={{ backgroundColor: '#1ed0a3' }}>
        <View style={[styles.modalHeader]}>
          <TouchableOpacity
            underlayColor="transparent"
            onPress={() => {
              this.toggleModal(!this.state.modalVisible)
            }}>

            <Text style={styles.text1}>닫기</Text>
          </TouchableOpacity>
          <Text style={styles.text1}>지역선택</Text>
          <TouchableOpacity
            underlayColor="transparent"
            onPress={() => {
              this.toggleModal(!this.state.modalVisible)
            }}>
            <Text style={styles.text1}>확인</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    )
  }


  //지역 설정 컨테이너에 선택된 지역명을 표시해 준다.
  selecteRegionChanged() {  

    if (this.state.multipleSelectedDataLimited.length > 0) {

      let arr1 = [];
      this.state.multipleSelectedDataLimited.forEach(element => {
        arr1.push(element.gugun);
      });

      return (
        <Text style={{ color: 'black', marginLeft: 14 }}>{arr1.join()}</Text>
      )
    }
    else {
      return (
        <Text style={{ marginLeft: 14, color: '#9f9f9f' }}>내원 가능한 지역을 선택해주세요.</Text>
      )
    }
  }



  //지역 선택 컨테이너
  regionSelectContainer() {
    return (
      <View style={styles.modal1}>
        <TouchableOpacity
          underlayColor="transparent"
          onPress={() => {
            this.toggleModal(true)
          }}>

          <View style={{ width: 335, height: 50, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-start' }}>
            {this.selecteRegionChanged()}

          </View>
        </TouchableOpacity>
      </View>
    )
  }



  //선택한 지역 숫자를 표시해 준다.
  showSelectedRegion() {
    if (this.state.multipleSelectedDataLimited.length != 0) {
      return (
        <View style={{
          width: '100%', height: 50,
          justifyContent: 'center', alignItems: 'center',
          backgroundColor: '#1ed0a3', paddingTop: 0
        }}>
          <Text style={{ paddingBottom: 10, color: 'white' }}>{this.state.multipleSelectedDataLimited.length}/3 지역 선택 완료(최대3개) </Text>
        </View>
      )
    } else {
      return (
        <View style={{
          width: '100%', height: 50,
          justifyContent: 'center', alignItems: 'center',
          backgroundColor: '#a6a6a6', paddingTop: 0
        }}>
          <Text style={{ paddingBottom: 10, color: 'white' }}>지역을 선택 해 주세요</Text>
        </View>
      )
    }
  }




  render() {

    return (

      <View style={styles.container}>

        <Modal animationType={"slide"} transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { console.log("Modal has been closed.") }}>

          {this.modalHeader()}

          <ScrollView>

            <TouchableOpacity onPress={() => this.toggleExpanded()}>
              <View style={{ width: '100%', height: 62, backgroundColor: 'white', justifyContent: 'center', alignItems: 'flex-start', borderColor: '#b7b7b7', borderBottomWidth: 1 }}>
                <Text style={{ marginLeft: 20, fontSize: 16 }}>서울특별시</Text>
              </View>
            </TouchableOpacity>


            <Collapsible collapsed={this.state.collapsed} align="center">
              {this.regionSelectHandler(this.state.regionData, '서울')}
            </Collapsible>

            <TouchableOpacity onPress={this.toggleExpanded2}>
              <View style={{ width: '100%', height: 62, backgroundColor: 'white', justifyContent: 'center', alignItems: 'flex-start', borderColor: '#b7b7b7', borderBottomWidth: 1 }}>
                <Text style={{ marginLeft: 20, fontSize: 16 }}>인천광역시</Text>
              </View>
            </TouchableOpacity>


            <Collapsible collapsed={this.state.collapsed2} align="center">
              {this.regionSelectHandler(this.state.regionData, '인천광역시')}
            </Collapsible>

          </ScrollView>

          {this.showSelectedRegion()}

        </Modal>

        {this.regionSelectContainer()}

      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  modal: {
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    backgroundColor: '#036281',
    padding: 10,
    flexDirection: 'row',
  },
  modalHeader: {
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    backgroundColor: '#1ed0a3',
    padding: 10,
    flexDirection: 'row',
  },
  modal1: {
    width: 335,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  region: {
    justifyContent: 'flex-start',
    backgroundColor: 'red',
    borderBottomWidth: 1,
    borderColor: '#c2c2c2',
    padding: 0,
    flexDirection: 'row',
  },
  text: {
    color: '#9f9f9f',
    fontSize: 14,
    marginLeft: 14
  },
  text1: {
    color: 'white',
    marginTop: 10,
    marginLeft: 10,
    fontSize: 16
  },
})
