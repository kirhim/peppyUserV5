import React, {Component} from 'react';
import { Dimensions,Platform, View, Button, TextInput, StyleSheet,Text, Image ,TouchableHighlight,TouchableOpacity,SafeAreaView,ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
import Modal from 'react-native-modalbox';

const {
  height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 30) : 0;
const HeaderHeight = Platform.OS === 'ios' ? (IS_IPHONE_X ? 205 : 170) : 0;


export default class ArrivedInvoiceDetailTwo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      request: this.props.navigation.getParam('request', undefined),
      isDisabled: '',
      isOpen: false,
    }
    console.log(this.state.request)
  }

  //커스텀 해더
  customHeader(){
    return(

        <View>
        <View style={{paddingTop:STATUS_BAR_HEIGHT, marginLeft:0, width:375, height:94,justifyContent: 'flex-start', flexDirection:'row', backgroundColor:'#1ed0a3', alignItems:'center'}}>
              <TouchableOpacity
              onPress={() => this.props.navigation.goBack()} hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}>
              <View style={{marginLeft:20}}>
              <Image
                        style={{marginLeft:20, width:20, height:17,marginLeft:0 }}
                        source={require('../Components/Assets/white.png')}/>
              </View>
              </TouchableOpacity>
              <Text style={{marginLeft:110,fontSize:16, color:'white',marginRight:20}}>견적서보기</Text>

          </View>

          <View style={{height:74, width:'100%', backgroundColor:'#1ed0a3', justifyContent:'flex-end', alignItems:'center'}}>
            <Image
                      style={{borderRadius:35, width:70, height:70}}
                      source={require('../Components/Assets/imageDoctor1.png')}/>
          </View>

        <View style={{width:'100%', backgroundColor:'#1ed0a3',justifyContent:'center', alignItems:'center'}}>

          <View style={{marginTop:12, height:20, width:'100%', backgroundColor:'transparent', justifyContent:'flex-end', alignItems:'center'}}>
            <Text style={{fontSize:14, color:'white'}}>****동물병원</Text>
          </View>

          <View style={{height:29,width:'100%',backgroundColor:'transparent',alignItems:'center'}}>
          <Text style={{fontSize:24,color:'white'}}>350,000원</Text>
          </View>

          <View style={{height:24,width:'100%',backgroundColor:'transparent',alignItems:'center'}}>
          <Text style={{fontSize:14,color:'white'}}>중성화 수술 전문 병원입니다.</Text>
          </View>

          <View style={{height:24,width:'100%',backgroundColor:'transparent',alignItems:'center'}}>
          <Text style={{fontSize:14,color:'white'}}>Tel: ***-***-****</Text>
          </View>

          <View style={{height:24,width:'100%',backgroundColor:'transparent',alignItems:'center'}}>
          <Text style={{fontSize:14,color:'white'}}>위치: 서울시 마포구</Text>
          </View>

        </View>

        </View>



    )
  }

  statusContainer(){
    return(
      <View style={{padding:10,width:'100%',height:40,backgroundColor:'white',justifyContent:'flex-start',flexDirection:'row',alignItems:'center'}}>
        <Image
                  style={{marginLeft:10, width:17, height:17}}
                  source={require('../Components/Assets/iconInfoGrey.png')}/>
        <Text style={{marginLeft:7, fontSize:12,color:'#525252'}}>연락처/상호 등 블라인드된 정보는 예약확정 후 볼 수 있습니다.</Text>
      </View>
    )
  }

  bookingDateContainer(){
    return(
      <View style={{width:'100%', alignItems:'center'}}>
      <View style={{marginTop:16, width:346, height:78, backgroundColor:'white', borderRadius:4,alignItems:'center'}}>
        <View style={{marginTop:16, width:306, height:18, backgroundColor:'white',flexDirection:'row'}}>
          <Image
                    style={{ width:17, height:17}}
                    source={require('../Components/Assets/iconCalendar.png')}/>
          <Text style={{marginLeft:9,fontSize:12 ,color:'black'}}>예약요청 날짜</Text>

        </View>

        <View style={{ marginTop:10, width:'100%', height:'100%', flexDirection:'row',justifyContent:'center'}}>
        <Text>2019.07.04</Text>
        <Text> / 2019.07.05</Text>
        <Text> / 2019.07.06</Text>
        </View>
      </View>
    </View>
    )
  }

  messageContainer(){
    return(
    <View style={{width:'100%', alignItems:'center'}}>
      <View style={{marginTop:16, width:346, height:170, backgroundColor:'white', borderRadius:4, alignItems:'center'}}>
        <View style={{marginTop:16, width:306, height:18, backgroundColor:'white',flexDirection:'row'}}>
          <Image
                    style={{ width:17, height:17}}
                    source={require('../Components/Assets/iconMessage.png')}/>
          <Text style={{marginLeft:9,fontSize:12 ,color:'black'}}>메세지</Text>

        </View>

        <View style={{marginTop:8, width:303,height:110, backgroundColor:'white'}}>
          <Text style={{fontSize:14, color:'#4a4a4a'}}>토리의 중성화 수술 때문에 걱정이 많으시겠어요. 토리의 경우 중성화 수술이 꼭 필요한 시점입니다. 저희 병원에서는 최신 장비와 풍부한 시술 경험으로 만족스러운 수술이 되도록 최선을 다하고 있습니다. 믿고 맡겨 주세요~!</Text>
        </View>
      </View>
    </View>
    )
  }

  photoContainer(){
    return(
      <View style={{height:196, width:'100%'}}>
        <View style={{height:18, width:'100%', backgroundColor:'transparent', marginTop:31}}>
          <Text style={{marginLeft:20,fontSize:12,backgroundColor:'transparent'}}>병원시설 사진</Text>
        </View>
        <Swiper style={styles.wrapper}
        showsButtons={true}
        showsPagination={false}
        nextButton={
          <View>
          <Image
                    style={{ width:24, height:30}}
                    source={require('../Components/Assets/path10.png')}/>
          </View>

                  }
        prevButton={
          <View>
          <Image
                    style={{ width:24, height:30}}
                    source={require('../Components/Assets/path11.png')}/>
          </View>
                  }
        >
             <View>
               <Image
                        style={{ width:'100%', height:171}}
                         source={require('../Components/Assets/imageHospital.png')}/>
             </View>

             <View>
               <Image
                         style={{ width:'100%', height:171}}
                         source={require('../Components/Assets/hospital2.png')}/>
             </View>

           </Swiper>
      </View>
    )
  }

  firstContainer(){
    return(
      <View style={{marginTop:30, width:'100%', height:62, backgroundColor:'transparent'}}>
        <View style={{height:18, width:'100%',backgroundColor:'transparent'}}>
          <Text style={{marginLeft:20,fontSize:12, color:'#444444'}}>주 진료 과목</Text>
        </View>

        <View style={{flexDirection:'row',justifyContent:'flex-start', alignItems:'center'}}>
          <View style={{marginLeft:20,backgroundColor:'white', borderRadius:4,height:36,paddingTop:14, paddingLeft:14, paddingRight:14, paddingBottom:8}}>
            <Text>안과</Text>
          </View>
          <View style={{marginLeft:8,backgroundColor:'white', borderRadius:4,height:36,paddingTop:14, paddingLeft:14, paddingRight:14, paddingBottom:8}}>
            <Text>소화기과</Text>
          </View>
          <View style={{marginLeft:8,backgroundColor:'white', borderRadius:4,height:36,paddingTop:14, paddingLeft:14, paddingRight:14, paddingBottom:8}}>
            <Text>재활치료</Text>
          </View>
        </View>
      </View>
    )
  }

  secondContainer(){
    return(
      <View style={{marginTop:30, width:'100%', height:62, backgroundColor:'transparent'}}>
        <View style={{height:18, width:'100%',backgroundColor:'transparent'}}>
          <Text style={{marginLeft:20,fontSize:12, color:'#444444'}}>주요 수술</Text>
        </View>

        <View style={{flexDirection:'row',justifyContent:'flex-start', alignItems:'center'}}>
          <View style={{marginLeft:20,backgroundColor:'white', borderRadius:4,height:36,paddingTop:14, paddingLeft:14, paddingRight:14, paddingBottom:8}}>
            <Text>녹내장</Text>
          </View>
          <View style={{marginLeft:8,backgroundColor:'white', borderRadius:4,height:36,paddingTop:14, paddingLeft:14, paddingRight:14, paddingBottom:8}}>
            <Text>중성화수술</Text>
          </View>
          <View style={{marginLeft:8,backgroundColor:'white', borderRadius:4,height:36,paddingTop:14, paddingLeft:14, paddingRight:14, paddingBottom:8}}>
            <Text>슬개골탈구수술</Text>
          </View>
        </View>
      </View>
    )
  }

  thridContainer(){
    return(
      <View style={{marginTop:30, width:'100%', height:62, backgroundColor:'transparent'}}>
        <View style={{height:18, width:'100%',backgroundColor:'transparent'}}>
          <Text style={{marginLeft:20,fontSize:12, color:'#444444'}}>주요 장비</Text>
        </View>

        <View style={{flexDirection:'row',justifyContent:'flex-start', alignItems:'center'}}>
          <View style={{marginLeft:20,backgroundColor:'white', borderRadius:4,height:36,paddingTop:14, paddingLeft:14, paddingRight:14, paddingBottom:8}}>
            <Text>CT</Text>
          </View>
          <View style={{marginLeft:8,backgroundColor:'white', borderRadius:4,height:36,paddingTop:14, paddingLeft:14, paddingRight:14, paddingBottom:8}}>
            <Text>MRI</Text>
          </View>
          <View style={{marginLeft:8,backgroundColor:'white', borderRadius:4,height:36,paddingTop:14, paddingLeft:14, paddingRight:14, paddingBottom:8}}>
            <Text>X-ray</Text>
          </View>
        </View>
      </View>
    )
  }

  fourthContainer(){
    return(
      <View style={{marginTop:30,marginBottom:7, width:'100%', height:143, backgroundColor:'transparent'}}>
      <Text style={{marginBottom:7, marginLeft:20,fontSize:12, color:'#444444'}}>운영 시간</Text>

      <View style={{ width:'100%', height:143, backgroundColor:'transparent'}}>
        <View style={{marginLeft:20, height:118, width:330,backgroundColor:'white',borderRadius:4}}>
          <Text style={{marginLeft:15,marginTop:17, fontSize:16}}>월~금 10:00 - 18:00</Text>
          <Text style={{marginLeft:15,marginTop:6, fontSize:16}}>토 10:00 16:00</Text>
          <Text style={{marginLeft:15,marginTop:6, fontSize:16}}>일요일 공휴일 휴무</Text>
        </View>
      </View>

      </View>
    )
  }

  fifthContainer(){
    return(
      <View style={{paddingTop:30,marginBottom:7, width:'100%', height:210, backgroundColor:'white'}}>
        <View style={{marginRight:20,marginBottom:8, height:18, width:'100%', flexDirection:'row', justifyContent:'flex-start',backgroundColor:'white'}}>
          <Text style={{marginLeft:20,fontSize:12, color:'#444444'}}>리얼리뷰</Text>
          <Text style={{marginLeft:3, fontSize:12, color:'#1ed0a3'}}>13</Text>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('RealReview')}>
          <Text style={{marginLeft:229, fontSize:12, color:'#444444'}}>전체보기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{paddingHorizontal: 20}}
          horizontal={true}
          >
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('RealReview')}>
        <View style={{width:306, height:129, borderRadius:7, backgroundColor:'#f7f6f6'}}>

          <View style={{marginTop:16, marginRight:14, marginLeft:20, backgroundColor:'transparent', width:272, height:24}}>
            <Text style={{fontSize:16}}>노견 토리의 슬개골 수술 후기</Text>
          </View>

          <View style={{marginTop:4, marginRight:14, marginLeft:20, backgroundColor:'transparent', width:272, height:37}}>
            <Text style={{fontSize:12, color:'#8a8a8e'}}>정당은 법률이 정하는 바에 의하여 국가의 보호를 받으며, 국가는 법률이 정하는 바에 의하여 정당운영에 필요</Text>
          </View>

          <View style={{marginTop:8, marginRight:14, marginLeft:20, backgroundColor:'transparent', width:272, height:20}}>
            <Text style={{fontSize:12, color:'#8a8a8e'}}>강형욱 2019.03.05 댓글 5</Text>
          </View>

        </View>
      </TouchableOpacity>

        <View style={{marginLeft:10, width:306, height:129, backgroundColor:'#f7f6f6'}}>

          <View style={{marginTop:16, marginRight:14, marginLeft:20, backgroundColor:'transparent', width:272, height:24}}>
            <Text style={{fontSize:16}}>노견 토리의 슬개골 수술 후기</Text>
          </View>

          <View style={{marginTop:4, marginRight:14, marginLeft:20, backgroundColor:'transparent', width:272, height:37}}>
            <Text style={{fontSize:12, color:'#8a8a8e'}}>정당은 법률이 정하는 바에 의하여 국가의 보호를 받으며, 국가는 법률이 정하는 바에 의하여 정당운영에 필요</Text>
          </View>

          <View style={{marginTop:8, marginRight:14, marginLeft:20, backgroundColor:'transparent', width:272, height:20}}>
            <Text style={{fontSize:12, color:'#8a8a8e'}}>강형욱 2019.03.05 댓글 5</Text>
          </View>
        </View>

        <View style={{marginLeft:10, width:306, height:129, backgroundColor:'#f7f6f6'}}>

          <View style={{marginTop:16, marginRight:14, marginLeft:20, backgroundColor:'transparent', width:272, height:24}}>
            <Text style={{fontSize:16}}>노견 토리의 슬개골 수술 후기</Text>
          </View>

          <View style={{marginTop:4, marginRight:14, marginLeft:20, backgroundColor:'transparent', width:272, height:37}}>
            <Text style={{fontSize:12, color:'#8a8a8e'}}>>정당은 법률이 정하는 바에 의하여 국가의 보호를 받으며, 국가는 법률이 정하는 바에 의하여 정당운영에 필요</Text>
          </View>

          <View style={{marginTop:8, marginRight:14, marginLeft:20, backgroundColor:'transparent', width:272, height:20}}>
            <Text style={{fontSize:12, color:'#8a8a8e'}}>강형욱 2019.03.05 댓글 5</Text>
          </View>
        </View>
        </ScrollView>

      </View>
    )
  }

  bookButton(){
    return(
  <View style={{width:'100%', height:59, justifyContent:'center', alignItems:'center', backgroundColor:'white',borderTopWidth:1, borderColor:'#c7c7cd'}}>
    <TouchableOpacity
                onPress={() => {this.setState({isDisabled: true}), this.refs.modal1.open()}}>
        <Text style={{fontSize:8}}>CASE1-> </Text>
        <Text style={{fontSize:18}}>예약요청</Text>
    </TouchableOpacity>
  </View>

    )
  }

  bookButton2(){
    return(
      <View style={{width:'100%', height:59, justifyContent:'center', alignItems:'center', backgroundColor:'white',borderTopWidth:1, borderColor:'#c7c7cd',flexDirection:'row'}}>
        <View style={{width:'50%', height:'100%',justifyContent:'center',alignItems:'center'}}>

        <TouchableOpacity
                    onPress={() => {this.setState({isDisabled: true}), this.refs.modal2.open()}}>
          <Text style={{fontSize:8}}>CASE2 -> </Text>
          <Text style={{fontSize:18}}>예약취소</Text>
        </TouchableOpacity>

        </View>

        <View style={{backgroundColor:'#1ED0A3', width:'50%', height:'100%',justifyContent:'center',alignItems:'center'}}>

        <TouchableOpacity
                    onPress={() => {this.setState({isDisabled: true}), this.refs.modal2.open()}}>
          <Text style={{fontSize:8, color:'white'}}>CASE2 -></Text>
          <Text style={{color:'white', fontSize:18}}>예약날짜 변경</Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
  return(
  <View style={styles.container}>

    <ScrollView>
        {this.customHeader()}
        {this.statusContainer()}
        {this.bookingDateContainer()}
        {this.messageContainer()}
        {this.photoContainer()}
        {this.firstContainer()}
        {this.secondContainer()}
        {this.thridContainer()}
        {this.fourthContainer()}
        {this.fifthContainer()}


    </ScrollView>
      {this.bookButton()}
      {this.bookButton2()}
      <Modal style={{height: 173, width: 336,backgroundColor:'white'}} position={"center"} ref={"modal1"} isDisabled={this.state.isDisabled}>
        <Text style={{marginTop:22,marginLeft:24,fontSize:20, color:'#4a4a4a'}}>견적 요청 완료</Text>
        <Text style={{marginLeft:24,fontSize:16, color:'#4a4a4a'}}>24시간 내에 견적이 도착할 예정입니다 :)</Text>
      <View style={{padding:20, height:'100%', width:'100%',backgroundColor:'white',alignItems: 'flex-end',justifyContent:'flex-end'}}>
        <Button onPress={() => this.props.navigation.navigate('HospitalMain')} style={{color:'#00a2f5'}} title="닫기"> </Button>
      </View>
      </Modal>

      <Modal style={{height: 173, width: 336,backgroundColor:'white'}} position={"center"} ref={"modal2"} isDisabled={this.state.isDisabled}>
        <Text style={{marginTop:22,marginLeft:24,fontSize:20, color:'#4a4a4a'}}>예약취소 요청</Text>
        <Text style={{marginLeft:24,fontSize:16, color:'#4a4a4a'}}>취소를 위해 유선상으로 연락드릴 예정입니다 :)</Text>
      <View style={{padding:20, height:'100%', width:'100%',backgroundColor:'white',alignItems: 'flex-end',justifyContent:'flex-end'}}>
        <Button onPress={() => this.props.navigation.navigate('HospitalMain')} style={{color:'#00a2f5'}} title="닫기"> </Button>
      </View>
      </Modal>

      <Modal style={{height: 173, width: 336,backgroundColor:'white'}} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
        <Text style={{marginTop:22,marginLeft:24,fontSize:20, color:'#4a4a4a'}}>예약날짜 변경 요청</Text>
        <Text style={{marginLeft:24,fontSize:16, color:'#4a4a4a'}}>원활한 스케줄 변경을 도와드리기위해</Text>
        <Text style={{marginLeft:24,fontSize:16, color:'#4a4a4a'}}>유선상으로 연락드릴 예정입니다 :)</Text>

      <View style={{padding:20, height:'100%', width:'100%',backgroundColor:'white',alignItems: 'flex-end',justifyContent:'flex-end'}}>
        <Button onPress={() => this.props.navigation.navigate('HospitalMain')} style={{color:'#00a2f5'}} title="닫기"> </Button>
      </View>
      </Modal>
  </View>
    )
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor: '#f4f4f4',
  },
  modal: {
   justifyContent: 'center',
   alignItems: 'flex-start',
 },
 modal3: {
   height: 173,
   width: 336
 },
});
