import React, {createContext, useContext, useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {useMotorcycleContext} from './MotorcycleContext';
import MotorcycleRepository from '../db/MotorcycleRepository';
import {createMotorcycle} from '../api/motorcycle';
import {createMaintenanceActivity} from '../api/maintenanceActivity';
import MaintenanceActivityRepository from '../db/MaintenanceActivityRepository';
import {useMaintenanceActivityContext} from './MaintenanceActivityContext';

const handleBackOnlineMotorcycles = async (
  getAllMotorcycles,
  getAllMaintenanceActivities,
) => {
  const motorcycleRepository = new MotorcycleRepository();
  const offlineMotorcycles =
    await motorcycleRepository.getAllOfflineMotorcycles();
  offlineMotorcycles.forEach(async motorcycle => {
    await createMotorcycle({...motorcycle, id: undefined});
  });
  await motorcycleRepository.deleteAllOflfineMotorcycles();
  if (getAllMotorcycles) {
    // await getAllMotorcycles();
  }
  const activityRepository = new MaintenanceActivityRepository();
  const offlineActivities = await activityRepository.getAllOfflineActivities();
  offlineActivities.forEach(async activity => {
    await createMaintenanceActivity({...activity, id: undefined});
  });
  await activityRepository.deleteAllOfflineActivities();
  if (getAllMaintenanceActivities) {
    // await getAllMaintenanceActivities();
  }
};

const NetworkConnectedContext = createContext();

export const useNetworkConnectedContext = () =>
  useContext(NetworkConnectedContext);

export default function NetworkConnectedContextProvider({children}) {
  const [networkConnected, setNetworkConnected] = useState(true);
  const {getAllMotorcycles} = useMotorcycleContext();
  const {getAllMaintenanceActivities} = useMaintenanceActivityContext();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async state => {
      if (state.isConnected) {
        await handleBackOnlineMotorcycles(
          getAllMotorcycles,
          getAllMaintenanceActivities,
        );
      }
      setNetworkConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, [getAllMotorcycles, getAllMaintenanceActivities]);
  return (
    <NetworkConnectedContext.Provider value={{networkConnected}}>
      {children}
    </NetworkConnectedContext.Provider>
  );
}
