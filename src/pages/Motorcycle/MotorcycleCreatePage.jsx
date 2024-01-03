import {View} from 'react-native';
import React from 'react';
import MotorcycleForm from '../../components/Motorcycle/MotorcycleForm';
import {useMotorcycleContext} from '../../context/MotorcycleContext';
import {useNavigation} from '@react-navigation/native';

const MotorcycleCreatePage = () => {
  const {addMotorcycle} = useMotorcycleContext();
  const navigation = useNavigation();

  const handleCreateMotorcycle = motorcycle => {
    addMotorcycle(motorcycle);
    navigation.navigate('MotorcycleListPage');
  };

  return (
    <View>
      <MotorcycleForm
        onSubmitAction={handleCreateMotorcycle}
        actionButtonTitle="Create"
      />
    </View>
  );
};

export default MotorcycleCreatePage;
