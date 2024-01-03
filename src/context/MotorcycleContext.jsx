import React, {useCallback, useMemo} from 'react';
import Toast from 'react-native-toast-message';
import {createContext, useContext, useState} from 'react';
import * as motorcycleApi from '../api/motorcycle';
import {useNetworkConnectedContext} from './NetworkConnectedContext';
import MotorcycleRepository from '../db/MotorcycleRepository';
const MotorcycleContext = createContext({});

export const useMotorcycleContext = () => useContext(MotorcycleContext);

export default function MotorcycleContextProvider({children}) {
  const [motorcycles, setMotorcycles] = useState([]);
  const [currentMotorcycle, setCurrentMotorcycle] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const {networkConnected} = useNetworkConnectedContext();
  const motorcycleRepository = useMemo(() => new MotorcycleRepository(), []);

  const getAllMotorcycles = useCallback(async () => {
    try {
      setLoading(true);
      let data = [];
      if (networkConnected) {
        data = await motorcycleApi.getMotorcycles();
        await motorcycleRepository.setAllMotorcycles(data);
      } else {
        const onlineMotorcycles =
          await motorcycleRepository.getAllMotorcycles();
        const offlineMotorcycles =
          await motorcycleRepository.getAllOfflineMotorcycles();
        data = [...onlineMotorcycles, ...offlineMotorcycles];
      }
      setMotorcycles(data);
      setLoading(false);
      console.log('Motorcycles fetched');
    } catch (err) {
      if (err.message !== 'Network request failed') {
        console.log(err);
        Toast.show({
          text1: 'Error occured',
          text2: 'An error occured while fetching motorcycles',
          type: 'error',
          position: 'top',
        });
      }
    }
  }, [networkConnected, motorcycleRepository]);

  const addMotorcycle = useCallback(
    async motorcycle => {
      try {
        if (networkConnected) {
          await motorcycleApi.createMotorcycle(motorcycle);
        } else {
          const motorcycleId = await motorcycleRepository.addOfflineMotorcycle(
            motorcycle,
          );
          setMotorcycles(prev => {
            return [...prev, {id: motorcycleId, ...motorcycle}];
          });
        }
        console.log('Motorcycle added');
      } catch (err) {
        console.log(err);
        setError(err);
        Toast.show({
          text1: 'Error occured',
          text2: 'An error occured while adding motorcycle',
          type: 'error',
          position: 'top',
        });
      }
    },
    [networkConnected, motorcycleRepository],
  );

  const removeMotorcycle = async id => {
    try {
      await motorcycleApi.deleteMotorcycle(id);
      console.log('Motorcycle deleted');
    } catch (err) {
      console.log(err);
      setError(err);
      Toast.show({
        text1: 'Error occured',
        text2: 'An error occured while deleting motorcycle',
        type: 'error',
        position: 'top',
      });
    }
  };

  const updateMotorcycle = async motorcycle => {
    try {
      await motorcycleApi.updateMotorcycle(motorcycle);
      console.log('Motorcycle updated');
    } catch (err) {
      console.log(err);
      setError(err);
      Toast.show({
        text1: 'Error occured',
        text2: 'An error occured while updating motorcycle',
        type: 'error',
        position: 'top',
      });
    }
  };

  return (
    <MotorcycleContext.Provider
      value={{
        loading,
        motorcycles,
        setMotorcycles,
        addMotorcycle,
        removeMotorcycle,
        updateMotorcycle,
        currentMotorcycle,
        setCurrentMotorcycle,
        getAllMotorcycles,
        error,
        setError,
      }}>
      {children}
    </MotorcycleContext.Provider>
  );
}
