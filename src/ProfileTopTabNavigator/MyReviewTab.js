import React, {Component} from 'react';
import { View, TextInput, StyleSheet,Text, TouchableHighlight, ScrollView, Image, FlatList,TouchableOpacity,SafeAreaView ,Button} from 'react-native';
import { ListItem } from 'react-native-elements'
import { toJS, observable } from 'mobx';
import {store} from '../Mobx/mobxStore'


export default class MyReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
        error:null,
        refreshing: false,
        data:[],
        page:0,
        loading:false,
    }
  }

  componentWillMount(){
    this.makeRemoteRequest()
    this.props.navigation.addListener ('willFocus', () =>{
      // do whatever you want to do when focused
      this.makeRemoteRequest()
    })
    }

  makeRemoteRequest = () => {
      const url = 'https://peppy.ai/peppy/v1.0/review?writerIdx=' + store.memberObject.idx + '&offset=' + this.state.page

      this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: [...this.state.data, ...res.data],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
        //리뷰 순서대로 나열
        this.setState({
          data:this.state.data.sort((a, b) => b.idx - a.idx)
        }, ()=> console.log(this.state.data, 'newdata'))

        //리랜더링 할때 중복되는 리스트 삭제
        const newData = this.state.data
        var result = newData.reduce((unique, o) => {
          if(!unique.some(obj => obj.idx === o.idx)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.setState({
        fuck:result
      }, ()=> console.log(this.state.fuck,'fuck'))

      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false });
      });
  };

    renderFooter = ()=>{
      if (!this.state.loading) return null

      return(
        <View style={{width:'100%', height:430, justifyContent:'center', alignItems:'center', backgroundColor:'transparent'}}>
        <Image
                  style={{width:50, height:50, borderRadius:4 }}
                  source={require('../Components/Assets/loading.gif')}/>
        </View>
      )
    }

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
        page:1,
        refreshing:true,
        page:this.state.page + 10,
      },
      ()=> {
        this.makeRemoteRequest()
        }
      )
    }

    handleLoadMore = () =>{
      this.setState({
        page: this.state.page + 1 ,
      }, ()=> {
        this.makeRemoteRequest()
      })
    }


  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => {
    store.imageSplice = item.imageUrl.split(',')
    console.log(toJS(store.imageSplice), 'store.imageSplice')
    return (

    <View>
    <View style={{marginTop:20, marginLeft:20, width:'100%', backgroundColor:'transparent'}}>

    <View style={{flexDirection:'row'}}>
      <View style={{width:40, height:40, borderRadius:20, borderColor:'transparent', borderWidth:1, alignitems:'center', justifyContent:'center'}}><Text>{item.idx}</Text></View>
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
                 console.log(item,'item'),
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

      <Image
                  style={{marginLeft:20, marginBottom:20,width:120, height:120, borderRadius:4 }}
                  source={{uri:store.imageSplice[0]}} />

                  { store.imageSplice[1] != undefined ?
                    <Image
                                style={{marginLeft:20, marginBottom:20,width:120, height:120, borderRadius:4 }}
                                source={{uri:store.imageSplice[1]}} />: null
                  }

                  { store.imageSplice[2] != undefined ?
                    <Image
                                style={{marginLeft:20, marginBottom:20,width:120, height:120, borderRadius:4 }}
                                source={{uri:store.imageSplice[2]}} />:  null
                  }

                  { store.imageSplice[3] != undefined ?
                    <Image
                                style={{marginLeft:20, marginBottom:20,width:120, height:120, borderRadius:4 }}
                                source={{uri:store.imageSplice[3]}} />:  null
                  }

                  { store.imageSplice[4] != undefined ?
                    <Image
                                style={{marginLeft:20, marginBottom:20,width:120, height:120, borderRadius:4 }}
                                source={{uri:store.imageSplice[4]}} />:  null
                  }
    </ScrollView>

      <View style={{flexDirection:'row', marginBottom:20, borderBottomWidth:0.1, borderColor:'#e4e4e4'}}>
        <Text style={{ marginLeft:20, color:'#8a8a8f',fontSize:12}}>진료/수술시기 {item.regDate.slice(0,10)}</Text>
        <Text style={{paddingLeft:12, color:'#8a8a8f',fontSize:12}}>댓글{item.replyCount}</Text>
      </View>

    </View>

  )
}

  render() {
  return(
    <View style={styles.container}>
    <FlatList
       data={this.state.fuck}
       renderItem={this.renderItem}
       keyExtractor={(item, index) => index.toString()}
       ItemSeparatorComponent={this.renderSeparator}
       refreshing={this.state.refreshing}
       onRefresh={this.handleRefresh}
       />

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
    borderRadius:0, marginTop:0,marginLeft:0,marginRight:0, backgroundColor:'white',width:'100%', height:127,borderBottomWidth:1,
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2
  }
});
