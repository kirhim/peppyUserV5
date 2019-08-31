import React, { Component } from 'react';
import { View,SafeAreaView,Text } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {store} from '../Mobx/mobxStore'
import { toJS, observable } from 'mobx'
import {connect} from 'react-redux'


var switchData = store.petListSetting

//강아지 고양이 품종
export default class SelectPetType extends Component {
  constructor() {
    super();
    this.state = {
      selectedItems: [],
      items:[],
      petList:[],
      petkind:this.petTypeNameHandler()
    };
  }

  componentWillMount() {
    this.getPetKind()
    console.log(this.state.items,'petitems')

  }


  petTypeNameHandler(){
    if(store.petKindSetting == 1){
      return '말티즈'
    }
    else if(store.petKindSetting == 2){
      return '포메라이언'
    }
    else if(store.petKindSetting == 3){
      return '푸들'
    }
    else if(store.petKindSetting == 4){
      return '뱅갈'
    }
    else if(store.petKindSetting == 5){
      return '샴'
    }
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems:selectedItems }, ()=>
    console.log(this.state.selectedItems, 'this.state.selectedItems')
)
    selectedItems.forEach((selectedItem)=> {
      this.setState({
        newSelectedItem:selectedItem
      }, ()=> {
        console.log(this.state.newSelectedItem, 'newSelectedItem'),
        store.petKindSetting = this.state.newSelectedItem
        {this.petTypeNameHandler()}
        console.log(store.petKindSetting, 'store.petKindSetting')
    })

      this.state.items.forEach((item)=>{
      console.log(item, 'item')

      item.children.forEach((children)=>{
        console.log(children, 'children')
            this.setState({petType:children,
                           petTypeDetail:children},
              () => {
                console.log(this.state.petType, 'petType')
                console.log(this.state.petTypeDetail, 'petTypeDetail')
          })
        })
      })
    })
  }

  getPetKind = () => {
  const url = 'https://peppy.ai/peppy/v1.0/petKind'

  fetch(url)
    .then(res => res.json())
    .then(res => {

      let tempData = res.data
      let items_ = []
      var kindIdx = 10000;


      tempData.forEach((item) => {
        let findResult = items_.find(kind=>{
          console.log(item, 'tempData.forEach')
          this.setState({
            petList:[...this.state.petList, item]
          },()=> {
            console.log(this.state.petList,'state petList')
            store.petListSetting = this.state.petList})

            var newPetListSetting = this.state.petList.map(name => name.name)
            console.log(newPetListSetting, 'newPetListSetting')


          return kind.name === item.dogcat
        })

        if(findResult === undefined)
        {
          items_.push({
            name: item.dogcat,
            idx: kindIdx++,
            children:[item]
          })
        }
        else{
          findResult.children.push(item)
        }
      })

      this.state.items.map((itemsForEach)=> {
        console.log(itemsForEach, 'itemsForEach')
      })
      this.setState({items:items_}, ()=> {
        console.log(this.state.items[0].children[0].name,'items state')
        console.log(this.state.items.forEach)})
    })
    .catch(error => {
      //this.setState({ });
    })
}

// switchData(){
//   const dogPath = this.state.items[0].children
// if(dogPath[0].name == '말티즈')
// }

  selectTextHandler(){
    if(store.petKindSetting == 1){
      return(
        <Text>말티즈</Text>
      )
    }else if (store.petKindSetting == 2) {
      return(
        <Text>포메라이언</Text>
      )
    }else if (store.petKindSetting == 3) {
      return(
        <Text>푸들</Text>
      )
    }else if (store.petKindSetting == 4) {
      return(
        <Text>뱅갈</Text>
      )
    }else if (store.petKindSetting == 5) {
      return(
        <Text>샴</Text>
      )
    }
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
          selectText={this.selectTextHandler()}
          searchPlaceholderText='지역 검색'
          selectToggleTextColor='blue'
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          styles={{
            selectToggleText:{fontSize:14,color:'#4c4c4c'},
            container:{backgroundColor:'white',height:600,marginTop:50},
            selectToggle: {
                         paddingLeft:14,
                         paddingRight:14,
                         width: '100%',
                         height: '100%',
                         backgroundColor:'white'
                        },
              button: {
              backgroundColor:'#1ed0a3',
              minHeight:50
            },
          }}
        />

    );
  }
}
