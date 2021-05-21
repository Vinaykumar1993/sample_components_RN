import * as React from 'react';
import { View, Text,ScrollView,TextInput } from 'react-native';
import DropDownComp from '../components/DropDownComp';
const items=[{'label':'orange','value':'1'},{'label':'orange1','value':'1'},{'label':'orange2','value':'1'},{'label':'orange3','value':'1'},{'label':'orange','value':'1'},{'label':'orange','value':'1'},{'label':'orange','value':'1'},{'label':'orange','value':'1'}];
const arrayofdata=[{'item':1},{'item':2},{'item':3},{'item':4},{'item':5},{'item':6},{'item':6},{'item':6},{'item':6}]
function DropDownSearch() {
    const [arrayofdata_state,set_arrayofdata_state]=React.useState([...arrayofdata]);
    const updateData=(data,index)=>{
        const arrayofdata_state1=[...arrayofdata_state];
        arrayofdata_state1[index].active=data;
        set_arrayofdata_state(arrayofdata_state1);

    }
  return (
   
    <ScrollView>
    {arrayofdata_state.map((obj,index)=>{
        return(
     <DropDownComp arrow={true} onPress={(data)=>updateData(data,index)} value={obj.active} activestyles={{backgroundColor:'grey',color:'white'}} placeholder={"Enter Your Name"} items={items} errormessage="No Data Found"/>
            )
    })}
      </ScrollView>
  );
}
export default DropDownSearch;