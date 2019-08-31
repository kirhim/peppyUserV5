import React, { Component } from 'react';
import { Dimensions, Platform, View, TextInput, ImageBackground, Button, StyleSheet, Text, Image, TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker'
import { RNS3 } from 'react-native-aws3'
import { store } from '../Mobx/mobxStore'
import SwiperFlatList from 'react-native-swiper-flatlist'
import Modal from 'react-native-modalbox';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import LinearGradient from 'react-native-linear-gradient';
import { toJS, observable } from 'mobx';


import MyBookingStatus from './MyBookingStatus'

const list = [
  {
    url: 'https://goodvet.s3.amazonaws.com/IMG_0007.PNG',
  }
]

const {
  height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 30) : 0;
const HeaderHeight = Platform.OS === 'ios' ? (IS_IPHONE_X ? 205 : 170) : 0;

export default class WriteReview extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props)
    this.state = {
      amazonData: '',
      textStatus: true,
      email: '',
      name: '',
      comment: '',
      region: [],
      value: 1,
      isDisabled: false,
      isOpen: false,
      medic: '',
      pictures: '',
      visible: '',
      visible2: false,
      visible3: '',
      idx: '',
      name: '',
      title: '',
      paddingBottom: 0
    }
  }

  componentDidMount() {

    store.reviewObject = {}
    store.bookingPetName = ''
    store.bookingMedicalKind = ''
    const storeStauts = (toJS(store.memberObject))
    this.setState({
      idx: storeStauts.idx,
      name: storeStauts.name
    }, () => console.log(this.state.name, 'store idx'))
    console.log(toJS(store.memberObject), 'memberObject')
    console.log(toJS(store.myPet), 'myPet')

    if (store.myPet.dogcat == 'd') {
      store.myPet.dogcat = '강아지'
      console.log(store.myPet.dogcat, 'dogcat')
    } else if (store.myPet.dogcat == 'c') {
      store.myPet.dogcat = '고양이'
      console.log(store.myPet.dogcat, 'dogcat')
    }


    this.props.navigation.addListener('willFocus', () => {
    })

  }

  //커스텀 해더 특별한 기능 없음
  customHeader() {
    return (
      <View style={{ paddingTop: STATUS_BAR_HEIGHT, height: 94, width: 375, backgroundColor: '#1ed0a3', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
          <Image
            style={{ width: 20, height: 17, marginLeft: 20 }}
            source={require('../Components/Assets/white.png')} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, color: 'white' }}>글쓰기</Text>

        <TouchableOpacity
          onPress={() => this.setState({ visible3: true })} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
          <Text style={{ fontSize: 16, marginRight: 20, color: 'white' }}>발행</Text>
        </TouchableOpacity>

      </View>
    )
  }


  ImageContainer() {
    return (
      <View style={{ width: 375, height: 180, backgroundColor: '#f5f5f5' }}>

        <Image
          style={{ marginTop: 65, marginLeft: 157, width: 64, height: 53 }}
          source={require('../Components/Assets/iconImageGrey.png')} />
        <TouchableHighlight onPress={() => this.takePics()}>
          <View style={{ marginLeft: 309, width: 46, height: 46, backgroundColor: 'white', borderRadius: 23, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require('../Components/Assets/iconPlusMint.png')} />

          </View>
        </TouchableHighlight>

      </View>
    )
  }

  hideText() {
    if (store.bookingPetName != '') {
      return (
        <Text style={{ paddingLeft: 20, flexDirection: 'row' }}>

          {store.bookingRegDate}
          {' ' + store.bookingPetName}
          {store.bookingMedicalKind == '0' ? <Text>{' '}중성화수술</Text> : null}

        </Text>
      )
    }
    else {
      return (
        <Text style={{ paddingLeft: 20, fontSize: 14, color: '#8a8a8e' }}>예약정보 선택</Text>
      )
    }
  }

  selectInfoContainer() {
    return (
      <TouchableOpacity onPress={() => { this.setState({ visible2: true }) }}>
        <View style={{ marginTop: 0, height: 47, width: 375, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {this.hideText()}
          <Image
            style={{ marginRight: 20, width: 14, height: 8 }}
            source={require('../Components/Assets/iconFold.png')} />
        </View>
      </TouchableOpacity>

    )
  }

  mainTextContainer() {
    return (

      <View style={{ width: '100%', height: 420, backgroundColor: 'transparent', marginBottom: 340 }}>
        <View style={{ width: '100%', height: 48, borderColor: '#e4e4e4', borderBottomWidth: 0.5, backgroundColor: 'transparent' }}>
          <TextInput
            style={{ paddingTop: 12, paddingLeft: 20, width: '100%', fontSize: 16 }}
            clearButtonMode='always'
            placeholder='제목을 입력해 주세요.'
            onChangeText={title => this.setState({ title: title })}
          />
        </View>

        <TextInput
          style={{ padding: 15, paddingTop: 12, paddingLeft: 20, width: '100%', fontSize: 16, flexWrap: "wrap" }}
          placeholder='글 내용을 입력해 주세요.'
          keyboardType='web-search'
          onFocus={() => this.setState({ paddingBottom: 340 }, () => console.log('paddingBottom'))}
          multiline={true}
          onChangeText={content => this.setState({ content: content })}
        />

      </View>

    )
  }

  takePics = () => {


    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 5
    }).then(response => {
      store.amazonData = [];

      console.log(response, 'imaage')

      let tempArray = []


      response.forEach((item) => {
        let image = {
          uri: item.path,
          width: item.width,
          height: item.height,
          name: item.filename,
          type: 'image/png'

        }
        const config = {

          bucket: 'goodvet',
          region: 'ap-northeast-2',
          accessKey: 'AKIAIJ4ZNXCKL6CIYIXQ',
          secretKey: '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',
          successActionStatus: 201
        }
        tempArray.push(image)

        RNS3.put(image, config)
          .then(responseFromS3 => {
            console.log(responseFromS3, 'responseFromS3')
            this.setState({ amazonData: [...this.state.amazonData, responseFromS3.body.postResponse.location] })
          })
      })
      this.setState({ pictures: tempArray })
      { this.hideIcons() }

    })
  }
  //사진 선택시 페이지네비게이션 표시
  hideIcons() {
    if (this.state.pictures.length <= 1) {
      this.setState({ textStatus: false })
      this.setState({ showsPagination: false })
    }
    else if (this.state.pictures.length === 1) {
      this.setState({ showsPagination: false })
      this.setState({ textStatus: false })
    }
    else {
      this.setState({ showsPagination: true })
      this.setState({ textStatus: false })
    }
  }

  takePicHandler() {

     const newImage = this.state.pictures
     const image = index => ({ image: newImage[index % newImage.length] });
     const items = Array.from(Array(newImage.length)).map((_, index) => image(index));

    return (
      <View>
        <View style={{ width: 375, height: 180, backgroundColor: '#eeeeee', borderBottomWidth: 0.3, borderColor: 'gray' }}>
          <View>
            {
              this.state.textStatus ?
                <Image
                  style={{ marginTop: 65, marginLeft: 157, width: 64, height: 53 }}
                  source={require('../Components/Assets/iconImageGrey.png')} /> : null}


                  <SwiperFlatList
                  showPagination={this.state.showsPagination}
                  data={items}
                  paginationActiveColor='#1ed0a3'
                  paginationDefaultColor='white'
                  paginationStyleItem={{ width: 8, height: 8 }}
                  renderItem={({ item }) =>

                    <View style={styles.uploadedImageView}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ visible: true });
                        }}>
                        <ImageBackground
                          style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'flex-end' }}
                          source={item.image}>
                          <View style={{ width: '100%', height: 40, backgroundColor: 'transparent' }}>
                            <LinearGradient colors={['transparent', 'black']}>
                              <View style={{ width: '100%', height: 40 }}>
                              </View>
                            </LinearGradient>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                  }
                />

          </View>
        </View>
        <TouchableOpacity
          underlayColor="gray"
          onPress={this.takePics.bind(this)} hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>

          <View style={{ marginTop: -70, marginLeft: 309, width: 50, height: 50, backgroundColor: 'white', borderRadius: 23, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require('../Components/Assets/iconPlusMint.png')} />
          </View>
        </TouchableOpacity>
      </View>

    )
  }

  modalContainer() {
    return (
      <Modal style={{ height: 138, width: 336, backgroundColor: 'white', borderRadius: 4 }} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
        <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 20 }}>리뷰를 업로드하시겠습니까?</Text>
        <View style={{ backgroundColor: 'transparent', width: '100%', height: 90, flexDirection: 'row', alignItems: 'flex-end' }}>
          <TouchableOpacity>
            <Text style={{ marginLeft: 219, fontSize: 14, marginBottom: 22, color: '#444444' }}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ marginLeft: 20, fontSize: 14, marginBottom: 22, color: '#00a2f5' }}>발행하기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }



  popUpBookingView() {
    return (
      <Dialog
        visible={this.state.visible2}
        onTouchOutside={() => {
          this.setState({
            visible2: false
          });
        }}
      >
        <DialogContent style={{ width: 336, height: 214, backgroundColor: 'white' }}>
          <View style={{ height: 50, width: '100%', backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center' }}>

            <TouchableOpacity onPress={() => this.setState({ visible2: false })}>
              <Image
                style={{ width: 16, height: 16 }}
                source={require('../Components/Assets/iconX.png')} />
            </TouchableOpacity>


            <Text style={{ paddingLeft: 100, fontSize: 14, color: '#8a8a8e' }}>예약정보 선택</Text>

          </View>

          <View style={{ height: 3, width: '100%', borderColor: '#e4e4e4', borderBottomWidth: 0.5 }} />

          <MyBookingStatus />



        </DialogContent>
      </Dialog>
    )
  }

  popUpConfirmView() {
    return (
      <Dialog
        visible={this.state.visible3}
        onTouchOutside={() => {
          this.setState({ visible3: false });
        }}
      >
        <DialogContent style={{ height: 138, width: 336, backgroundColor: 'white', borderRadius: 4, marginRight: 30 }}>
          <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 20 }}>리뷰를 업로드하시겠습니까?</Text>
          <View style={{ backgroundColor: 'transparent', width: '100%', height: 90, flexDirection: 'row', alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={() => this.setState({ visible3: false })}>
              <Text style={{ marginLeft: 219, fontSize: 14, marginBottom: 22, color: '#444444' }}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.postReviewToServer(), this.setState({ visible3: false }), this.props.navigation.goBack(), alert('리뷰를 등록 하셨습니다!') }}>
              <Text style={{ marginLeft: 20, fontSize: 14, marginBottom: 22, color: '#00a2f5' }}>발행하기</Text>
            </TouchableOpacity>
          </View>
        </DialogContent>
      </Dialog>
    )
  }

  imageExpandHandler() {
    const newImage = this.state.pictures
    const image = index => ({ image: newImage[index % newImage.length] });
    const items = Array.from(Array(newImage.length)).map((_, index) => image(index));
    return (
      <Dialog
        visible={this.state.visible}
        onTouchOutside={() => {
          this.setState({ visible: false });
        }}
      >
        <DialogContent style={{ flex: 1, backgroundColor: 'black', alignItems: 'flex-start', justifyContent: 'flex-start', paddingBottom: 40 }}>
          <TouchableOpacity onPress={() => this.setState({ visible: false })}>
            <View style={{ paddingTop: 65, paddingBottom: 104, paddingLeft: 18.5, width: 375, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <Image
                style={{ width: 16, height: 16 }}
                source={require('../Components/Assets/iconX.png')} />
            </View>
          </TouchableOpacity>
          <View style={{ height: 550, backgroundColor: 'transparent' }}>
            <SwiperFlatList
              showPagination={this.state.showsPagination}
              data={items}
              paginationActiveColor='#1ed0a3'
              paginationDefaultColor='white'
              paginationStyleItem={{ width: 8, height: 8 }}
              renderItem={({ item }) =>
                <View style={styles.uploadedImageView2}>
                  <ImageBackground
                    style={{ width: 375, height: 375, alignItems: 'center', justifyContent: 'center' }}
                    source={item.image}>
                  </ImageBackground>
                </View>
              }
            />
          </View>
        </DialogContent>
      </Dialog>
    )
  }

  //리뷰 오브젝트 서버로 전송
  postReviewToServer() {
    if (store.bookingMedicalKind == '0') {
      store.bookingMedicalKind = '중성화수술'
    }

    store.reviewObject.title = this.state.title
    store.reviewObject.writerName = this.state.name
    store.reviewObject.imageUrl = this.state.amazonData.toString()
    store.reviewObject.content = this.state.content
    store.reviewObject.petIdx = store.bookingPetIdx
    store.reviewObject.writerIdx = store.memberObject.idx
    store.reviewObject.medicalKind = store.bookingMedicalKind
    store.reviewObject.writerImgUrl = store.memberObject.profileImageUrl
    store.reviewObject.hashtags = '#' + store.myPet.dogcat + ' #' + store.bookingMedicalKind


    fetch('https://peppy.ai/peppy/v1.0/review', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(store.reviewObject), // data can be `string` or {object}!
    }).then(res => res.json())
      .then((response) => {
        console.log('Success:', JSON.stringify(response))

      })
      .catch((error) => {
        console.error('Errors:', (error))
      })

  }


  render() {
    return (

      <ScrollView>
        <View>

          <View style={styles.container}>
            {this.customHeader()}
            {this.takePicHandler()}
          </View>

          {this.selectInfoContainer()}
          <View style={{ width: '100%', height: 9, backgroundColor: '#eeeeee' }} />
          {this.mainTextContainer()}
          {this.popUpConfirmView()}

          {this.imageExpandHandler()}
          {this.popUpBookingView()}
        </View>

      </ScrollView>


    )
  };
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 275,
    alignItems: 'flex-start',
  },
  uploadedImageView: {
    width: 375,
    height: 220,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  uploadedImageView2: {
    width: 375,
    height: 375,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

});
