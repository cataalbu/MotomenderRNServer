import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ActivityForm from '../../components/Acitivty/ActivityForm';
import {useMaintenanceActivityContext} from '../../context/MaintenanceActivityContext';
import {useNavigation} from '@react-navigation/native';

const MaintenanceActivityCreatePage = () => {
  const {addActivity} = useMaintenanceActivityContext();
  const navigation = useNavigation();

  const handleSubmit = action => {
    addActivity(action);
    navigation.navigate('MaintenanceActivityListPage');
  };

  return (
    <View>
      <ActivityForm onSubmitAction={handleSubmit} actionButtonTitle="Create" />
    </View>
  );
};

export default MaintenanceActivityCreatePage;

const styles = StyleSheet.create({});
