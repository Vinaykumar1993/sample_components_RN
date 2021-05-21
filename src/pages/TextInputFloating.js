import * as React from 'react';
import { View, Text } from 'react-native';
import AnimatedTextInput from '../components/AnimatedTextInput';
function TextInputFloating() {
  return (
    <View style={{ flex: 1}}>
    <View>
      <AnimatedTextInput/>
      <AnimatedTextInput/>
      <AnimatedTextInput/>
      <AnimatedTextInput/>
      <AnimatedTextInput/>
      <AnimatedTextInput/>
      </View>
    </View>
  );
}
export default TextInputFloating;