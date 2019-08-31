import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {store} from '../../Mobx/mobxStore'


class PetTypeButton extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        selectedButtonOne: store.petTypeSetting,
             };
      this.selectionOnPressOne = this.selectionOnPressOne.bind(this),
      this.selectionOnPressTwo = this.selectionOnPressTwo.bind(this)
  }

  selectionOnPressOne = (newState) => {
    const newValue = newState
    this.setState({
      selectedButtonOne: newState
    },
    ()=>
        {
        store.myPet.dogcat = this.state.selectedButtonOne,
        store.newDogcat = this.state.selectedButtonOne
        console.log(store.myPet.dogcat, 'dogcat')
        console.log(store.newDogcat, 'newDogcat')

      })
  }

  selectionOnPressTwo = (newState2) => {
    const newValue2 = newState2
    this.setState({
      selectedButtonOne: newState2
    },
    ()=>
        {
        store.myPet.dogcat = this.state.selectedButtonOne,
        store.newDogcat = this.state.selectedButtonOne
        console.log(store.myPet.dogcat, 'dogcat')
        console.log(store.newDogcat, 'newDogcat')

      })
  }


  render() {

    return (
      <View style={{flexDirection:'row'}}>
      <TouchableOpacity
              onPress={()=> this.selectionOnPressOne("d")}
              style={{width:82,height:50, justifyContent:'center',alignItems:'center',borderRadius:4,
              backgroundColor:'white', borderWidth:1,borderColor: this.state.selectedButtonOne === "d" ? '#40baf8' : '#e8e8e8'}}>
        <Text style={{
              color:this.state.selectedButtonOne === "d" ? '#40baf8' : 'black',
              textAlign:'center', fontSize:13}}>{this.props.text1}</Text>
      </TouchableOpacity>

      <TouchableOpacity
              onPress={()=>this.selectionOnPressTwo("c") }
              style={{marginLeft:4,width:82,height:50, justifyContent:'center',alignItems:'center',borderRadius:4,
              backgroundColor:'white', borderWidth:1,borderColor: this.state.selectedButtonOne === "c" ? '#40baf8' : '#e8e8e8'}}>
        <Text style={{color:this.state.selectedButtonOne === "c" ? '#40baf8' : 'black',
                      textAlign:'center', fontSize:13}}>{this.props.text2}</Text>
      </TouchableOpacity>
      </View>
    )
}
}

export default PetTypeButton
