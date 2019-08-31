import React, {Component} from 'react';
import { View, Alert, AsyncStorage,ActivityIndicator, TextInput, StyleSheet, Keyboard, Text, Button,StatusBar } from 'react-native';
import { AsyncTrunk } from 'mobx-sync'
import { store } from '../Mobx/mobxStore'
import { toJS, observable } from 'mobx';

const trunk = new AsyncTrunk(store, {
    storage: AsyncStorage,
    storageKey: '__persist_mobx_stores__',
  });


export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
   super(props);
   //로그아웃 처리하기 샘플
   /*
   store.memberEmail = undefined;
   store.memberObject = undefined;
   trunk.updateStore(store)
   */
 }


componentWillMount(){
   trunk.init().then(() => {
       // do any staff with loaded store
       if(store.memberObject != undefined)
   {
     //console.log(toJS(store.memberObject), 'memberObject')

     //alert('자동로그인 되었습니다 :)')
     this.props.navigation.navigate('ButtomTab');
   }
  else{
    //console.log(toJS(store.memberObject), 'memberObject')

    //alert('로그인 정보가 없습니다')
    this.props.navigation.navigate('Auth');
     }
 })
}


  render() {

    return (
      <View style={styles.WrapContainer}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2374AB',
  },
  input: {
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 3,
    backgroundColor: '#ffffff70',
    marginVertical: 5,
  },
});
