import React,{useRef,useState,useEffect} from 'react';
import {Animated,Text,View,TextInput,Modal,ScrollView,TouchableOpacity,Dimensions,Keyboard, KeyboardEvent,KeyboardAvoidingView,Image,StatusBar} from 'react-native';
//import Modal from 'react-native-modal';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log("****",StatusBar.currentHeight);
const renderTextInput=(placeholder,setmodalstate,newinputref,rest)=>{
  return(
  <TextInput onChangeText={(value)=>rest.onSearchText(value)} ref={newinputref} autoFocus={true} style={{height:48,paddingLeft:10,width:'100%'}}  placeholder={"Search"}/>
  )
}
const ModalWrapper=({visible,setmodalstate,layout,keyboardHeight,newinputref,activestyles,placeholder,...rest})=>{
	const exactheight=(windowHeight-keyboardHeight);
	const getHeight=exactheight-(layout.y);
  // console.log("gg",layout.y,windowHeight/2);
	const checkhalf=(layout.y+layout.height+50)>(windowHeight/2);
	const keyboardHeightcalc=((exactheight*layout.y))/(exactheight);
	const bottomheight=exactheight-(layout.y+layout.height+(keyboardHeight?StatusBar.currentHeight:0));
	// console.log("getbottomHeight",bottomheight);
	// console.log("getbottomHeight",bottomheight,layout.y);
	const styleprops=checkhalf?{position:'absolute',left:layout.x,bottom:bottomheight>=0?bottomheight:0,backgroundColor:'transparent',width:layout.width}:{position:'absolute',left:layout.x,top:((layout.y)),backgroundColor:'transparent',width:layout.width}
  return (
  	<Modal animationType={'fade'} visible={visible} onRequestClose={()=>{setmodalstate(false);rest.onSearchText("");}} transparent={true}>
     <KeyboardAvoidingView
     style={{flex:1}}
    
  >
      <TouchableOpacity activeOpacity={1} style={{flex:1}} onPress={()=>setmodalstate(false)}>
        	
        <View style={[styleprops]}>
        {!checkhalf&&
        <View style={styles.wrapper}>
        	{renderTextInput(placeholder,setmodalstate,newinputref,rest)}
        	</View >
        }
        	<ScrollView  keyboardShouldPersistTaps='always' style={{maxHeight:layout.height*3,marginTop:!checkhalf?12:0,marginBottom:checkhalf?12:0,backgroundColor:'white',borderWidth:0,elevation:12,borderRadius:5}}>
          {rest.itemsData&&rest.itemsData.map((obj,index)=>{
            const activestyles_item=(rest.value&&rest.value.label==obj.label)?activestyles:null;
            {/*console.log("activestyles_item",activestyles_item)*/}
            return(
              <TouchableOpacity onPress={()=>{
                setmodalstate(false);
                rest.onPress&&rest.onPress(obj);

              }}
               key={`new_index_${index+1}`} style={[styles.modaltextbottom,{height:layout.height},{...activestyles_item}]}>
              <Text style={[styles.modaltextstyle,{...activestyles_item}]}>{obj.label}</Text>
              </TouchableOpacity>
              )
          })}
          {(!rest.itemsData||(rest.itemsData&&rest.itemsData.length==0))&&
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',flex:1,height:layout.height*3}}>
            <View>
            <Text>
            {rest.errormessage?rest.errormessage:'No Data'}
            </Text>
            </View>
            </View>
          }
        </ScrollView>
        {checkhalf&&
        <View style={styles.wrapper}>
        	{renderTextInput(placeholder,setmodalstate,newinputref,rest)}
        	</View >
        }
        </View>
       
        </TouchableOpacity>
        </KeyboardAvoidingView>
        </Modal>
  );
}
export const useKeyboard = (): [number] => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function onKeyboardDidShow(e: KeyboardEvent): void {

    setKeyboardHeight(e.endCoordinates.height);

  }

  function onKeyboardDidHide(): void {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return (): void => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);

  return [keyboardHeight];
};
const DropDownComp=(props)=>{
	const ref = React.useRef();
	const inputref = React.useRef();
  const newinputref = React.useRef();
	const [layout,setlayout]=useState(null);
	const [modalstate,setmodalstate]=useState(false);
  const [items,setItems]= useState([]);
  const [filter_items,setFilterItems]= useState([]);
	 const [keyboardHeight] = useKeyboard();

  useState(()=>{
    setItems([...props.items]);
    setFilterItems([...props.items]);
  },[props.items])
  useEffect(()=>{

  },[keyboardHeight])
	const onLayout=(event)=>{
    console.log("position updating........")
		// console.log("event",event.nativeEvent.layout);
		const {x,y,width,height}=event.nativeEvent.layout;
		setlayout({x:x,y:y,width:width,height:height})
	}
	const onLayoutupdateheight=(x,y,height,width,px, py)=>{
		// console.log('x',px,py)
		setlayout((data)=>{
			return {...data,x:x,y:y}
		})
	}
	const getcurrentFoucs=()=>{
			inputref.current.focus();
    console.log("calling.........")
		setTimeout(()=>{
		ref.current.measureInWindow(onLayoutupdateheight);
			setmodalstate(true);
		// 	// console.log(Dimensions.get('window').height);
		})
	}
  const filterItmes=(value)=>{
    console.log("values",value);
    // const filter_clone=[...fukter]
    setItems([...filter_items].filter((obj)=>obj.label.toLowerCase().includes(value.toLowerCase())));
  }
	return(
		<View style={styles.container} >			
		<View style={[styles.wrapper,{...props.styles}]} ref={ref}
  onLayout={e => {
  	onLayout(e);
    ref.current.measureInWindow(onLayoutupdateheight);
  }}>
  <TextInput placeholder="hiii" style={{position:'absolute',width:0,height:0,bottom:0}} ref={inputref} />
  <TouchableOpacity style={{height:48,width:'100%',alignItems:'center',flexDirection:'row',paddingLeft:10}} onPress={()=>getcurrentFoucs('')}>
  <Text>{props.value?props.value.label:props.placeholder}</Text>
  </TouchableOpacity>
  {props.arrow&&<TouchableOpacity style={{position:'absolute',right:0,top:12,right:10}}><Image source={{uri:"https://static.thenounproject.com/png/22174-200.png"}} style={{width:25,height:25,resizeMode: 'cover'}}/></TouchableOpacity>}
		</View>
		{layout&&modalstate&&
			<ModalWrapper onSearchText={(value)=>filterItmes(value)} itemsData={items} {...props} activestyles={props.activestyles} newinputref={newinputref} visible={modalstate} setmodalstate={setmodalstate} layout={layout} keyboardHeight={keyboardHeight}/>
		}
		</View>
		)
}
export default DropDownComp;
const styles={
	wrapper:{
		borderWidth:1,
		borderColor:"#000",
		backgroundColor:'#fff',
    borderRadius:8,
    flexDirection:'row'
	},
	container:{
		padding:20
	},
	modaltext:{
		// height:30,
		paddingHorizontal:5,
		borderWidth:0,
		borderBottomWidth:0,
    paddingLeft:5,
    flexDirection:'row',
    alignItems:'center'
	},modaltextbottom:{
		// height:30,
		paddingHorizontal:5,
		borderWidth:0,
    // borderLeftWidth
		borderBottomWidth:0,paddingLeft:5, flexDirection:'row',
    alignItems:'center'
	},
	modaltextstyle:{
		fontSize:16,
		paddingVertical:10,
    paddingLeft:5,
    color:'#000'
	}
}