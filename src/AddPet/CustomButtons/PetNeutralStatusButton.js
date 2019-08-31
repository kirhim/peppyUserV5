import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {store} from '../../Mobx/mobxStore'


class PetNeutralStatusButton extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        selectedButtonOne: store.petNeutralSetting,
             };
      this.selectionOnPressOne = this.selectionOnPressOne.bind(this),
      this.selectionOnPressTwo = this.selectionOnPressTwo.bind(this)
  }

  selectionOnPressOne = (newState) => {
    const newValue = newState
    this.setState({
      selectedButtonOne: newState},
      () =>
      {
      store.myPet.neutral = this.state.selectedButtonOne
      store.newNeutral = this.state.selectedButtonOne

      console.log(store.myPet.neutral,'store.myPet.neutral'),
      console.log(store.newNeutral,'store.newNeutral')

     })
  }

  selectionOnPressTwo = (newState2) => {
    const newValue2 = newState2
    this.setState({
      selectedButtonOne: newState2},
      () =>
      {
      store.myPet.neutral = this.state.selectedButtonOne
      store.newNeutral = this.state.selectedButtonOne
      console.log(store.myPet.neutral,'store.myPet.neutral'),
      console.log(store.newNeutral,'store.newNeutral')
     })
  }

  render() {

    return (
      <View style={{flexDirection:'row'}}>
      <TouchableOpacity
              onPress={()=> this.selectionOnPressOne(0)}
              style={{width:165,height:50, justifyContent:'center',alignItems:'center',borderRadius:4,
              backgroundColor:'white', borderWidth:1,borderColor: this.state.selectedButtonOne === 0 ? '#40baf8' : '#e8e8e8'}}>
        <Text style={{
              color:this.state.selectedButtonOne === 0 ? '#40baf8' : 'black',
              textAlign:'center', fontSize:13}}>{this.props.text1}</Text>
      </TouchableOpacity>

      <TouchableOpacity
              onPress={()=>this.selectionOnPressTwo(1) }
              style={{marginLeft:4,width:165,height:50, justifyContent:'center',alignItems:'center',borderRadius:4,
              backgroundColor:'white', borderWidth:1,borderColor: this.state.selectedButtonOne === 1 ? '#40baf8' : '#e8e8e8'}}>
        <Text style={{color:this.state.selectedButtonOne === 1 ? '#40baf8' : 'black',
                      textAlign:'center', fontSize:13}}>{this.props.text2}</Text>
      </TouchableOpacity>
      </View>
    )
}
}

export default PetNeutralStatusButton
