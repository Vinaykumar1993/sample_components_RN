import React,{useRef,useEffect} from 'react';
import {Animated,Text,View,TextInput} from 'react-native'
const AnimatedTextInput=(props)=>{
	const animate_value=useRef(new Animated.Value(0)).current;
	const onFocus_Elem=()=>{
		props.onFocus&&props.onFocus();
		Animated.timing(animate_value,{
			toValue:1,
			duration:100
		}).start();
	}
	const onBlur_Elem=(elem)=>{
		// console.log(elem.nativeEvent.text);
		if(!elem.nativeEvent.text){
		// props.onBlur&&props.onBlur();
		Animated.timing(animate_value,{
			toValue:0,
			duration:100
		}).start();
	}
	}
	useEffect(()=>{
		console.log("props.value",props.value!=null)
		if(props.value!=null){
		Animated.timing(animate_value,{
			toValue:1,
			duration:100
		}).start();
	}
	},[props.value])
	const interpolate_style_view={top:animate_value.interpolate({inputRange:[0,1],outputRange:[15,3]})}
	const interpolate_style_text={fontSize:animate_value.interpolate({inputRange:[0,1],outputRange:[16,12]})}

	return (
		<View style={styles.container}>
		<View>
		<TextInput {...props} value={props.value} onFocus={onFocus_Elem} onEndEditing={onBlur_Elem} style={[styles.textinput,{...props.style}]} />
		<Animated.View style={[styles.viewtext,interpolate_style_view]}>
		<Animated.Text style={[styles.textsize,interpolate_style_text]}>{props.placeholder_text}</Animated.Text>
		</Animated.View>
		</View>
		</View>
		)
}
export default AnimatedTextInput;
const styles={
	viewtext:{
		position:'absolute',
		top:0,
	},
	container:{
		borderWidth:1,
		borderColor:'#000',
		borderRadius:5,
		padding:8,
		paddingVertical:0,
		height:55
	},
	textinput:{
		// marginTop:10,
		paddingVertical:0,
		marginVertical:0,
		// backgroundColor:'blue',
		height:25,
		paddingLeft:0,
		marginVertical:10,
		marginTop:17,
		fontSize:16
		// padding:5
	},textsize:{
		fontSize:16
	}
}