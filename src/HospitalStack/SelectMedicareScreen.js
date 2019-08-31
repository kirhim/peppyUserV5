import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { store } from '../Mobx/mobxStore'
import { toJS, observable } from 'mobx'

export default class SelectMedicareScreen extends Component {
  constructor() {
    super();
    this.state = {
      //selectedItems: [],
      items: [],
      medical : '',
      medicalDetail : ''
    };
  }

  componentWillMount() {
    this.getMediKind()
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems: selectedItems })

    selectedItems.forEach((selectedItem) => {
      //console.log(selectedItem, 'selectedItem')
      this.state.items.forEach((item) => {

        item.children.forEach((children) => {

          if (children.idx === selectedItem) {
            store.requestObject.medicalKindIdx = children.idx
            console.log(store.requestObject,'store status')
          }
          

        })
      })
    })
  }

  getMediKind = () => {
    const url = 'https://peppy.ai/peppy/v1.0/medicalKind'

    fetch(url)
      .then(res => res.json())
      .then(res => {

        let tempData = res.data
        let items_ = []
        var kindIdx = 10000;


        tempData.forEach((item) => {
          let findResult = items_.find(kind => {
            return kind.name === item.kind;
          })

          if (findResult === undefined) {
            items_.push({
              name: item.kind,
              idx: kindIdx++,
              children: [item]
            })
          }
          else {
            findResult.children.push(item)
          }
        })
        this.setState({ items: items_ })
      })
      .catch(error => {
        //this.setState({ });
      })
  }

  render() {
    return (
      <SectionedMultiSelect
        confirmText='확인'
        modalSafeAreaView={true}
        hideSearch={true}
        items={this.state.items}
        single={true}
        uniqueKey="idx"
        subKey="children"
        selectText="진료 및 수술을 선택해주세요"
        searchPlaceholderText='지역 검색'
        selectToggleTextColor='blue'
        showDropDowns={true}
        readOnlyHeadings={true}
        onSelectedItemsChange={this.onSelectedItemsChange}
        selectedItems={this.state.selectedItems}
        styles={{
          selectToggleText: { fontSize: 14, color: '#4c4c4c' },
          container: { backgroundColor: 'white', height: 600, marginTop: 50 },
          selectToggle: {
            paddingLeft: 14,
            paddingRight: 14,
            width: '100%',
            height: '100%',
            backgroundColor: 'white'
          },
          button: {
            backgroundColor: '#1ed0a3',
            minHeight: 50
          },
        }}
      />

    );
  }
}
