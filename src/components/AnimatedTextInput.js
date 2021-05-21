import React,{useRef} from 'react';
import {Animated,Text,View,TextInput} from 'react-native'
const AnimatedTextInput=()=>{
	const animate_value=useRef(new Animated.Value(0)).current;
	const onFocus_Elem=()=>{
		Animated.timing(animate_value,{
			toValue:1,
			duration:100
		}).start();
	}
	const onBlur_Elem=(elem)=>{
		// console.log(elem.nativeEvent.text);
		if(!elem.nativeEvent.text){

		
		Animated.timing(animate_value,{
			toValue:0,
			duration:100
		}).start();
	}
	}
	const interpolate_style_view={top:animate_value.interpolate({inputRange:[0,1],outputRange:[15,3]})}
	const interpolate_style_text={fontSize:animate_value.interpolate({inputRange:[0,1],outputRange:[16,12]})}

	return (
		<View style={styles.container}>
		<View>
		<TextInput onFocus={onFocus_Elem} onEndEditing={onBlur_Elem} style={[styles.textinput]} />
		<Animated.View style={[styles.viewtext,interpolate_style_view]}>
		<Animated.Text style={[styles.textsize,interpolate_style_text]}>Email</Animated.Text>
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
		margin:15,
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