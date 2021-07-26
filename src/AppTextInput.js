import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const UselessTextInput = ({fun}) => {
  const [changeText, onChangeText] = React.useState();
//   const [number, onChangeNumber] = React.useState(null);

  const fun2 = (text) =>{
    onChangeText(text)
      
        fun(text);
  }

  return (
    <SafeAreaView>
      { <TextInput
        style={styles.input}
        editable = {true}
        onChangeText={(text)=>fun2(text)}
        value={changeText}
      /> }
      {/* <TextInput
        style={styles.input}
        // onChangeText={onChangeNumber}
        value={number}
        editable = {true}
        placeholder="useless placeholder"
        // keyboardType="numeric"
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default UselessTextInput;