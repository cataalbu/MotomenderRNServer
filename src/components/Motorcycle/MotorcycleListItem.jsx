import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LabelValueRow from '../common/containers/LabelValueRow';
import AppButton from '../common/buttons/AppButton';
import {useNavigation} from '@react-navigation/native';
import {useMotorcycleContext} from '../../context/MotorcycleContext';

const MotorcycleListItem = ({motorcycle}) => {
  const navigation = useNavigation();
  const {setCurrentMotorcycle} = useMotorcycleContext();
  return (
    <View style={styles.motorcycleListItemContainer}>
      <Text style={styles.idText}>{`#${motorcycle.id}`}</Text>
      <LabelValueRow label="Manufacturer:" value={motorcycle.manufacturer} />
      <LabelValueRow label="Model:" value={motorcycle.model} />
      <LabelValueRow label="KM:" value={motorcycle.km} />
      <AppButton
        style={styles.detailsButton}
        title="Details"
        onPress={() => {
          navigation.navigate('MotorcycleDetailsPage', {id: motorcycle.id});
          setCurrentMotorcycle(motorcycle);
        }}
      />
    </View>
  );
};

export default MotorcycleListItem;

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
