import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import AppTextInput from '../common/inputs/AppTextInput';
import AppButton from '../common/buttons/AppButton';
import {useFormik} from 'formik';
import SelectDropdown from 'react-native-select-dropdown';
import {useMotorcycleContext} from '../../context/MotorcycleContext';
import {activitySchema} from '../../utils/yup/schemas';

const ActivityForm = ({initialValues, onSubmitAction, actionButtonTitle}) => {
  const {motorcycles} = useMotorcycleContext();
  const iv = initialValues
    ? initialValues
    : {
        name: '',
        motorcycle: '',
        maxKm: '',
        moneyInvested: '',
        observations: '',
      };
  const {values, handleChange, handleSubmit, errors, isValid} = useFormik({
    initialValues: iv,
    onSubmit: vals => {
      onSubmitAction(vals);
    },
    validationSchema: activitySchema,
  });
  return (
    <View style={styles.formWrapper}>
      <AppTextInput
        style={styles.input}
        placeholder="Name"
        value={values.name}
        onChangeText={handleChange('name')}
        error={errors.name}
      />
      <View style={styles.dropdownWrapper}>
        <SelectDropdown
          data={motorcycles.map(m => m.manufacturer + ' ' + m.model)}
          onSelect={handleChange('motorcycle')}
          defaultButtonText="Select a motorcycle"
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdownButton}
          dropdownStyle={styles.dropdownStyle}
          rowStyle={styles.dropdownRow}
          rowTextStyle={styles.dropdownRowText}
        />
        <Text style={styles.textError}>{errors.motorcycle}</Text>
      </View>
      <AppTextInput
        style={styles.input}
        placeholder="Max Km"
        value={values.maxKm}
        onChangeText={handleChange('maxKm')}
        error={errors.maxKm}
      />
      <AppTextInput
        style={styles.input}
        placeholder="MoneyInvested"
        value={values.moneyInvested}
        onChangeText={handleChange('moneyInvested')}
        error={errors.moneyInvested}
      />
      <AppTextInput
        style={styles.input}
        placeholder="Observations"
        value={values.observations}
        onChangeText={handleChange('observations')}
        error={errors.observations}
      />
      <AppButton
        title={actionButtonTitle}
        onPress={handleSubmit}
        disabled={!isValid}
      />
    </View>
  );
};

export default ActivityForm;

const styles = StyleSheet.create({
  formWrapper: {
    width: '100%',
    padding: 32,
  },
  input: {
    marginBottom: 32,
  },
  textError: {
    color: '#FF3A31',
    marginTop: 4,
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 44,
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#cccccc',
    padding: 0,
  },
  dropdownWrapper: {
    marginBottom: 32,
    width: '100%',
  },
  dropdownButton: {textAlign: 'left', fontSize: 18},
  dropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdownRow: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdownRowText: {color: '#444', textAlign: 'left'},
});
