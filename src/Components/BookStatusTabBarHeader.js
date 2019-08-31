import React, {Component} from 'react';
import { View, TextInput, StyleSheet,Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';

export default class BookStatusTabBarHeader extends Component {
  constructor(props) {
    super(props)
  }
  render() {
  return(
  <SafeAreaView style={{backgroundColor:'white'}}>
    <View style={{height:50, width:'100%',backgroundColor:'white',alignItems: 'center', justifyContent: 'space-between', flexDirection:'row'}}>
    <TouchableOpacity
    onPress={() => this.props.navigation.navigate('Hospital')} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
      <Image
                style={{width:20, height:17,marginLeft:20 }}
                source={require('../Components/Assets/black.png')}/>
    </TouchableOpacity>
      <Text style={{fontSize:16, color:'black'}}>예약내역</Text>

      <Text style={{fontSize:16, marginRight:20, color:'white'}}></Text>


    </View>
  </SafeAreaView>
    )
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'red',
  }
});
