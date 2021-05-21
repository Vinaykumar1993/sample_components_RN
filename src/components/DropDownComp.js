import React,{useRef,useState,useEffect} from 'react';
import {Animated,Text,View,TextInput,Modal,ScrollView,TouchableOpacity,Dimensions,Keyboard, KeyboardEvent} from 'react-native';
//import Modal from 'react-native-modal';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ModalWrapper=({visible,setmodalstate,layout,keyboardHeight})=>{
	const exactheight=(windowHeight-keyboardHeight);
	const getHeight=exactheight-(layout.y);
	const checkhalf=(getHeight)<((exactheight)/2);
	const keyboardHeightcalc=(exactheight*layout.y)/(exactheight);
	const bottomheight=exactheight-(layout.y+layout.height+((keyboardHeight?33.3:0)));
	console.log("getbottomHeight",exactheight);
	console.log("getbottomHeight",bottomheight,layout.y);
	const styleprops=checkhalf?{position:'absolute',left:layout.x,bottom:bottomheight>=0?bottomheight:0,backgroundColor:'white',width:layout.width}:{position:'absolute',left:layout.x,top:((layout.y)),backgroundColor:'white',width:layout.width}
  return (
  	<Modal animationType={'fade'} visible={visible} onRequestClose={()=>setmodalstate(false)} transparent={true}>
        <View style={styleprops}>
        {!checkhalf&&
        <View style={styles.wrapper}>
        	<TextInput placeholder="enter your name" autoFocus={true} onEndEditing={()=>setmodalstate(false)}/>
        	</View >
        }
        	
        	<ScrollView style={{height:layout.height*4}}>
          <View style={[checkhalf?styles.modaltextbottom:styles.modaltext,{height:layout.height}]}>
          	<Text style={styles.modaltextstyle}>I am Modal</Text>
          </View>
           <View style={[checkhalf?styles.modaltextbottom:styles.modaltext,{height:layout.height}]}>
          	<Text style={styles.modaltextstyle}>I am Modal</Text>
          </View>
           <View style={[checkhalf?styles.modaltextbottom:styles.modaltext,{height:layout.height}]}>
          	<Text style={styles.modaltextstyle}>I am Modal</Text>
          </View>
           <View style={[checkhalf?styles.modaltextbottom:styles.modaltext,{height:layout.height}]}>
          	<Text style={styles.modaltextstyle}>I am Modal</Text>
          </View>
           <View style={[checkhalf?styles.modaltextbottom:styles.modaltext,{height:layout.height}]}>
          	<Text style={styles.modaltextstyle}>I am Modal</Text>
          </View>
           <View style={[checkhalf?styles.modaltextbottom:styles.modaltext,{height:layout.height}]}>
          	<Text style={styles.modaltextstyle}>I am Modal</Text>
          </View>
           <View style={[checkhalf?styles.modaltextbottom:styles.modaltext,{height:layout.height}]}>
          	<Text style={styles.modaltextstyle}>I am Modal</Text>
          </View>
           <View style={[checkhalf?styles.modaltextbottom:styles.modaltext,{height:layout.height}]}>
          	<Text style={styles.modaltextstyle}>I am Modal</Text>
          </View>
           <View style={[checkhalf?styles.modaltextbottom:styles.modaltext,{height:layout.height}]}>
          	<Text style={styles.modaltextstyle}>I am Modal</Text>
          </View>
           <View style={[checkhalf?styles.modaltextbottom:styles.modaltext,{height:layout.height}]}>
          	<Text style={styles.modaltextstyle}>I am Modal</Text>
          </View>
        </ScrollView>
        {checkhalf&&
        <View style={styles.wrapper}>
        	<TextInput placeholder="enter your name" autoFocus={true} onEndEditing={()=>setmodalstate(false)}/>
        	</View >
        }
        </View>
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
const DropDownComp=()=>{
	const ref = React.useRef();
	const inputref = React.useRef();
	const [layout,setlayout]=useState(null);
	const [modalstate,setmodalstate]=useState(false);
	 const [keyboardHeight] = useKeyboard();

	const onLayout=(event)=>{
		console.log("event",event.nativeEvent.layout);
		const {x,y,width,height}=event.nativeEvent.layout;
		setlayout({x:x,y:y,width:width,height:height})
	}
	const onLayoutupdateheight=(x,y,height,width,px, py)=>{
		console.log('x',px,py)
		setlayout((data)=>{
			return {...data,x:x,y:y}
		})
	}
	const getcurrentFoucs=()=>{
			inputref.current.focus();
		ref.current.measureInWindow(onLayoutupdateheight);
		setTimeout(()=>{
		// 	// console.log(Dimensions.get('window').height);
			setmodalstate(true);
		})
	}
	return(
		<View style={styles.container} >			
		<View style={styles.wrapper} ref={ref}
  onLayout={e => {
  	onLayout(e);
    ref.current.measureInWindow(onLayoutupdateheight);
  }}>
		<TextInput ref={inputref} placeholder="enter your name"  onEndEditing={()=>setmodalstate(false)} onFocus={()=>getcurrentFoucs()}/>
		</View>
		{layout&&modalstate&&
			<ModalWrapper visible={modalstate} setmodalstate={setmodalstate} layout={layout} keyboardHeight={keyboardHeight}/>
		}
		</View>
		)
}
export default DropDownComp;
const styles={
	wrapper:{
		borderWidth:1,
		borderColor:"#000",
		backgroundColor:'#fff'
	},
	container:{
		padding:20
	},
	modaltext:{
		// height:30,
		paddingHorizontal:5,
		borderWidth:1,
		borderTopWidth:0
	},modaltextbottom:{
		// height:30,
		paddingHorizontal:5,
		borderWidth:1,
		borderBottomWidth:0
	},
	modaltextstyle:{
		fontSize:16,
		paddingVertical:10,
	}
}