import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import {useMotorcycleContext} from '../../context/MotorcycleContext';
import MotorcycleListItem from '../../components/Motorcycle/MotorcycleListItem';
import {useNavigation} from '@react-navigation/native';
import AppButton from '../../components/common/buttons/AppButton';
import {useNetworkConnectedContext} from '../../context/NetworkConnectedContext';

const MotorcycleListPage = () => {
  const {motorcycles, loading} = useMotorcycleContext();
  const {networkConnected} = useNetworkConnectedContext();
  const navigation = useNavigation();
  return (
    <View style={styles.pageContainer}>
      {!networkConnected ? (
        <Text style={styles.networkError}>No internet connection</Text>
      ) : null}
      <AppButton
        title="Add new"
        style={styles.addButton}
        onPress={() => navigation.navigate('MotorcycleCreatePage')}
      />
      {!loading ? (
        <FlatList
          style={styles.flatLisContainer}
          data={motorcycles}
          renderItem={itemData => (
            <MotorcycleListItem motorcycle={itemData.item} />
          )}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default MotorcycleListPage;

const styles = StyleSheet.create({
  addButton: {
    marginBottom: 32,
  },
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  flatLisContainer: {
    width: '100%',
  },
  networkError: {
    color: '#FF3A31',
    marginBottom: 32,
  },
});
