import * as React from 'react';
import { View, Text,ScrollView,TextInput } from 'react-native';
import DropDownComp from '../components/DropDownComp';
import DropDownStaticComp from '../components/DropDownStaticComp';
const items=[{'label':'orange','value':'1'},{'label':'orange1','value':'1'},{'label':'orange2','value':'1'},{'label':'orange3','value':'1'},{'label':'orange','value':'1'},{'label':'orange','value':'1'},{'label':'orange','value':'1'},{'label':'orange','value':'1'}];
const arrayofdata=[{'item':1},{'item':2},{'item':3},{'item':4},{'item':5},{'item':6},{'item':6},{'item':6},{'item':6}]
function DropDownSearch() {
    const [enable,setenable] =React.useState(false);
    const [active,setActive] =React.useState(null);
    
    const setActiveData=(data)=>{
        setActive(data);
        setenable(false);
    }
    // const usedynref=React.useRef();
  return (
   
    <ScrollView  nestedScrollEnabled = {true}  keyboardShouldPersistTaps='always' style={{margin:12}}>
            <DropDownStaticComp floating={true}  textinputStyle={null} dropdownContainerStyle={null} dropdownItemStyle={null} dropdownItemTextStyle={null} activeData={active} activeStyle={{backgroundColor:'blue',color:'white',borderRadius:0}} onsetActive={(data)=>setActiveData(data)} show={enable} items={items} placeholder="RN Placeholder"  setFocus={setenable} />
      </ScrollView>
  );
}
export default DropDownSearch;