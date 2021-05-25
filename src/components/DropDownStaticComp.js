import React,{useRef,useState,useEffect} from 'react';
import AnimatedTextInput from './AnimatedTextInput';
import {Animated,Text,View,TextInput,Modal,ScrollView,TouchableOpacity,Dimensions,Keyboard, KeyboardEvent,KeyboardAvoidingView,Image,StatusBar,StyleSheet} from 'react-native';
const DropDownStaticComp=({setFocus,show,index,items,activeData,activeStyle,onsetActive,placeholder,textinputStyle,dropdownItemTextStyle,dropdownItemStyle,dropdownContainerStyle,...rest})=>{

	const [items_data,setItems] = useState(null);
	const [filter_items_data,setFilterItems] = useState(null);
	 useState(()=>{
    setItems([...items]);
    setFilterItems([...items]);
  },[items])
	 const filterItmes=(value)=>{
    console.log("values",value);
    // const filter_clone=[...fukter]
    setItems([...filter_items_data].filter((obj)=>obj.label.toLowerCase().includes(value.toLowerCase())));
  }
	return(
			<View>
			{!show&&(rest.floating?
    		<AnimatedTextInput  value={activeData&&activeData.label} placeholder_text={placeholder} onChangeText={(data)=>filterItmes(data)} onFocus={()=>setFocus(true)} onEndEditing={()=>setFocus(false)}  style={[{borderWidth:1,height:50,paddingHorizontal:15,borderRadius:10},{...textinputStyle}]}/>:<TextInput  value={activeData&&activeData.label} placeholder={placeholder} onChangeText={(data)=>filterItmes(data)} onFocus={()=>setFocus(true)} onEndEditing={()=>setFocus(false)}  style={[{borderWidth:1,height:50,paddingHorizontal:15,borderRadius:10},{...textinputStyle}]}/>)
		}
			{show&&
    		<TextInput value={null}  placeholder={placeholder} onChangeText={(data)=>filterItmes(data)} onFocus={()=>setFocus(true)} onEndEditing={()=>setFocus(false)}  style={[{borderWidth:1,height:50,paddingHorizontal:15,borderRadius:10},{...textinputStyle}]}/>
		}
    {show&&
    	<View style={{borderWidth:1,paddingVertical:5,borderRadius:10,marginTop:15,...dropdownContainerStyle}}>
    <ScrollView  keyboardShouldPersistTaps='always' nestedScrollEnabled = {true} style={{minHeight:100,maxHeight:200,borderRadius:10,overFlow:'hidden'}}>
    {items_data&&items_data.map((obj1)=>{
    	const getactivestyle=activeData&&activeData.label==obj1.label&&{...activeStyle};
      return(
      	<TouchableOpacity onPress={()=>onsetActive(obj1)}>
          <View style={[{height:50,flexDirection:'row',alignItems:'center',paddingHorizontal:15,borderRadius:10},{...dropdownItemStyle},getactivestyle]}>
            <Text style={[{color:'black'},{...dropdownItemTextStyle},getactivestyle]}>{obj1.label}</Text>
          </View>
          </TouchableOpacity>
        )
    })}
    </ScrollView>
    	{(!items_data||(items_data&&items_data.length==0))&&
    			<View style={{...StyleSheet.absoluteFill,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
    				<Text style={{color:'black'}}>No Data Found</Text>
    			</View>
    	}
    </View>
    }

    </View>
		)
}
export default DropDownStaticComp;