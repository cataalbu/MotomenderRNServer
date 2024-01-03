import {View} from 'react-native';
import React from 'react';
import {useMotorcycleContext} from '../../context/MotorcycleContext';
import {useNavigation} from '@react-navigation/native';
import MotorcycleForm from '../../components/Motorcycle/MotorcycleForm';

const MotorcycleUpdatePage = () => {
  const {updateMotorcycle, currentMotorcycle} = useMotorcycleContext();
  const navigation = useNavigation();

  const handleUpdateMotorcycle = motorcycle => {
    updateMotorcycle(motorcycle);
    navigation.navigate('MotorcycleListPage');
  };

  return (
    <View>
      <MotorcycleForm
        onSubmitAction={handleUpdateMotorcycle}
        actionButtonTitle="Update"
        initialValues={currentMotorcycle}
      />
    </View>
  );
};

export default MotorcycleUpdatePage;
