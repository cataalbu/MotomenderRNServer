import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaintenanceActivityListPage from '../pages/MaintenanceActivity/MaintenanceActivityListPage';
import MaintenanceActivityDetailsPage from '../pages/MaintenanceActivity/MaintenanceActivityDetailsPage';
import MaintenanceActivityUpdatePage from '../pages/MaintenanceActivity/MaintenanceActivityUpdatePage';
import MaintenanceActivityCreatePage from '../pages/MaintenanceActivity/MaintenanceActivityCreatePage';

const MaintenanceActivityStack = createNativeStackNavigator();

function MaintenanceActivityGroupNavigation() {
  return (
    <MaintenanceActivityStack.Navigator>
      <MaintenanceActivityStack.Screen
        name="MaintenanceActivityListPage"
        component={MaintenanceActivityListPage}
        options={{
          headerTitle: 'Maintenance activities',
        }}
      />
      <MaintenanceActivityStack.Screen
        name="MaintenanceActivityDetailsPage"
        component={MaintenanceActivityDetailsPage}
        options={{
          headerTitle: 'Maintenance activity details',
        }}
      />
      <MaintenanceActivityStack.Screen
        name="MaintenanceActivityCreatePage"
        component={MaintenanceActivityCreatePage}
        options={{
          headerTitle: 'Add a maintenance activity',
          presentation: 'modal',
        }}
      />
      <MaintenanceActivityStack.Screen
        name="MaintenanceActivityUpdatePage"
        component={MaintenanceActivityUpdatePage}
        options={{
          headerTitle: 'Update maintenance activity',
          presentation: 'modal',
        }}
      />
    </MaintenanceActivityStack.Navigator>
  );
}

export default MaintenanceActivityGroupNavigation;
