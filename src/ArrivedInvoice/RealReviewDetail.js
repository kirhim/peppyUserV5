import React, {Component} from 'react';
import {Dimensions,Platform, View, TextInput, StyleSheet,Text, Image, TouchableOpacity,FlatList, SafeAreaView, ImageBackground, ScrollView, Alert, Button, KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'
import {store} from '../Mobx/mobxStore'
import { toJS, observable } from 'mobx';
import { ListItem } from 'react-native-elements'
import PopupDialog, { DialogContent } from 'react-native-popup-dialog';

const {
  height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 30) : 0;
const HeaderHeight = Platform.OS === 'ios' ? (IS_IPHONE_X ? 205 : 170) : 0;

const iconBookOn = require('../Components/Assets/iconBookmarkFill.png')
const iconBookOff = require('../Components/Assets/iconBookmarkWhite.png')

export default class RealReviewDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      noteArray:[],
      noteText: '',
      name:'',
      commentName:'',
      iconBook:false,
      request: this.props.navigation.getParam('request', undefined),
      reply:[],
      commentState:'',
      visible:'',
      editStatus:false
  }
  console.log(this.state.request, 'ffff')
}

  componentWillMount(){
    store.commentName = undefined
    store.reviewDetailIamge = this.state.request.imageUrl.split(',')


    this.props.navigation.addListener ('willFocus', () =>{
      this.makeRemoteRequest()
      store.commentName
    });
}

  makeRemoteRequest = () => {

    fetch('https://peppy.ai/peppy/v1.0/reply?reviewIdx=' + this.state.request.idx + '&offset=0' )
        .then((response) => response.json())
        .then((response) => {
          console.log(response.data,'response reply')
          this.setState({
            reply:response.data
          }, ()=> console.log(this.state.reply, 'state.reply'))
        })
        .catch((error) => {
          console.error(error)
        })
}

  //커스텀 해더
  customHeader(){
    var imgSource = this.state.iconBook? iconBookOn : iconBookOff

    return(
      <View style={{paddingTop:STATUS_BAR_HEIGHT, height:94, backgroundColor:'white',flexDirection:'row', alignItems:'center',justifyContent:'flex-start'}}>

      <TouchableOpacity
          onPress={() => this.props.navigation.navigate('RealReview')} hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}>
          <View style={{marginLeft:20}}>
            <Image
                      style={{ width:20, height:17}}
                      source={require('../Components/Assets/black.png')}/>
          </View>
      </TouchableOpacity>

            <Text style={{paddingLeft:125,fontSize:16}}>글보기</Text>
            <View style={{marginLeft:97}}>

            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('reply'), this.setState({iconBook:!this.state.iconBook}) }}>
            <Image
                      style={{width:17, height:22,marginLeft:0 }}
                      source={ imgSource }/>
            </TouchableOpacity>
            </View>

            <View style={{marginLeft:30}}>

                      <Image
                                style={{width:3, height:18,marginLeft:0 }}
                                source={require('../Components/Assets/iconMore.png')}/>
            </View>
      </View>
    )
  }

  imageContainer(){
    return(
      <View style={{height:261, width:'100%'}}>
        <Swiper style={styles.wrapper}
        dot={(<View style={{backgroundColor: 'white', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />)}
        activeDot={(<View style={{backgroundColor: '#1ed0a3', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />)}
        >
             <View>
               <Image
                        style={{ width:'100%', height:261}}
                         source={{uri: store.reviewDetailIamge[0] }}/>
             </View>

             { store.reviewDetailIamge[1] != undefined ?
             <View>
               <Image
                        style={{ width:'100%', height:261}}
                         source={{uri: store.reviewDetailIamge[1] }}/>
             </View>:null
            }

            { store.reviewDetailIamge[2] != undefined ?
              <View>
                <Image
                         style={{ width:'100%', height:261}}
                          source={{uri: store.reviewDetailIamge[2] }}/>
              </View>:null
             }

             { store.reviewDetailIamge[3] != undefined ?
             <View>
               <Image
                        style={{ width:'100%', height:261}}
                         source={{uri: store.reviewDetailIamge[3] }}/>
             </View>:null
            }

            { store.reviewDetailIamge[4] != undefined ?
            <View>
              <Image
                       style={{ width:'100%', height:261}}
                        source={{uri: store.reviewDetailIamge[4] }}/>
            </View>:null
            }


        </Swiper>
      </View>
    )
  }



  firstContainer(){
    return(
      <View style={{height:110, width:'100%', backgroundColor:'transparent'}}>
        <View style={{marginTop:20, width:'100%', height:20, backgroundColor:'transparent'}}>
          <Text style={{fontSize:14, marginLeft:20}}>리얼리뷰</Text>
        </View>

        <View style={{marginTop:2, width:'100%', height:29, backgroundColor:'transparent'}}>
          <Text style={{fontSize:20,fontWeight:'bold', marginLeft:20}}>{this.state.request.title}</Text>
        </View>

        <View style={{marginTop:15, width:'100%', height:20, backgroundColor:'transparent', flexDirection:'row'}}>
          <View style={{height:20, backgroundColor:'transparent', justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:14, marginLeft:20}}>{this.state.request.writerName}</Text>
          </View>

          <View style={{marginLeft:8, height:20, backgroundColor:'transparent', justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:14,color:'#8a8a8f'}}>{this.state.request.regDate.slice(0, 10)}</Text>
          </View>
        </View>

      </View>
    )
  }

  secondContainer(){
    return(
      <View style={{height:126, width:'100%', backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
        <View style={{paddingLeft:20,height:74, width:350, backgroundColor:'white',borderWidth:0.5, borderColor:'#979797', justifyContent:'center',alignItems:'center',borderRadius:4}}>

        <View style={{marginLeft:20,marginRight:20, height:20, width:'100%', backgroundColor:'transparent', flexDirection:'row'}}>
          <Text style={{fontSize:12, color:'#8a8a8f'}}>
          진료/수술명
          </Text>
          <Text style={{marginLeft:3,fontSize:13, paddingBottom:1}}>
          {this.state.request.medicalKind == 0 ? <Text>중성화수술</Text>:null}
          </Text>
        </View>

        <View style={{marginTop:5, marginRight:20, marginLeft:20, height:20, width:'100%', backgroundColor:'transparent', flexDirection:'row'}}>

         <View style={{width:70, height:20, backgroundColor:'transparent',justifyContent:'flex-start', alignItems:'center', flexDirection:'row'}}>
         <Text style={{fontSize:12, color:'#8a8a8f'}}>성별</Text>
         <Text style={{marginLeft:3,fontSize:13, paddingBottom:3}}>
         {this.state.request.gender == 'm' ? <Text>남아</Text>:null}
         {this.state.request.gender == 'f' ? <Text>여아</Text>:null} </Text>

         </View>

         <View style={{width:70, height:20, backgroundColor:'transparent',justifyContent:'flex-start', alignItems:'center', flexDirection:'row'}}>
            <Text style={{ fontSize:12, color:'#8a8a8f'}}>생년월일</Text>
            <Text style={{ marginLeft:3,fontSize:13,paddingBottom:2 }}>{this.state.request.birthday}</Text>

         </View>

         <View style={{paddingLeft:20, width:70, height:20, backgroundColor:'transparent',justifyContent:'flex-start', alignItems:'center', flexDirection:'row'}}>
            <Text style={{ fontSize:12, color:'#8a8a8f' }}>중성화</Text>
            <Text style={{marginLeft:3,fontSize:13,paddingBottom:1}}>
            {this.state.request.neutral == 0 ?  <Text>완료</Text>:null}
            {this.state.request.neutral == 1 ?  <Text>안함</Text>:null}
            </Text>
         </View>

         <View style={{paddingLeft:30, width:100, height:20, backgroundColor:'transparent',justifyContent:'flex-start', alignItems:'center', flexDirection:'row'}}>
            <Text style={{fontSize:12, color:'#8a8a8f'}}>예방접종</Text>
            <Text style={{marginLeft:3,fontSize:13,paddingBottom:1}}>
            {this.state.request.vaccin == 0 ? <Text>모름</Text>:null}
            {this.state.request.vaccin == 1 ? <Text>접종전</Text>:null}
            {this.state.request.vaccin == 2 ? <Text>접종중</Text>:null}
            {this.state.request.vaccin == 3 ? <Text>접종완료</Text>:null}
            </Text>
         </View>

        </View>

        </View>
      </View>
    )
  }

  textContainer(){
    return(
      <View style={{width:'100%', paddingLeft:20,paddingRight:20, paddingTop:15, paddingBottom:15}}>
        <Text style={{fontSize:16}}>
          {this.state.request.content}
        </Text>
      </View>
    )
  }

  addNote = () => {
    if(this.state.noteText){
      var d = new Date()
      this.state.noteArray.push({
        'date': d.getFullYear() +
        '/' + (d.getMonth() + 1) +
        '/' + d.getDate(),
        'name' : this.state.name,
        'note' : this.props.commentName +' ' + this.state.noteText})
      this.setState({noteArray: this.state.noteArray,
                     noteText : '',
                     })
    }
  }

  deleteNote(key){
    this.state.noteArray.splice(key,1)
    this.setState({noteArray : this.state.noteArray})
  }

  deleteUserName(){
    if(this.state.noteText != ''){
      return(
        null
      )
    }else if(this.state.noteText == '') {
      return(
        this.setState({
          commentName:'',
          commentState:''
        }, ()=> console.log(this.state.commentName, 'commentName'))
      )
    }
  }

  editCommentHandler(){
   if(this.state.editComment != ''){
     return(
       this.state.editComment
     )
   }else{
     return(
       this.state.noteText
     )
   }
  }


  commentContainer(){
    const textWidth = this.state.commentName == '' ? 290:245

    return(
      <View style={{width:'100%', paddingBottom:50}}>
        <View style={{width:'100%', height:40, flexDirection:'row', justifyContent:'flex-start', alignItems:'center',borderBottomWidth:.5, borderColor:'#e4e4e4'}}>
          <Text style={{marginLeft:16, fontSize:14, color:'#4a4a4a'}}>댓글</Text>
          <Text style={{marginLeft:3, fontSize:14, color:'#1ed0a3'}}>{this.state.request.replyCount}</Text>
        </View>



      <View style={{width:'100%', flexDirection:'row'}}>
        <View style={{width:'100%' }}>
        {store.notes}
        </View>
      </View>

      <View style={{height:60, width:375,backgroundColor:'transparent',borderTopWidth:0.5, borderColor:'#979797',flexDirection:'row', justifyContent:'flex-start'}}>

          <View style={{flexDirection:'row', alignItems:'center',backgroundColor:'transparent'}}>

            <View style={{paddingTop:20,marginLeft:0,width:310,height:'100%', backgroundColor:'transparent', alignItems:'center', justifyContent:'flex-start', flexDirection:'row'}}>

            <View style={{paddingTop:7,height:60, paddingLeft:13,justifyContent:'flex-start', alignItems:'flex-start', flexDirection:'row',paddingRight:3,backgroundColor:'transparent'}}>
              <Text style={{ color:'#1ed0a3',paddingBottom:4}}>{this.state.commentName != store.memberObject.name && this.state.commentName != ''? <Text>@  {this.state.commentName}</Text> : null}</Text>

            </View>

              <TextInput
              onChangeText={(noteText) => this.setState({
                noteText:noteText,
                editComment:noteText
              }, ()=> {
                store.replyComment = this.state.noteText
                console.log(this.state.noteText, 'noteText')
                console.log(store.replyComment, 'store.replyComment')
              })}
              value={this.editCommentHandler()}
              multiline={true}
              placeholder='댓글을 입력하세요'
              onKeyPress={({ nativeEvent }) => {
               nativeEvent.key === 'Backspace' ? this.deleteUserName() : null
               }}
              style={{ paddingLeft:0, width:textWidth,height:60,fontSize:15, color:'#4a4a4a', backgroundColor:'transparent'}}/>

            </View>

            {this.state.editStatus == true ?
              <View style={{ width:80,height:50, backgroundColor:'transparent',justifyContent:'center', alignItems:'center'}}>
              <TouchableOpacity onPress={()=> {this.setState({editStatus:!this.state.editStatus}, ()=> console.log(this.state.editStatus,'editStatus')), this.editReplyIfMe()}}>
                <View style={{width:51, height:33, borderRadius:18.5, backgroundColor:'#f7f7f7',alignItems:'center', justifyContent:'center', borderColor:'#979797', borderWidth:0.5}}>
                  <Text style={{fontSize:14, color:'#4a4a4a'}}>수정</Text>
                </View>
              </TouchableOpacity>
              </View>
              :
              <View style={{ width:60,height:50, backgroundColor:'transparent',justifyContent:'center', alignItems:'center'}}>
              <TouchableOpacity onPress={()=> this.postReply()}>
                <View style={{width:51, height:33, borderRadius:18.5, backgroundColor:'#f7f7f7',alignItems:'center', justifyContent:'center', borderColor:'#979797', borderWidth:0.5}}>
                  <Text style={{fontSize:14, color:'#4a4a4a'}}>등록</Text>
                </View>
              </TouchableOpacity>
              </View>
            }

          </View>

        </View>


      </View>
    )
  }

  postReply(){
    fetch('https://peppy.ai/peppy/v1.0/reply', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      comment: this.state.commentState + '' + this.state.commentName + store.replyComment,
      writerIdx:store.memberObject.idx,
      writerName:store.memberObject.name,
      reviewIdx:this.state.request.idx
    }), // data can be `string` or {object}!
  }).then(res => res.json())
      .then((response) => {
        console.log('Success:', JSON.stringify(response))
        this.makeRemoteRequest()
        this.setState({
          noteText:'',
          editComment:'',
          commentName:''
        }, ()=> console.log(this.state.noteText, 'noteText'))
      })
      .catch((error) => {
        console.error('Errors:', (error))
      })
  }


  alertBeforeDelete(){
    return(
    <PopupDialog
      containerStyle={{ justifyContent: 'center', paddingBottom:30, backgroundColor:'transparent'}}
      visible={this.state.visible}
      onTouchOutside={() => {
        this.setState({ visible: false });
      }}
    >
    <View style={{width:336, height:138, backgroundColor:'white', borderRadius:4}}>
      <Text style={{paddingTop:21, paddingLeft:22, fontSize:18}}>댓글을 삭제하시겠습니까?</Text>

      <View style={{paddingLeft:216, paddingTop:48,flexDirection:'row', width:'100%', backgroundColor:'white'}}>
        <TouchableOpacity onPress={() =>this.setState({
                        visible:!this.state.visible
                      }, ()=> console.log(this.state.visible, 'visible'))}>
                <Text style={{paddingRight:20,color:'#8a8a8e', fontSize:14}}>취소</Text>
        </TouchableOpacity>

      <TouchableOpacity onPress={()=> {this.deleteReplyIfMe(),
        this.setState({
          visible:!this.state.visible
      }, ()=> console.log(this.state.visible, 'visible'))}}>
        <Text style={{fontSize:14, color:'red'}}>삭제하기</Text>
      </TouchableOpacity>
      </View>
    </View>

    </PopupDialog>
  )
  }


  deleteReplyIfMe(){
    fetch('https://peppy.ai/peppy/v1.0/reply/' + this.state.replyIdx, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
      .then((response) => {
        console.log('Success:', JSON.stringify(response))
        this.makeRemoteRequest()
      })
      .catch((error) => {
        console.error('Errors:', (error))
      })
  }

  editReplyIfMe(){
    fetch('https://peppy.ai/peppy/v1.0/reply/' + this.state.replyIdx, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      comment:this.state.noteText
    }), // data can be `string` or {object}!
  }).then(res => res.json())
      .then((response) => {
        console.log('Success:', JSON.stringify(response)),
        this.setState({
          noteText:'',
          editComment:''
      }, ()=> console.log(this.state.noteText))
        this.makeRemoteRequest()
      })
      .catch((error) => {
        console.error('Errors:', (error))
      })
  }


  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (

      <ListItem
        containerStyle={{borderBottomWidth:0.5, borderColor:'#e4e4e4',width:352, marginTop:0, marginBottom:6, backgroundColor:'transparent', borderRadius:4}}
        title={
          <View>
          <View style={{width:336, flexDirection:'row'}}>
            <Text style={{color:'#444444', fontSize:14}}>{item.writerName}</Text>
            <Text style={{paddingLeft:6, color:'#8a8a8f',fontSize:12}}>{item.regDate.slice(0,10)}</Text>

            <TouchableOpacity onPress={()=> {
              store.commentName = item.writerName
              this.setState({
                commentName:store.commentName,
                commentState:'@'
              })}
            }>
            <Text style={{paddingLeft:8,fontSize:12,color:'#8a8a8f',paddingTop:2}}>답글쓰기</Text>
            </TouchableOpacity>

            {item.writerName == store.memberObject.name ?
            <TouchableOpacity onPress={()=>
              this.setState({
                  editComment:item.comment,
                  editStatus:true,
                  replyIdx:item.idx
              }, ()=> console.log(this.state.replyIdx, 'editComment'))
            }>
            <Text style={{paddingLeft:8,fontSize:12,color:'#8a8a8f',paddingTop:2}}>수정하기</Text>
            </TouchableOpacity> : null
            }

          </View>

          <View style={{width:336}}>
            <Text style={{color:'#4a4a4a', fontSize:14}}>{item.comment}</Text>
          </View>

          </View>

        }
        leftAvatar={
          <View>

          </View>
        }

        rightAvatar={
          <View>

          {item.writerName == store.memberObject.name ?

          <TouchableOpacity onPress={()=>
            this.setState({
              replyIdx:item.idx,
              visible:true
            },()=> {
              console.log(this.state.replyIdx, 'replyIdx'),
              this.alertBeforeDelete()
              }
              )}
              hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}
            >
            <Image
                   style={{ marginTop:10, width:14, height:13}}
                    source={require('../Components/Assets/iconTrash.png')}/>
          </TouchableOpacity>


                     :null}
          </View>
        }
        >
        </ListItem>

  )

  render() {
    {store.commentName}


  return(
<View style={{flex:1}}>
{this.customHeader()}
<KeyboardAvoidingView behavior="padding">
  <ScrollView>
        <View style={styles.container}>
        {this.imageContainer()}
        {this.firstContainer()}
        {this.secondContainer()}
        {this.textContainer()}

        <View style={{width:'100%', backgroundColor:'red'}}>


        </View>

        </View>

        <View style={{paddingBottom:50}}>
        <FlatList
             keyExtractor={this.keyExtractor}
             renderItem={this.renderItem}
             data={this.state.reply}
           />

        <View>
        </View>

        {this.commentContainer()}
        {this.alertBeforeDelete()}



        </View>
        <View style={{width:'100%', height:50, backgroundColor:'transparent'}} />
  </ScrollView>
</KeyboardAvoidingView>


</View>
    )
  };
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white'
  },
  linearGradient: {
    backgroundColor:'transparent'
  },
});
