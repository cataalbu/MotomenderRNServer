import React from 'react';
import Toast from 'react-native-toast-message';
import AppNavigation from './src/navigation/AppNavigation';
import MotorcycleContextProvider from './src/context/MotorcycleContext';
import MaintenanceActivityContextProvider from './src/context/MaintenanceActivityContext';
import WebSocketContextProvider from './src/context/WebSocketContext';
import NetworkConnectedContextProvider from './src/context/NetworkConnectedContext';

function App() {
  return (
    <NetworkConnectedContextProvider>
      <MotorcycleContextProvider>
        <MaintenanceActivityContextProvider>
          <WebSocketContextProvider>
            <AppNavigation />
            <Toast />
          </WebSocketContextProvider>
        </MaintenanceActivityContextProvider>
      </MotorcycleContextProvider>
    </NetworkConnectedContextProvider>
  );
}

export default App;
