import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground, Dimensions, Platform, KeyboardAvoidingView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker'
import { RNS3 } from 'react-native-aws3'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import SelectMedicareScreen from './SelectMedicareScreen'
import SelectRegion from '../Components/SelectRegion'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import SwiperFlatList from 'react-native-swiper-flatlist'
import LinearGradient from 'react-native-linear-gradient';
import Moment from 'moment';
import Accordion from 'react-native-collapsible/Accordion';
import { store } from '../Mobx/mobxStore'
import { toJS, observable } from 'mobx';
import Modal from 'react-native-modalbox';
import moment from 'moment';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import _ from 'lodash'


const {
  height: SCREEN_HEIGHT,
  width: SCREEN_WITDH,
  heightxr:SCREEN_HEIGHTXR
} = Dimensions.get('window')

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;

const IS_IPHONE_XR = SCREEN_HEIGHTXR === 896;
const IS_IPHONE_XRW = SCREEN_WITDH === 414;

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 30) : 0;
const STATUS_BAR_WITDH = Platform.OS === 'ios' ? (IS_IPHONE_XRW ? 340 : 310) : 0;

const BOX_BAR_WITDH = Platform.OS === 'ios' ? (IS_IPHONE_XRW ? 375 : 335) : 0;


const HeaderHeight = Platform.OS === 'ios' ? (IS_IPHONE_X ? 205 : 170) : 0;

//리액트 캘린터 한글버전으로 고침
LocaleConfig.locales['fr'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';


const memberIdx = store.memberObject
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)

export default class PriceInvoiceScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    tabBarVisible: false
  }
  initialState = {
    [_today]: { disabled: true }
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: '',
      selectedItems: [],
      isDisabled: false,
      isOpen: false,
      amazonData: [],
      textStatus: true,
      region: [],
      value: 1,
      medic: '',
      pictures: '',
      selectedDay: '',
      pickDay: '',
      update: true,
      current: '',
      bday: '',
      _markedDates: [],
      _markedDateStrings: [],
      comment: '',
      selectedDate: 'ㄹㄹㄹㄹ',
      finalDate: [],
      PriceScreenIdx: '',
      showDates: [],
      updateName: '',
      updateDate: [],
      selectedPetName: ''
    };
  }

  componentWillMount() {

    console.log('will mount')
    store.requestObject = {}
    store.selectedPetObject = null
    store.requestObject.memberIdx = store.memberObject.idx


    this.state.showDates = undefined


    this.props.navigation.addListener('willFocus', () => {
      //선택된 펫이 있으면 state 갱신.(화면 표시를 위해)
      if (store.selectedPetObject !== undefined && store.selectedPetObject !== null) {
        this.setState({ selectedPetName: store.selectedPetObject.name })
      }
    })
  }



  takePics = () => {


    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 3
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
    const items = Array.from(Array(5)).map((_, index) => image(index));
    return (
      <View style={{ width: '100%', height: 180, backgroundColor: '#eeeeee', borderBottomWidth: 0.3, borderColor: 'gray' }}>
        <View style={{ justifyContent: 'flex-end'}}>
          {
            this.state.textStatus ?
            <View style={{paddingTop:70, width:'100%', alignItems:'center'}}>
              <Image
                style={{width: 64, height: 53 }}
                source={require('../Components/Assets/iconImageGrey.png')}>
              </Image>
            </View>
              : null

          }
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
                    style={{ width: "100%", height: '100%', alignItems: 'center', justifyContent: 'flex-end' }}
                    source={item}>
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

    )
  }


  customHeader() {
    return (
      <View style={{ paddingTop: STATUS_BAR_HEIGHT, height: 94, width: '100%', backgroundColor: '#1ed0a3', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()} hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
          <Image
            style={{ width: 20, height: 17, marginLeft: 20 }}
            source={require('../Components/Assets/white.png')} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, color: 'white' }}>견적요청서</Text>

        <TouchableOpacity
          onPress={() => { this.postApi(), this.setState({ isDisabled: true }), this.refs.modal2.open() }} hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
          <Text style={{ fontSize: 16, marginRight: 20, color: 'white' }}>전송</Text>
        </TouchableOpacity>
      </View>
    )
  }

  addPhotoContainer() {
    return (
      <View style={{ height: 163, width: '100%', backgroundColor: 'white' }}>
        <View style={{ marginTop: 20, marginLeft: 20, width: 156, height: 100, backgroundColor: '#eeeeee', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            style={{ width: 48, height: 36 }}
            source={require('../Components/Assets/iconCamera.png')} />
        </View>
        <Text style={{ marginLeft: 20, marginTop: 12, fontSize: 12, color: '#9f9f9f' }}>더 정확한 소견을 받아보시려면 사진을 추가해주세요.</Text>
      </View>
    )
  }


  //선택된 반려동물 표시
  selectePetStatus() {
    if (store.selectedPetObject !== undefined && store.selectedPetObject !== null)
      return (
        <Text style={{ marginLeft: 14, color: 'black' }}>{store.selectedPetObject.name}</Text>
      )
    else {
      return (
        <Text style={{ marginLeft: 14, color: '#9f9f9f' }}>반려동물을 선택해주세요.</Text>
      )
    }
  }

  //반려동물 선택
  selectPet() {
    return (
      <View style={{ borderTopWidth: 1, borderColor: '#e8e8e8', width: '100%', height: 104, backgroundColor: 'white', justifyContent: 'center' }}>
        <Text style={{ marginLeft: 20, color: '#444444' }}>반려동물 선택</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SelectPet')}>
          <View style={{ borderRadius: 4, marginTop: 8, marginLeft: 20, width: BOX_BAR_WITDH, height: 50, backgroundColor: 'transparent', borderColor: '#e8e8e8', borderWidth: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
            {this.selectePetStatus()}
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  //진료 선택
  selectMedicare() {
    return (
      <View style={{ paddingTop: 3, paddingBottom: 5, borderColor: '#e8e8e8', width: '100%', backgroundColor: 'white', justifyContent: 'center' }}>
        <Text style={{ marginLeft: 20, color: '#444444', marginBottom: 5, marginTop: 0 }}>진료 / 수술 선택*</Text>
        <View style={{ backgroundColor: 'transparent', marginLeft: 20, width: BOX_BAR_WITDH, height: 50, borderColor: '#e8e8e8', borderWidth: 1, borderRadius: 4 }}>
          <SelectMedicareScreen />
        </View>
      </View>
    )
  }


  typeComment() {
    return (
      <View style={{ paddingTop: 17, width: '100%', backgroundColor: 'white' }}>
        <Text style={{ marginLeft: 20, color: '#444444' }}>증상 입력*</Text>
        <View style={{ borderRadius: 4, marginTop: 8, marginLeft: 20, width: BOX_BAR_WITDH, backgroundColor: 'white', borderColor: '#e8e8e8', borderWidth: 1 }}>

          <View style={{ width: 300, height: 70, backgroundColor: 'white' }}>
            <TextInput style={{ width: 300, height: '100%', marginLeft: 14, backgroundColor: 'white' }}
              onChangeText={comment => this.setState({ comment: comment },
                () => {
                  //console.log(this.state.comment),
                  store.requestObject.comment = this.state.comment
                })}
              value={this.state.comment}
              placeholderTextColor='#9f9f9f'
              placeholder="예시) 며칠전부터 눈이 빨갛게 충혈되고 눈꼽이 자주껴요."
              multiline={true}
              type='web-search' />
          </View>

        </View>

      </View>
    )
  }

  selectRegion() {
    return (
      <TouchableHighlight>
        <View style={{ width: '100%', paddingTop: 17, backgroundColor: 'white', justifyContent: 'center' }}>
          <Text style={{ marginLeft: 20, color: '#444444' }}>지역 설정(최대)*</Text>
          <View style={{ borderRadius: 4, marginTop: 8, marginLeft: 20, width: BOX_BAR_WITDH, height: 50, backgroundColor: 'white', borderColor: '#e8e8e8', borderWidth: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
            <SelectRegion />
          </View>
        </View>
      </TouchableHighlight>

    )
  }

  selectDate() {
    if (this.state.showDates == undefined || this.state.showDates.length == 0) {
      return (
        <View style={{ paddingBottom: 5, paddingTop: 17, width: '100%', backgroundColor: 'white', justifyContent: 'center', paddingBottom: 25 }}>
          <Text style={{ marginLeft: 20, color: '#444444' }}>날짜선택</Text>

          <TouchableOpacity onPress={() => this.refs.modal3.open()} style={styles.btn}>
            <View style={{ borderRadius: 4, marginTop: 8, marginLeft: 20, width: BOX_BAR_WITDH, height: 50, backgroundColor: 'transparent', borderColor: '#e8e8e8', borderWidth: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
              <Text style={{ marginLeft: 14, color: '#9f9f9f' }}>원하는 날짜를 선택해 주세요</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={{ paddingBottom: 5, paddingTop: 17, width: '100%', backgroundColor: 'white', justifyContent: 'center', paddingBottom: 25 }}>
          <Text style={{ marginLeft: 20, color: '#444444' }}>날짜선택</Text>

          <TouchableOpacity onPress={() => this.refs.modal3.open()} style={styles.btn}>
            <View style={{ borderRadius: 4, marginTop: 8, marginLeft: 20, width: BOX_BAR_WITDH, height: 50, backgroundColor: 'transparent', borderColor: '#e8e8e8', borderWidth: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
              <Text style={{ marginLeft: 14, color: '#9f9f9f' }}>{this.state.showDates.join()}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  }


  onDaySelect = (day) => {


    let removed = false;
    _.remove(this.state._markedDates, ele => {
      if (ele.dateString === day.dateString) removed = true;
      return ele.dateString === day.dateString;
    });


    if (this.state._markedDates.length < 3 && !removed) {
      this.state._markedDates.push(day);
    }

    this.state._markedDateStrings = {};

    this.state._markedDates.forEach(element => {
      let selected = true;
      const updatedMarkedDates = { ...this.state._markedDateStrings, ...{ [element.dateString]: { selected } } }


      this.state._markedDateStrings = updatedMarkedDates
    });

    this.state.showDates = Object.keys(this.state._markedDateStrings)

    this.setState({ _markedDateStrings: this.state._markedDateStrings }, () => {
      console.log(this.state._markedDateStrings)
      console.log(this.state._markedDates)

    });






    /*
        this.setState({
          showDates: []
        })

        store.requestDate = []
        const _selectedDay = moment(day.dateString).format(_format);
        let selected = true;
        let markedDates = {}
        if (this.state._markedDates[_selectedDay]) {
          selected = !this.state._markedDates[_selectedDay].selected;
          markedDates = this.state._markedDates[_selectedDay];
        }


        markedDates = { ...markedDates, ...{ selected } };

        console.log(markedDates, 'markedDates')


        const updatedMarkedDates = { ...this.state._markedDates, ...{ [_selectedDay]: markedDates } }
        this.setState({ _markedDates: updatedMarkedDates },
          () => {
            console.log(this.state._markedDates, 'this.state._markedDates')
            this.state.showDates = Object.keys(this.state._markedDates)



            console.log(this.state.showDates[0], 'showDates[0]')
            console.log(this.state.showDates[1], 'showDates[1]')
            console.log(this.state.showDates[2], 'showDates[2]')
            store.requestObject.date1 = this.state.showDates[0]
            store.requestObject.date2 = this.state.showDates[1]
            store.requestObject.date3 = this.state.showDates[2]
            console.log(toJS(store.requestObject.date1), 'requestObject.date1')
            console.log(toJS(store.requestObject.date2), 'requestObject.date2')
            console.log(toJS(store.requestObject.date3), 'requestObject.date3')


          })

        console.log(toJS(store.requestObject), 'store.requestObject')
        console.log(this.state.showDates, 'showDatesssss3s')
    */

  }


  modalContainer() {
    return (
      <Modal style={[styles.modalcal3]} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled} >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 335, backgroundColor: 'transparent' }}>
          <Button title='취소' onPress={() => this.refs.modal3.close()} />
          <Button title='확인' onPress={() => { this.refs.modal3.close(), console.log(this.state.showDates, 'showDates') }} />
        </View>
        <Calendar
          theme={{
            selectedDayBackgroundColor: '#1ed0a3',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
          }}
          onDayPress={this.onDaySelect}
          markedDates={this.state._markedDateStrings}
          markingType={'multi-dot'}
          monthFormat={'yyyy MMMM'} />
      </Modal>
    )
  }

  modalContainer2() {
    return (
      <Modal style={{ height: 173, width: 336, borderRadius: 4 }} position={"center"} ref={"modal2"} isDisabled={this.state.isDisabled}>

        <Text style={{ paddingTop: 22, marginLeft: 24, fontSize: 20, color: '#4a4a4a' }}>견적 요청 완료</Text>
        <Text style={{ paddingTop: 10, marginLeft: 24, fontSize: 16, color: '#4a4a4a' }}>24시간 내에 견적이 도착할 예정입니다 :)</Text>
        <View style={{ marginLeft: 280, marginTop: 50, backgroundColor: 'transparent', width: 50 }}>
          <Button onPress={() => { this.props.navigation.navigate('HospitalMain') }} style={{ color: '#00a2f5' }} title="닫기"> </Button>
        </View>
      </Modal>
    )
  }

  postApi() {

    store.requestObject.image1 = this.state.amazonData[0]
    store.requestObject.image2 = this.state.amazonData[1]
    store.requestObject.image3 = this.state.amazonData[2]


    //지역은 SelectRegion에서 store에 직접 저장함.
    //MedicalKind 는 SelectMedicareScreen에서 직접 저장함.
    //store.selectedPetObject에 선택한 pet정보가 저장됨.
    store.requestObject.petIdx = store.selectedPetObject.idx;
    //store.requestObject.imageCount = this.state.amazonData.length;



    //store.requestObject.region1 = store.requestRegion1
    //store.requestObject.region2 = store.requestRegion2
    //store.requestObject.region3 = store.requestRegion3

    store.requestObject.comment = this.state.comment
    //store.requestObject.medicalKindIdx = 0

    if(this.state.showDates[0] !== undefined) store.requestObject.date1 = this.state.showDates[0]
    if(this.state.showDates[1] !== undefined) store.requestObject.date2 = this.state.showDates[1]
    if(this.state.showDates[2] !== undefined) store.requestObject.date3 = this.state.showDates[2]


    console.log(store.requestObject, 'request')


    fetch('https://peppy.ai/peppy/v1.0/request', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(store.requestObject), // data can be `string` or {object}!
    }).then(res => res.json())
      .then((response) => {
        console.log('Success:', JSON.stringify(response))
      })
      .catch((error) => {
        console.error('Errors:', (error))
      })
  }

  imageExpandHandler() {

    const newImage = this.state.pictures
    const image = index => ({ image: newImage[index % newImage.length] });
    const items = Array.from(Array(5)).map((_, index) => image(index));

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
                    source={item}>
                  </ImageBackground>
                </View>
              }
            />
          </View>
        </DialogContent>
      </Dialog>
    )
  }

  render() {

    return (
      <View>
        {this.customHeader()}

        <ScrollView style={{ marginBottom: 100 }}>

          <View style={styles.container}>
            {this.takePicHandler()}
            <TouchableOpacity
              underlayColor="gray"
              onPress={this.takePics.bind(this)}
              hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>

              <View style={{ marginTop: -70, marginLeft: STATUS_BAR_WITDH, width: 50, height: 50, backgroundColor: 'white', borderRadius: 23, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require('../Components/Assets/iconPlusMint.png')} />
              </View>
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView behavior='padding'>
            {this.selectPet()}
            {this.selectMedicare()}
            {this.typeComment()}
            {this.selectRegion()}
            {this.selectDate()}

            {this.imageExpandHandler()}
          </KeyboardAvoidingView>


        </ScrollView>
        <View style={{ width: '100%', height: 50, backgroundColor: 'transparent' }} />

        {this.modalContainer()}
        {this.modalContainer2()}
      </View>
    )
  };
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white'
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'gray',
    borderRadius: 4
  },
  modalcal3: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 356,
    width: 336,
    borderRadius: 4
  },
  uploadedImageView: {
    width: 375,
    height: 180,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  uploadedImageView2: {
    width: 375,
    height: 375,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  calendarBox: {
    height: 360,
    width: 360,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
