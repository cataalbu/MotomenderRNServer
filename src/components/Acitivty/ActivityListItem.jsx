import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LabelValueRow from '../common/containers/LabelValueRow';
import AppButton from '../common/buttons/AppButton';
import {useNavigation} from '@react-navigation/native';
import {useMaintenanceActivityContext} from '../../context/MaintenanceActivityContext';

const ActivityListItem = ({activity}) => {
  const navigation = useNavigation();
  const {setCurrentActivity} = useMaintenanceActivityContext();

  return (
    <View style={styles.motorcycleListItemContainer}>
      <Text style={styles.idText}>{`#${activity.id}`}</Text>
      <LabelValueRow label="Name:" value={activity.name} />
      <LabelValueRow label="Motorcycle:" value={activity.motorcycle} />
      <AppButton
        style={styles.detailsButton}
        title="Details"
        onPress={() => {
          navigation.navigate('MaintenanceActivityDetailsPage', {
            id: activity.id,
          });
          setCurrentActivity(activity);
        }}
      />
    </View>
  );
};

export default ActivityListItem;

const styles = StyleSheet.create({
  motorcycleListItemContainer: {
    borderWidth: 2,
    borderRadius: 16,
    padding: 32,
    width: '100%',
    marginBottom: 16,
  },
  idText: {
    fontWeight: '700',
    fontSize: 18,
    margin: 4,
  },
  detailsButton: {
    marginTop: 32,
  },
});
