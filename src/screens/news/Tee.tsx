import React, { useRef } from "react";
import { Platform, StyleSheet, Text, View, TextInput } from "react-native";


 const Tee = ( ) => {

  const [text, setText] = React.useState("");
  const [maxLen, setMaxLen] = React.useState(0);
  const [toggle, setToggle] = React.useState(false);
  const ref = useRef<number>(0);

  const handleKeyPress = (key: string) => {
    if(key === 'Enter') {
      TextInput.State.currentlyFocusedInput().setNativeProps({
        maxLength: text.length
      })
      setToggle(true);
      console.log(1)
    } else {
      TextInput.State.currentlyFocusedInput().setNativeProps({
        maxLength: -1
      })
      setToggle(false);
    }
  }

  const changeText = (inputText:string) => {
    const lineBreak = /\r|\n/.exec(text);
    console.log('211', toggle)
    if (lineBreak || toggle) {
      return ;
    } 
    console.log('2')
    setText(inputText);
  }
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textinput}
        value=""
        placeholder="Enterdsdkas"
        onChange={(e) => changeText(e.nativeEvent.text)}
        multiline
        onKeyPress={(e) => handleKeyPress(e.nativeEvent.key)}
      >
      <Text>{text}</Text>
      </TextInput>
    </View>
  );
}

export default Tee;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  textinput: {
    fontSize: 24,
    marginTop: 60,
    marginRight: 20,
    marginLeft: 20,
    padding: 10,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5
  }
});