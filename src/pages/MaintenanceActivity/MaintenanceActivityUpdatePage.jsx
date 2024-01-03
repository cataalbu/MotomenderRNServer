import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ActivityForm from '../../components/Acitivty/ActivityForm';
import {useMaintenanceActivityContext} from '../../context/MaintenanceActivityContext';
import {useNavigation} from '@react-navigation/native';

const MaintenanceActivityUpdatePage = () => {
  const {updateActivity, currentActivity, setCurrentActivity} =
    useMaintenanceActivityContext();
  const navigation = useNavigation();

  const handleSubmit = action => {
    updateActivity(action);
    setCurrentActivity(action);
    navigation.goBack();
  };

  return (
    <View>
      <ActivityForm
        initialValues={currentActivity}
        onSubmitAction={handleSubmit}
        actionButtonTitle="Update"
      />
    </View>
  );
};

export default MaintenanceActivityUpdatePage;

const styles = StyleSheet.create({});
