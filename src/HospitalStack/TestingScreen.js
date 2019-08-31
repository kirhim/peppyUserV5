import React, {Component} from 'react';
import { View, TextInput,ActivityIndicator, StyleSheet,Text, TouchableHighlight, Image, FlatList,TouchableOpacity,SafeAreaView ,Button} from 'react-native';
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
      error: null,
      refreshing: false,
      data: [],
      page: 0,
      loading: false,
      hasMore: true
    }
  }


  componentWillMount(){
      this.makeRemoteRequest()
    }

  makeRemoteRequest = () => {
    store.reviewList = undefined;
    let curPage = this.state.page;
    const url = 'https://peppy.ai/peppy/v1.0/review?offset=' + curPage


    this.setState({ loading: true })
      fetch(url)
          .then((response) => response.json())
          .then((response) => {
            console.log(response,'reeessspooonnsse')
            if (response.data !== undefined) {
          this.setState({
            data: curPage === 0 ? response.data : [...response.state.data, ...response.data],
            error: response.error || null,
            loading: false,
            refreshing: false,
            hasMore: response.data.length === 0 ? false : true
          });

          console.log(this.state.data, 'data')
          console.log(response, 'res')

        }
        else {
          this.setState({
            loading: false,
            refreshing: false,
            hasMore: false
          });
        }

      })
      .catch(error => {

        this.setState({ error, loading: false, refreshing: false });

      });
  };


  renderFooter = () => {
      if (!this.state.loading) return null
      return (
        <View style={{ paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#CED0CE' }}>
          <ActivityIndicator animating size='large' />
        </View>
      )
    }

handleRefresh = () =>{
  this.setState({
    refreshing: true,
    page: 0,
    data: []
  },
  ()=> {
    this.makeRemoteRequest()
    console.log('handleRefresh')
    }
  )
}

handleLoadMore = () => {

  if (this.state.hasMore) {
    this.setState({
      page: this.state.page + 10,
    }, () => {
      this.makeRemoteRequest()
      console.log('handleloadmore')

    })
  }

}



  renderItem = ({ item }) => (
    <TouchableHighlight
            underlayColor="lightgray"
            onPress={() => {
              console.log(item,'item'),
              this.props.navigation.navigate('RealReviewDetail', {request: item})}}>
    <ListItem
      containerStyle={styles.cardStyle}
      title={<View style={{width:227, height:24, backgroundColor:'transparent'}}><Text style={{fontSize:16}}>{item.title}</Text></View>}
      titleStyle={{fontSize:16, color:'black'}}
      subtitleStyle={{fontSize:13, color:'#8a8a8f'}}
      subtitle={<View style={{height:50}}>
          <Text style={{paddingTop:0,fontSize:12,color:'#8a8a8e'}}>{item.content}</Text>
          <Text style={{paddingTop:4,fontSize:13, color:'#8a8a8e'}}>{item.regDate}  댓글{item.replyCount}</Text>
          </View>}
      leftAvatar={
        <View>
        <Image
                  style={{marginLeft:5, marginBottom:20,width:50, height:50 }}
                  source={{uri: item.imageUrl}} />
        </View>
      }
    />
    </TouchableHighlight>

  )

  apiHandler(){
    return(
      <FlatList
           keyExtractor={item => JSON.parse(item.idx).toString()}
           data={this.state.data}
           renderItem={this.renderItem}
           ListFooterComponent={this.renderFooter}
       refreshing={this.state.refreshing}
       onRefresh={this.handleRefresh}
       onEndReached={this.handleLoadMore}
       onEndThreshold={3}
         />
    )
  }

  render() {
  return(
    <View style={styles.container}>
      {this.apiHandler()}
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
    borderRadius:0, paddingTop:-10,marginLeft:0,marginRight:0, backgroundColor:'white',width:'100%', height:127,borderBottomWidth:1,
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2
  }
});
