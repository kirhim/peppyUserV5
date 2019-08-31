import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {store} from '../../Mobx/mobxStore'


class PetSexTypeButton extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        selectedButtonOne: store.petGenderSetting,
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
      store.myPet.gender = this.state.selectedButtonOne,
      store.newgender = this.state.selectedButtonOne

      console.log(store.myPet.gender, 'gender')
      console.log(store.newgender, 'newgender')

    })
  }

  selectionOnPressTwo = (newState2) => {
    const newValue2 = newState2
    this.setState({
      selectedButtonOne: newState2},
      () =>
      {
      store.myPet.gender = this.state.selectedButtonOne,
      store.newgender = this.state.selectedButtonOne
      console.log(store.myPet.gender, 'gender')
      console.log(store.newgender, 'newgender')
    })
  }

  render() {

    return (
      <View style={{flexDirection:'row'}}>
      <TouchableOpacity
              onPress={()=> this.selectionOnPressOne("m")}
              style={{width:72,height:50, justifyContent:'center',alignItems:'center',borderRadius:4,
              backgroundColor:'white', borderWidth:1,borderColor: this.state.selectedButtonOne === "m" ? '#40baf8' : '#e8e8e8'}}>
        <Text style={{
              color:this.state.selectedButtonOne === "m" ? '#40baf8' : 'black',
              textAlign:'center', fontSize:13}}>{this.props.text1}</Text>
      </TouchableOpacity>

      <TouchableOpacity
              onPress={()=>this.selectionOnPressTwo("f") }
              style={{marginLeft:4,width:74,height:50, justifyContent:'center',alignItems:'center',borderRadius:4,
              backgroundColor:'white', borderWidth:1,borderColor: this.state.selectedButtonOne === "f" ? '#40baf8' : '#e8e8e8'}}>
        <Text style={{color:this.state.selectedButtonOne === "f" ? '#40baf8' : 'black',
                      textAlign:'center', fontSize:13}}>{this.props.text2}</Text>
      </TouchableOpacity>
      </View>
    )
}
}

export default PetSexTypeButton
