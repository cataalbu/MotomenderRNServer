import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const AppButton = ({onPress, title, style, textStyle, disabled}) => {
  const buttonColor = disabled
    ? styles.disabledButtonColor
    : styles.buttonColor;
  const overideDisable = disabled ? styles.disabledButtonColor : {};
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        ...styles.appButtonContainer,
        ...buttonColor,
        ...style,
        ...overideDisable,
      }}>
      <Text style={{...styles.appButtonText, ...textStyle}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  appButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonColor: {
    backgroundColor: '#000',
  },
  disabledButtonColor: {
    backgroundColor: '#d1d1d1',
  },
  appButtonText: {
    color: '#fff',
    fontSize: 20,
  },
});
