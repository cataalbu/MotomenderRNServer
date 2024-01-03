import * as Yup from 'yup';

export const motorcycleSchema = Yup.object().shape({
  manufacturer: Yup.string()
    .required('Manufacturer is required')
    .notOneOf([''], 'Manufacturer cannot be empty'),
  model: Yup.string()
    .required('Model is required')
    .notOneOf([''], 'Model cannot be empty'),
  km: Yup.number()
    .required('Kilometers is required')
    .positive('Kilometers must be a positive number')
    .integer('Kilometers must be an integer')
    .typeError('Kilometers must be a number'),
});

export const activitySchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .notOneOf([''], 'Name cannot be empty'),
  motorcycle: Yup.string()
    .required('Motorcycle is required')
    .notOneOf([''], 'Motorcycle cannot be empty'),
  moneyInvested: Yup.number()
    .required('Money invested is required')
    .positive('Money invested must be a positive number')
    .typeError('Money invested must be a number'),
  maxKm: Yup.number()
    .required('Max kilometers is required')
    .positive('Max kilometers must be a positive number')
    .integer('Max kilometers must be an integer')
    .typeError('Max kilometers must be a number'),
  observations: Yup.string(),
});
