import React, { Component } from 'react';
import { Dimensions, Platform, View, TextInput, FlatList, Button, Alert, StyleSheet, Text, TouchableHighlight, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import ReUseImageWithText from './ReUseImageWithText'
import { ListItem } from 'react-native-elements'
import { store } from '../Mobx/mobxStore'
import { toJS, observable } from 'mobx';
import PopupDialog, { DialogContent } from 'react-native-popup-dialog';



const ImageStyle = ({ text, imageAddress }) => (
  <View style={{ marginLeft: 20, marginTop: 20, width: 50, height: 67, backgroundColor: 'transparent', alignItems: 'center' }}>
    <Image
      style={{ width: 46, height: 46 }}
      source={imageAddress} />
    <Text style={{ paddingTop: 4, fontSize: 11, color: '#4a4a4a' }}>{text}</Text>
  </View>
)

const iconNeuterOn = require('../Components/Assets/iconNeuterOn.png')
const iconNeuterOff = require('../Components/Assets/iconNeuterOff.png')

const iconBoneOn = require('../Components/Assets/iconBoneOn.png')
const iconBoneOff = require('../Components/Assets/iconBoneOff.png')

const iconScalingOn = require('../Components/Assets/iconScalingOn.png')
const iconScalingOff = require('../Components/Assets/iconScalingOff.png')

const iconBloodOn = require('../Components/Assets/iconBloodOn.png')
const iconBloodOff = require('../Components/Assets/iconBloodOff.png')

const iconInjectionOn = require('../Components/Assets/iconInjectionOn.png')
const iconInjectionOff = require('../Components/Assets/iconInjectionOff.png')

const iconNeuterinitialOn = require('../Components/Assets/iconNeuterinitial.png')

const {
  height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT >= 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 30) : 0;
const HeaderHeight = Platform.OS === 'ios' ? (IS_IPHONE_X ? 205 : 170) : 0;


export default class RealReviewMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      iconNeuter: false,
      iconBone: false,
      iconScaling: false,
      iconBlood: false,
      iconInjection: false,

      resultKeyword : '전체', //검색결과 숫자 표시 문구

      dogcatPopupVisible: false, //모두보기,강아지,고양이 선택 팝업창
      dogcatFilter: "모두보기",

      //FlatList용 state 변수들
      totalCount: 0,  //검색 결과 숫자
      filterString: "",
      error: null,
      data: [],
      refreshing: false,
      page: 0,
      loading: false,
      hasMoreData: true
    }
  }

  componentDidMount() {
    
    this.props.navigation.addListener('willFocus', () => {
      this.makeRemoteRequest()
    })
  }

  componentWillMount() {
    store.filterShowAll = true
  }

  renderNeuter = () => {
    var imgSource = this.state.iconNeuter ? iconNeuterOn : iconNeuterOff;
    return (
      <ReUseImageWithText source={imgSource} text="중성화수술" />
    );
  }

  renderBone = () => {
    var imgSource = this.state.iconBone ? iconBoneOn : iconBoneOff;
    return (
      <ReUseImageWithText source={imgSource} text="슬개골탈골" />
    );
  }


  renderScaling = () => {
    var imgSource = this.state.iconScaling ? iconScalingOn : iconScalingOff;
    return (
      <ReUseImageWithText source={imgSource} text="스케일링" />
    );
  }
  
  renderBlood = () => {
    var imgSource = this.state.iconBlood ? iconBloodOn : iconBloodOff;
    return (
      <ReUseImageWithText source={imgSource} text="혈액검사" />
    );
  }

  renderInfection = () => {
    var imgSource = this.state.iconInjection ? iconInjectionOn : iconInjectionOff;
    return (
      <ReUseImageWithText source={imgSource} text="예방접종" />
    );
  }
 

  //커스텀 해더 특별한 기능 없음
  customHeader() {
    return (
      <View style={{ paddingTop: STATUS_BAR_HEIGHT, borderBottomWidth: 1, borderColor: '#dddddd', STATUS_BAR_HEIGHT, height: 94, width: '100%', backgroundColor: 'transparent', alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row' }}>
        <View style={{ position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }} >
          <Text style={{ fontSize: 16 }}>리얼리뷰</Text>
        </View>

        <View style={{ position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'flex-end', backgroundColor: 'transparent', flexDirection: 'row' }} >

          <TouchableOpacity onPress={() => this.props.navigation.navigate('search')} hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }} >
            <View style={{ width: 25, height: 25, backgroundColor: 'transparent', marginRight: 24 }}>
              <Image
                style={{ width: 23, height: 24 }}
                source={require('../Components/Assets/iconSearchBlack.png')} />
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => this.props.navigation.navigate('write')} hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}>
            <View style={{ width: 25, height: 25, backgroundColor: 'transparent', marginRight: 17 }}>
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../Components/Assets/iconWriteBlack.png')} />
            </View>
          </TouchableOpacity>
        </View>

      </View>
    )
  }



  //필터링 버튼 핸들
  _handleOnPressFilterButton = (keyword) => {

    let iconNeuter = false;
    let iconBone = false;
    let iconScaling = false;
    let iconBlood = false;
    let iconInjection = false;

    if (keyword === '중성화수술') iconNeuter = !this.state.iconNeuter;
    if (keyword === '슬개골탈구') iconBone = !this.state.iconBone;
    if (keyword === '스케일링') iconScaling = !this.state.iconScaling;
    if (keyword === '혈액검사') iconBlood = !this.state.iconBlood;
    if (keyword === '예방접종') iconInjection = !this.state.iconInjection;

    if (!iconNeuter && keyword === '중성화수술') keyword = '';
    else if (!iconBone && keyword === '슬개골탈구') keyword = '';
    else if (!iconScaling && keyword === '스케일링') keyword = '';
    else if (!iconBlood && keyword === '혈액검사') keyword = '';
    else if (!iconInjection && keyword === '예방접종') keyword = '';


    this.setState({
      iconNeuter: iconNeuter,
      iconBone: iconBone,
      iconScaling: iconScaling,
      iconBlood: iconBlood,
      iconInjection: iconInjection,

      data: [],
      page: 0,
      filterString: keyword
    }, () => {
      this.makeRemoteRequest();
    })
  }

  //필터링 버튼들
  typeContainer() {
    return (
      <View style={{ width: '100%', height: 94, backgroundColor: '#f4f4f4', borderColor: '#dddddd', borderBottomWidth: 0.5, flexDirection: 'row' }}>

        <View style={{ marginLeft: 20, marginTop: 0, width: 50, height: 67, backgroundColor: 'transparent', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this._handleOnPressFilterButton('중성화수술')}>
            {this.renderNeuter()}
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 20, marginTop: 0, width: 50, height: 67, backgroundColor: 'transparent', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this._handleOnPressFilterButton('슬개골탈구')}>
            {this.renderBone()}
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 20, marginTop: 0, width: 50, height: 67, backgroundColor: 'transparent', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this._handleOnPressFilterButton('스케일링')}>
            {this.renderScaling()}
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 20, marginTop: 0, width: 50, height: 67, backgroundColor: 'transparent', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this._handleOnPressFilterButton('혈액검사')}>
            {this.renderBlood()}
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 20, marginTop: 0, width: 50, height: 67, backgroundColor: 'transparent', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this._handleOnPressFilterButton('예방접종')}>
            {this.renderInfection()}
          </TouchableOpacity>
        </View>

      </View>
    )
  }


  //상태 줄 (검색결과 숫자 / 강아지 고양이 선택 / 정렬)
  statusContainer() {
    return (
      <View style={{ height: 38, width: '100%', borderColor: '#e4e4e4', borderBottomWidth: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

        <View style={{ marginLeft: 20, width: 200, backgroundColor: 'transparent' }}>
          <Text style={{ fontSize: 12, color: '#444444' }}>{this.state.resultKeyword} : {this.state.totalCount} 건</Text>
        </View>

        <TouchableOpacity onPress={() => this.setState({ dogcatPopupVisible: true })}
          hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}>
          <View style={{ marginRight:10, width: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
            <Text style={{ fontSize: 12, color: '#444444' }}>{this.state.dogcatFilter}</Text>
            <Image
              style={{ marginLeft: 6, width: 10, height: 6 }}
              source={require('../Components/Assets/iconFold.png')} />
          </View>
        </TouchableOpacity>

      </View>
    )
  }


  //강아지 고양이 선택 팝업 버튼 핸들러
  _handleDogCatPopupButton = (filter) => {
    this.setState({
      dogcatPopupVisible: false,
      dogcatFilter: filter,
      page: 0,
      data: []
    }, () => this.makeRemoteRequest())

  }

  //강아지 고양이 선택 팝업창
  popUpConfirmViewDogCat() {
    return (
      <PopupDialog
        containerStyle={{ justifyContent: 'flex-end', paddingBottom: 30, backgroundColor: 'transparent' }}
        visible={this.state.dogcatPopupVisible}
        onTouchOutside={() => {
          this.setState({ dogcatPopupVisible: false });
        }}
      >
        <View style={{ width: 358 }}>

          <View style={{ height: 40, borderBottomWidth: 0.5, borderColor: '#e4e4e4', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 15, color: '#8a8a8e' }}>선택해주세요</Text>
          </View>

          <View style={{ height: 57, borderBottomWidth: 0.5, borderColor: '#e4e4e4', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this._handleDogCatPopupButton('강아지') }}>
              <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 15, color: '#4a4a4a' }}>강아지</Text>
            </TouchableOpacity>
          </View>


          <View style={{ height: 57, borderBottomWidth: 0.5, borderColor: '#e4e4e4', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this._handleDogCatPopupButton('고양이') }}>
              <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 15, color: '#4a4a4a' }}>고양이</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 57, borderBottomWidth: 0.5, borderColor: '#e4e4e4', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this._handleDogCatPopupButton('모두보기') }}>
              <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 15, color: '#4a4a4a' }}>모두보기</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 57, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.setState({ dogcatPopupVisible: false })}>
              <Text style={{ fontSize: 15, color: 'red', justifyContent: 'center', alignItems: 'center' }}>취소</Text>
            </TouchableOpacity>
          </View>

        </View>
      </PopupDialog>
    )
  }

  /*
  popUpConfirmViewFilerBy() {
    return (
      <PopupDialog
        containerStyle={{ justifyContent: 'flex-end', paddingBottom: 30, backgroundColor: 'transparent' }}
        visible={this.state.visible2}
        onTouchOutside={() => {
          this.setState({ visible2: false });
        }}
      >

        <View style={{ backgroundColor: 'white', borderRadius: 4, marginBottom: 10, width: 358 }}>

          <View style={{ height: 40, borderBottomWidth: 0.5, borderColor: '#e4e4e4' }}>
            <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.setState({ visible2: false }) }}>
              <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 15, color: '#4a4a4a' }}>댓글순</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }}>
            <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 15, color: '#4a4a4a' }}>최신순</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 40, borderTopWidth: 0.5, borderColor: '#e4e4e4' }}>
            <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 15, color: '#4a4a4a' }}>조회순</Text>
            </TouchableOpacity>
          </View>

        </View>


        <View style={{ borderTopWidth: 0.5, borderColor: '#e4e4e4', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.setState({ visible2: false })}>
            <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 15, color: 'red' }}>취소</Text>
          </TouchableOpacity>
        </View>

      </PopupDialog>
    )
  }

  */
  _keyExtractor = (item, index) => item.idx.toString();

  render() {

    return (
      <View style={styles.container}>
        {this.customHeader()}
        {this.typeContainer()}
        {this.statusContainer()}
        <View style={styles.container}>
          <View style>
            <FlatList
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={this._keyExtractor}
              ItemSeparatorComponent={this.renderSeparator}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
              onEndReachedThreshold={1}
              onEndReached={this.handleLoadMore}
            />
          </View>
        </View>
        {this.popUpConfirmViewDogCat()}

      </View>
    )
  };

  



  /**
   * FlatList Setup 
   */

  makeRemoteRequest = async () => {

    if (this.state.loading == true) return

    let url = 'https://peppy.ai/peppy/v1.0/review?offset=' + this.state.page * 10
    //console.log(url, 'bookmark url')
    let resultKeyword = '전체'

    if (this.state.filterString.length > 0) {
      url += '&keyword=' + this.state.filterString;
      resultKeyword = this.state.filterString;
    }

    //강아지,고양이,모두보기
    if (this.state.dogcatFilter === "모두보기") url += '&dogcat=all';
    else if (this.state.dogcatFilter === "강아지") url += '&dogcat=dog';
    else if (this.state.dogcatFilter === "고양이") url += '&dogcat=cat';



    this.setState({ 
      loading: true,
      resultKeyword : resultKeyword 
    });
    

    fetch(url)
      .then(res => res.json())
      .then(res => {
        //console.log(res.data)

        if (res.data.length == 10) {
          this.setState({
            hasMoreData: true,
          });
        }
        else {
          this.setState({
            hasMoreData: false,
          });
        }

        let newData = res.data;
        if (this.state.page == 0) {
          newData = res.data
        }
        else {
          newData = [...this.state.data, ...res.data]
        }


        this.setState({
          data: newData,
          error: res.error || null,
          loading: false,
          refreshing: false,
          totalCount : res.count
        });

        //console.log(this.state.data)
        //리뷰 순서대로 나열
        //console.log(res.data, 'res data')
        //this.setState({
        //  data:this.state.data.sort((a, b) => b.idx - a.idx)
        //})

        //리랜더링 할때 중복되는 리스트 삭제
        /*
        const newData = this.state.data
        var result = newData.reduce((unique, o) => {
          if(!unique.some(obj => obj.idx === o.idx)) {
            unique.push(o);
          }
          return unique;
        },[]);
        this.setState({
          newData:result
        })
        */

      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false });
      });
  };


  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: '#CED0CE',
        }} />
    )
  }


  handleRefresh = () => {
    this.setState({
      page: 0,
      refreshing: true,
      error: null,
      hasMoreData: true
    },
      () => {
        this.makeRemoteRequest()
      }
    )
  }


  handleLoadMore = () => {
    if (this.state.hasMoreData) {
      console.log("load more")
      this.setState({
        page: this.state.page + 1,
      }, () => {
        this.makeRemoteRequest()
      })
    }
    else {
      return
    }

  }



  //이미지 스크롤 뷰 생성
  createScrollImageSources = (imageUrl) => {

    //console.log(imageUrl)
    let result = []
    let imageSplice = imageUrl.split(',')

    for (let i = 0; i < imageSplice.length; i++) {
 
      result.push(<Image
        style={styles.scrollviewImageStyle}
        source={{ uri: imageSplice[i] }} />);
    }
    return result
  }


  renderItem = ({ item, index }) => {

    return (

      <View>
        <View style={{ marginTop: 20, marginLeft: 20, width: '100%', backgroundColor: 'transparent' }}>

          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{ uri: item.writerImgUrl }} />
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ fontSize: 14 }}>{item.writerName}</Text>
              <Text style={{ paddingLeft: 0, fontSize: 12, color: '#8a8a8f' }}>{item.regDate.slice(0, 10)}</Text>
            </View>
          </View>

          <View style={{ marginTop: 14, width: '100%', backgroundColor: 'transparent', marginBottom: 4 }}>
            <Text style={{ fontSize: 18, color: '#16bb92' }}>{item.hashtags}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 270, height: 40, backgroundColor: 'transparent' }}>
              <Text>{item.content}</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                //console.log(item,'item'),
                this.props.navigation.navigate('RealReviewDetail', { request: item })
              }}>
              <View style={{ marginTop: 16, width: 58, height: 20, backgroundColor: 'transparent', paddingLeft: 3 }}>
                <Text style={{ color: '#aeaeb4', fontSize: 14 }}>⋅⋅⋅더 보기</Text>
              </View>
            </TouchableOpacity>
          </View>



        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true} style={{ width: '100%' }}>
          {this.createScrollImageSources(item.imageUrl)}
        </ScrollView>

        <View style={{ flexDirection: 'row', marginBottom: 20, borderBottomWidth: 0.1, borderColor: '#e4e4e4' }}>
          <Text style={{ marginLeft: 20, color: '#8a8a8f', fontSize: 12 }}>진료/수술시기 {item.regDate.slice(0, 10)}</Text>
          <Text style={{ paddingLeft: 12, color: '#8a8a8f', fontSize: 12 }}>댓글{item.replyCount}</Text>
        </View>

      </View>

    )
  }



}










const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardStyle: {
    borderRadius: 0, paddingTop: -10, marginLeft: 0, marginRight: 0, backgroundColor: 'white', width: '100%', borderBottomWidth: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2
  },
  scrollviewImageStyle: {
    marginLeft: 20,
    marginBottom: 20,
    width: 120,
    height: 120,
    borderRadius: 4,
    resizeMode: 'cover'
  }
});






