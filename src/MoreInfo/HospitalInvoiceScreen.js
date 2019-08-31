import React, {Component} from 'react';
import { View, TextInput, StyleSheet,Text, Image } from 'react-native';

export default class HospitalInvoiceScreen extends Component {
  static navigationOptions = {
  header: null
};
  constructor(props) {
    super(props)
  }
  render() {
  return(
    <View style={styles.container}>
        <Text style={styles.textStyle}>머냥?!</Text>
      </View>
    )
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2374AB',
  }
});
