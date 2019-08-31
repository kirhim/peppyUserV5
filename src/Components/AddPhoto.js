import React, {Component} from 'react';
import { View, TextInput, StyleSheet,Text,TouchableOpacity, Image,Dimensions,Platform } from 'react-native';
import {store} from '../Mobx/mobxStore'
import { toJS, observable } from 'mobx';
import { RNS3 } from 'react-native-aws3'
import SwiperFlatList from 'react-native-swiper-flatlist'
import ImagePicker from 'react-native-image-crop-picker'

export default class AddPhoto extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amazonData: [],
      pictures:'',
      showsPagination:'',
      textStatus:true,
    }
  }

  takePics = () => {

      ImagePicker.openPicker({
        multiple: true,
        maxFiles: 1
      }).then(response => {
        store.amazonData = [];

        console.log(response,'imaage')

        let tempArray = []

        response.forEach((item) => {
          let image = {
            uri: item.path,
            width: item.width,
            height: item.height,
            name: item.filename,
            type: 'image/png'

          }
          const config = {

            bucket: 'goodvet',
            region: 'ap-northeast-2',
            accessKey: 'AKIAIJ4ZNXCKL6CIYIXQ',
            secretKey: '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',
            successActionStatus: 201
          }
          tempArray.push(image)

          RNS3.put(image, config)
            .then(responseFromS3 => {
              console.log(responseFromS3, 'responseFromS3')
              this.setState({ amazonData: [...this.state.amazonData, responseFromS3.body.postResponse.location] },
              ()=>
              {
              store.amazonData = this.state.amazonData,
              console.log(store.amazonData,'store.amazonData')
              })
            })
        })
        this.setState({ pictures: tempArray },
        console.log(this.state.picture, 'pictures'))
        { this.hideIcons() }

      })
    }

    hideIcons() {
      if (this.state.pictures.length <= 1) {
        this.setState({ textStatus: false })
        this.setState({ showsPagination: false })
      }
      else if (this.state.pictures.length === 1) {
        this.setState({ showsPagination: false })
        this.setState({ textStatus: false })
      }
      else {
        this.setState({ showsPagination: true })
        this.setState({ textStatus: false })
      }
    }

    takePicHandler() {
      return (
        <View style={{marginTop:40, width:'100%', height:110, alignItems:'center', justifyContent:'center', backgroundColor:'transparent',paddingBottom:20}}>
        <View style={{ width: 106,borderRadius:53, height: 106, backgroundColor: 'transparent', borderBottomWidth: 0.3, borderColor: 'gray', alignItems:'center', justifyContent:'center'}}>
        {
          this.state.textStatus ?
                  <Image
                            style={{marginTop:1,width:'100%', height:'100%',backgroundColor:'transparent' }}
                            source={require('../Components/Assets/iconEmptyimage.png')}/>
                             :null
        }
            <SwiperFlatList
              data={this.state.pictures}
              renderItem={({ item }) =>
                <View style={styles.uploadedImageView}>
                  <Image
                    style={{ width: "100%", height: '100%',borderRadius:53, alignItems:'center', justifyContent:'flex-end' }}
                    source={item}>
                  </Image>
              </View>
              }
                />
        </View>
      </View>
      )
    }

  addPhotoIconStyle(){
      return(
        <TouchableOpacity
                        underlayColor="gray"
                        onPress={this.takePics.bind(this)} hitSlop={{top: 40, bottom: 40, left: 40, right: 40}} >
          <View style={{marginLeft:212,marginTop:-30,width:26,height:26, backgroundColor:'#00a2f5', borderRadius:13,justifyContent:'center', alignItems:'center'}}>
              <Image
                        style={{  width:13, height:13}}
                        source={require('../Components/Assets/iconPlusWhite.png')} />
          </View>

        </TouchableOpacity>
      )
  }

  render() {
  return(
    <View>
      {this.takePicHandler()}
      {this.addPhotoIconStyle()}
    </View>
    )
  };
}

const styles = StyleSheet.create({
  uploadedImageView: {
  width: 106,
  height: 106,
  backgroundColor:'transparent'
 }
});
