import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AppTextInput from '../common/inputs/AppTextInput';
import AppButton from '../common/buttons/AppButton';
import {useFormik} from 'formik';
import {motorcycleSchema} from '../../utils/yup/schemas';

const MotorcycleForm = ({initialValues, onSubmitAction, actionButtonTitle}) => {
  const iv = initialValues
    ? initialValues
    : {
        manufacturer: '',
        model: '',
        km: '',
      };
  const {values, handleChange, handleSubmit, errors, isValid} = useFormik({
    initialValues: iv,
    validationSchema: motorcycleSchema,
    onSubmit: vals => {
      onSubmitAction(vals);
    },
  });

  return (
    <View style={styles.formWrapper}>
      <AppTextInput
        style={styles.input}
        placeholder="Manufacturer"
        value={values.manufacturer}
        onChangeText={handleChange('manufacturer')}
        error={errors.manufacturer}
      />
      <AppTextInput
        style={styles.input}
        placeholder="Model"
        value={values.model}
        onChangeText={handleChange('model')}
        error={errors.model}
      />
      <AppTextInput
        style={styles.input}
        placeholder="Km"
        value={values.km}
        onChangeText={handleChange('km')}
        error={errors.km}
      />
      <AppButton
        title={actionButtonTitle}
        onPress={handleSubmit}
        disabled={!isValid}
      />
    </View>
  );
};

export default MotorcycleForm;

const styles = StyleSheet.create({
  formWrapper: {
    width: '100%',
    padding: 32,
  },
  input: {
    marginBottom: 32,
  },
});
