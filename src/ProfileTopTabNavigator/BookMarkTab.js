import React, {Component} from 'react';
import {ScrollView, View, TextInput,ActivityIndicator, StyleSheet,Text, TouchableHighlight, Image, FlatList,TouchableOpacity,SafeAreaView ,Button, Alert} from 'react-native';
import { ListItem } from 'react-native-elements'
import { toJS, observable } from 'mobx';
import {store} from '../Mobx/mobxStore'

export default class BookMarkTab extends Component {
  static navigationOptions  = ({ navigation }) => {
    header : null
  }

  constructor(props) {
    super(props)
    this.state = {
      error:null,
      refreshing: false,
      data:[],
      page:0,
      loading:false,
      hasMoreData:true
    }
  }


  componentWillMount(){
    store.filterShowAll = true
    this.props.navigation.addListener ('willFocus', () =>{
      this.makeRemoteRequest()
    })
  }

  makeRemoteRequest = async () => {
    console.log('makeRemoteRequest called');

    if(this.state.loading == true) return

    const url = 'https://peppy.ai/peppy/v1.0/bookmark?offset=' + this.state.page * 10 + '&memberIdx=' + store.memberObject.idx
    //console.log(url, 'bookmark url')

    this.setState({ loading: true });

    fetch(url)
    .then(res => res.json())
    .then(res => {
      //console.log(res.data)

      if(res.data.length == 10)
      {
        this.setState({
          hasMoreData: true,
        });
      }
      else{
        this.setState({
          hasMoreData: false,
        });
      }

      let newData = res.data;
      if(this.state.page == 0) {
        newData = res.data
      }
      else{
        newData = [...this.state.data, ...res.data]
      }

      this.setState({
        data: newData,
        error: res.error || null,
        loading: false,
        refreshing: false
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
        height:1,
        width: "100%",
        backgroundColor: '#CED0CE',
      }}/>
  )
}


handleRefresh = () =>{
  this.setState({
    page:0,
    refreshing:true,
    error:null,
    hasMoreData:true
  },
  ()=> {
    this.makeRemoteRequest()
    }
  )
}


handleLoadMore = () =>{
  if(this.state.hasMoreData)
  {
    console.log("load more")
    this.setState({
      page: this.state.page + 1 ,
    }, ()=> {
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

  for(let i=0 ; i < imageSplice.length; i++)
  {
    result.push(<Image
      style={styles.scrollviewImageStyle}
      source={{uri:store.imageSplice[i]}} />);
  }
  return result
}


  renderItem = ({ item, index }) => {
    
    return (

    <View>
    <View style={{marginTop:20, marginLeft:20, width:'100%', backgroundColor:'transparent'}}>

    <View style={{flexDirection:'row'}}>
      <Image
                  style={{width:40, height:40, borderRadius:20 }}
                  source={{uri: item.writerImgUrl}} />
      <View style={{paddingLeft:10}}>
        <Text style={{fontSize:14}}>{item.writerName}</Text>
        <Text style={{paddingLeft:0,fontSize:12,color:'#8a8a8f'}}>{item.regDate.slice(0,10)}</Text>
      </View>
    </View>

    <View style={{marginTop:14, width:'100%', backgroundColor:'transparent', marginBottom:4}}>
      <Text style={{fontSize:18, color:'#16bb92'}}>{item.hashtags}</Text>
    </View>

    <View style={{flexDirection:'row'}}>
    <View style={{width:270, height:40, backgroundColor:'transparent'}}>
      <Text>{item.content}</Text>
    </View>

    <TouchableOpacity
               onPress={() => {
                 //console.log(item,'item'),
                 this.props.navigation.navigate('RealReviewDetail', {request: item})}}>
    <View style={{marginTop:16,width:58, height:20, backgroundColor:'transparent',paddingLeft:3}}>
      <Text style={{color:'#aeaeb4', fontSize:14}}>⋅⋅⋅더 보기</Text>
    </View>
    </TouchableOpacity>
    </View>



    </View>

    <ScrollView
    showsHorizontalScrollIndicator={false}
    horizontal={true} style={{width:'100%'}}>
      {this.createScrollImageSources(item.imageUrl)}
    </ScrollView>

      <View style={{flexDirection:'row', marginBottom:20, borderBottomWidth:0.1, borderColor:'#e4e4e4'}}>
        <Text style={{ marginLeft:20, color:'#8a8a8f',fontSize:12}}>진료/수술시기 {item.regDate.slice(0,10)}</Text>
        <Text style={{paddingLeft:12, color:'#8a8a8f',fontSize:12}}>댓글{item.replyCount}</Text>
      </View>

    </View>

  )
}
/*
  filterData(){

    if(store.filterCat == true && store.filterDog == false && store.filterShowAll == false){
      return(
        store.filterCatList
      )
    }else if (store.filterDog == true && store.filterCat == false && store.filterShowAll == false ){
      return(
        store.filterDogList
      )
    }
    else if(store.filterShowAll == true ){
      return(
        this.state.newData
      )
    }
    else if(store.filterNeuter == true && store.filterShowAll == false && store.filterCat == false && store.filterDog == false ){
      return(
        store.filterNeuterList
      )
    }
    else if(store.filterBone == true && store.filterShowAll == false && store.filterCat == false && store.filterDog == false){
      return(
        store.filterBoneList
      )
    }
    else if(store.filterScaling == true && store.filterShowAll == false && store.filterCat == false && store.filterDog == false){
      return(
        store.filterScalingList
      )
    }
    else if(store.filterBlood == true && store.filterShowAll == false && store.filterCat == false && store.filterDog == false){
      return(
        store.filterBloodList
      )
    }
    else if(store.filterInjection == true && store.filterShowAll == false && store.filterCat == false && store.filterDog == false){
      return(
        store.filterInjectionList
      )
    }

  }

  */
  _keyExtractor = (item, index) => index.toString();
  
  apiHandler(){
    return(
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

    )
  }

  render() {
    return(
      <View style={styles.container}>
        <View style>
        {this.apiHandler()}
        </View>
      </View>
    )
  };
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  cardStyle: {
    borderRadius:0, paddingTop:-10,marginLeft:0,marginRight:0, backgroundColor:'white',width:'100%',borderBottomWidth:1,
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2
  },
  scrollviewImageStyle :{
    marginLeft:20, 
    marginBottom:20,
    width:120, 
    height:120, 
    borderRadius:4 ,
    resizeMode:'cover'
  }
});
