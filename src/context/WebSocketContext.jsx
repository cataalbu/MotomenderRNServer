import React, {createContext, useContext, useRef, useEffect} from 'react';
import {useMotorcycleContext} from './MotorcycleContext';
import MotorcycleRepository from '../db/MotorcycleRepository';
import {useMaintenanceActivityContext} from './MaintenanceActivityContext';
import MaintenanceActivityRepository from '../db/MaintenanceActivityRepository';

const WebSocketContext = createContext({});

export const useWebSocketContext = () => useContext(WebSocketContext);

export default function WebSocketContextProvider({children}) {
  const ws = useRef(null);

  const {setMotorcycles} = useMotorcycleContext();
  const {setActivities} = useMaintenanceActivityContext();

  useEffect(() => {
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
      ws.current = new WebSocket('ws://localhost:8080');

      ws.current.onopen = () => {
        console.log('WebSocket connection established');
      };

      ws.current.onmessage = e => {
        const message = JSON.parse(e.data);
        const action = message.action;
        const data = message.data;
        console.log('WebSocket message received:', action, data);

        switch (action) {
          case 'add-motorcycle':
            console.log('add-motorcycle', data);
            setMotorcycles(prev => {
              const index = prev.findIndex(m => m.id === data.id);
              const newMotorcycles = [...prev];
              if (index === -1) {
                newMotorcycles.push(data);
              } else {
                newMotorcycles[index] = data;
              }
              const motorcycleRepository = new MotorcycleRepository();
              motorcycleRepository.setAllMotorcycles(newMotorcycles);
              return newMotorcycles;
            });
            break;
          case 'update-motorcycle':
            console.log('update-motorcycle', data);
            setMotorcycles(prev => {
              const index = prev.findIndex(m => m.id === data.id);
              const newMotorcycles = [...prev];
              newMotorcycles[index] = data;
              const motorcycleRepository = new MotorcycleRepository();
              motorcycleRepository.setAllMotorcycles(newMotorcycles);
              return newMotorcycles;
            });
            break;
          case 'delete-motorcycle':
            console.log('delete-motorcycle', data);
            setMotorcycles(prev => {
              const newMotorcycles = prev.filter(
                m => m.id !== parseInt(data, 10),
              );
              const motorcycleRepository = new MotorcycleRepository();
              motorcycleRepository.setAllMotorcycles(newMotorcycles);
              return newMotorcycles;
            });
            break;

          case 'add-maintenance-activity':
            console.log('add-maintenance-activity', data);
            setActivities(prev => {
              const index = prev.findIndex(m => m.id === data.id);
              const newActivities = [...prev];
              if (index === -1) {
                newActivities.push(data);
              } else {
                newActivities[index] = data;
              }
              const activitiesRepository = new MaintenanceActivityRepository();
              activitiesRepository.setAllActivities(newActivities);
              return newActivities;
            });
            break;

          case 'update-maintenance-activity':
            console.log('update-maintenance-activity', data);
            setActivities(prev => {
              const index = prev.findIndex(m => m.id === data.id);
              const newActivities = [...prev];
              newActivities[index] = data;
              const activitiesRepository = new MaintenanceActivityRepository();
              activitiesRepository.setAllActivities(newActivities);
              return newActivities;
            });
            break;

          case 'delete-maintenance-activity':
            console.log('delete-maintenance-activity', data);
            setActivities(prev => {
              const newActivities = prev.filter(
                m => m.id !== parseInt(data, 10),
              );
              const activitiesRepository = new MaintenanceActivityRepository();
              activitiesRepository.setAllActivities(newActivities);
              return newActivities;
            });
            break;

          default:
            break;
        }
      };

      ws.current.onclose = () => {
        console.log('WebSocket connection closed');
      };
    }

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [setMotorcycles, setActivities]);

  return (
    <WebSocketContext.Provider value={{}}>{children}</WebSocketContext.Provider>
  );
}
