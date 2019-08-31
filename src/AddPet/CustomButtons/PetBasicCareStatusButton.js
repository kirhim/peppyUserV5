import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {store} from '../../Mobx/mobxStore'


class PetBasicCareStatusButton extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        selectedButtonOne: store.petVaccinSetting,
             };
             this.selectionOnPressOne = this.selectionOnPressOne.bind(this),
             this.selectionOnPressTwo = this.selectionOnPressTwo.bind(this),
             this.selectionOnPressThree = this.selectionOnPressThree.bind(this),
             this.selectionOnPressFour = this.selectionOnPressFour.bind(this)
  }

  selectionOnPressOne = (newState) => {
    const newValue = newState
    this.setState({
      selectedButtonOne: newState},
      () =>
      {

      store.myPet.vaccin = this.state.selectedButtonOne,
      store.newVaccin = this.state.selectedButtonOne,
      console.log(store.myPet.vaccin, 'myPet.vaccin')
      console.log(store.newVaccin, 'newVaccin')
    })
  }

  selectionOnPressTwo = (newState2) => {
    const newValue2 = newState2
    this.setState({
      selectedButtonOne: newState2},
      () =>
      {
      store.myPet.vaccin = this.state.selectedButtonOne,
      store.newVaccin = this.state.selectedButtonOne,
      console.log(store.myPet.vaccin, 'myPet.vaccin')
      console.log(store.newVaccin, 'newVaccin')
    })
  }

  selectionOnPressThree = (newState3) => {
    const newValue3 = newState3
    this.setState({
      selectedButtonOne: newState3},
      () =>
      {
      store.myPet.vaccin = this.state.selectedButtonOne,
      store.newVaccin = this.state.selectedButtonOne,
      console.log(store.myPet.vaccin, 'myPet.vaccin')
      console.log(store.newVaccin, 'newVaccin')
    })
  }

  selectionOnPressFour = (newState4) => {
    const newValue4 = newState4
    this.setState({
      selectedButtonOne: newState4},
      () =>
      {
      store.myPet.vaccin = this.state.selectedButtonOne,
      store.newVaccin = this.state.selectedButtonOne,
      console.log(store.myPet.vaccin, 'myPet.vaccin')
      console.log(store.newVaccin, 'newVaccin')
    })
  }


  render() {

    return (
      <View style={{flexDirection:'row'}}>
      <TouchableOpacity
              onPress={()=> this.selectionOnPressOne(0)}
              style={{width:78,height:50, justifyContent:'center',alignItems:'center',borderRadius:4,
              backgroundColor:'white', borderWidth:1,borderColor: this.state.selectedButtonOne === 0 ? '#40baf8' : '#e8e8e8'}}>
        <Text style={{
              color:this.state.selectedButtonOne === 0 ? '#40baf8' : 'black',
              textAlign:'center', fontSize:13}}>{this.props.text1}</Text>
      </TouchableOpacity>

      <TouchableOpacity
              onPress={()=>this.selectionOnPressTwo(1) }
              style={{marginLeft:4,width:78,height:50, justifyContent:'center',alignItems:'center',borderRadius:4,
              backgroundColor:'white', borderWidth:1,borderColor: this.state.selectedButtonOne === 1 ? '#40baf8' : '#e8e8e8'}}>
        <Text style={{color:this.state.selectedButtonOne === 1 ? '#40baf8' : 'black',
                      textAlign:'center', fontSize:13}}>{this.props.text2}</Text>
      </TouchableOpacity>

      <TouchableOpacity
              onPress={()=> this.selectionOnPressThree(2)}
              style={{marginLeft:4,width:78,height:50, justifyContent:'center',alignItems:'center',borderRadius:4,
              backgroundColor:'white', borderWidth:1,borderColor: this.state.selectedButtonOne === 2 ? '#40baf8' : '#e8e8e8'}}>
        <Text style={{
              color:this.state.selectedButtonOne === 2 ? '#40baf8' : 'black',
              textAlign:'center', fontSize:13}}>{this.props.text3}</Text>
      </TouchableOpacity>

      <TouchableOpacity
              onPress={()=>this.selectionOnPressFour(3) }
              style={{marginLeft:4,width:78,height:50, justifyContent:'center',alignItems:'center',borderRadius:4,
              backgroundColor:'white', borderWidth:1,borderColor: this.state.selectedButtonOne === 3 ? '#40baf8' : '#e8e8e8'}}>
        <Text style={{color:this.state.selectedButtonOne === 3 ? '#40baf8' : 'black',
                      textAlign:'center', fontSize:13}}>{this.props.text4}</Text>
      </TouchableOpacity>
      </View>
    )
}
}

export default PetBasicCareStatusButton
