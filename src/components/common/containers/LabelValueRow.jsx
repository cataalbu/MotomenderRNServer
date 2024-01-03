import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LabelValueRow = ({label, value}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
};

export default LabelValueRow;

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
  },
  fieldValue: {
    fontSize: 18,
  },
});
