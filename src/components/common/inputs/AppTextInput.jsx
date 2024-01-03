import {StyleSheet, TextInput, View, Text} from 'react-native';
import React from 'react';

const AppTextInput = props => {
  return (
    <View style={{...styles.inputWrapper, ...props.style}}>
      <TextInput {...props} style={{...styles.input, ...props.styleInput}} />
      {props.error && <Text style={styles.textError}>{props.error}</Text>}
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    fontSize: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#cccccc',
    borderRadius: 10,
  },
  textError: {
    color: '#FF3A31',
    marginTop: 4,
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'column',
  },
});
