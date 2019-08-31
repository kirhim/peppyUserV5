import React from 'react';
import { Image, Text, View } from 'react-native';

export default class ReUseImageWithText extends React.PureComponent {
  render() {
    const { source, text } = this.props;

    return (
      <View style={{ marginLeft: 20, marginTop: 20, width: 50, height: 67, backgroundColor: 'transparent', alignItems: 'center' }}>
        <Image style={{ width: 46, height: 46 }} source={source} />
        <Text style={{ paddingTop: 4, fontSize: 11, color: '#4a4a4a' }}>{text}</Text>
      </View>
    );
  }
}
