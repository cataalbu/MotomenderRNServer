import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Toast from 'react-native-toast-message';
import {useMotorcycleContext} from './MotorcycleContext';
import * as MaintenanceActivityApi from '../api/maintenanceActivity';
import {useNetworkConnectedContext} from './NetworkConnectedContext';
import MaintenanceActivityRepository from '../db/MaintenanceActivityRepository';

const MaintenanceActivityContext = createContext({});

export const useMaintenanceActivityContext = () =>
  useContext(MaintenanceActivityContext);

export default function MaintenanceActivityContextProvider({children}) {
  const [activities, setActivities] = useState([]);
  const [currentActivity, setCurrentActivity] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const {getAllMotorcycles} = useMotorcycleContext();
  const {networkConnected} = useNetworkConnectedContext();
  const activitiesRepository = useMemo(
    () => new MaintenanceActivityRepository(),
    [],
  );

  const getAllMaintenanceActivities = useCallback(async () => {
    try {
      setLoading(true);
      let data = [];
      if (networkConnected) {
        data = await MaintenanceActivityApi.getMaintenanceActivities();
        await activitiesRepository.setAllActivities(data);
      } else {
        const onlineActivities = await activitiesRepository.getAllActivities();
        const offlineActivities =
          await activitiesRepository.getAllOfflineActivities();
        data = [...onlineActivities, ...offlineActivities];
      }
      setActivities(data);
      setLoading(false);
      console.log('Maintenance activities fetched');
    } catch (err) {
      console.log(err);
      if (err.message !== 'Network request failed') {
        console.log(err);
        Toast.show({
          text1: 'Error occured',
          text2: 'An error occured while fetching activities',
          type: 'error',
          position: 'top',
        });
      }
    }
  }, [networkConnected, activitiesRepository]);

  useEffect(() => {
    (async () => {
      await getAllMotorcycles();
      await getAllMaintenanceActivities();
    })();
  }, [getAllMaintenanceActivities, getAllMotorcycles]);

  const addActivity = useCallback(
    async activity => {
      try {
        if (networkConnected) {
          await MaintenanceActivityApi.createMaintenanceActivity(activity);
        } else {
          const maId = await activitiesRepository.addOfflineActivity(activity);
          setActivities(prev => {
            return [...prev, {id: maId, ...activity}];
          });
        }
        console.log('Maintenance activity added');
      } catch (err) {
        console.log(err);
        setError(err);
        Toast.show({
          text1: 'Error occured',
          text2: err.message,
          type: 'error',
          position: 'top',
        });
      }
    },
    [networkConnected, activitiesRepository],
  );

  const removeActivity = async id => {
    try {
      await MaintenanceActivityApi.deleteMaintenanceActivity(id);
      setActivities(prev => prev.filter(m => m.id !== id));
      console.log('Maintenance activity deleted');
    } catch (err) {
      console.log(err);
      setError(err);
      Toast.show({
        text1: 'Error occured',
        text2: err.message,
        type: 'error',
        position: 'top',
      });
    }
  };

  const updateActivity = async activity => {
    try {
      await MaintenanceActivityApi.updateMaintenanceActivity(activity);
      setActivities(prev => {
        const index = prev.findIndex(m => m.id === activity.id);
        const newActivities = [...prev];
        newActivities[index] = activity;
        return newActivities;
      });
      console.log('Maintenance activity updated');
    } catch (err) {
      console.log(err);
      setError(err);
      Toast.show({
        text1: 'Error occured',
        text2: err.message,
        type: 'error',
        position: 'top',
      });
    }
  };

  return (
    <MaintenanceActivityContext.Provider
      value={{
        loading,
        activities,
        addActivity,
        removeActivity,
        updateActivity,
        currentActivity,
        setCurrentActivity,
        getAllMaintenanceActivities,
        error,
        setError,
        setActivities,
      }}>
      {children}
    </MaintenanceActivityContext.Provider>
  );
}
