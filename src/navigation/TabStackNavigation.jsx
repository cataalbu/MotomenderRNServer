import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MotorcycleGroupNavigation from './MotorcycleStackNavigation';
import MaintenanceGroupNavigation from './MaintenanceActivityStackNavigation';
import AccountPage from '../pages/AccountPage';

const TabStack = createBottomTabNavigator();

function TabGroup() {
  return (
    <TabStack.Navigator initialRouteName="MotorcycleGroupNavigation">
      <TabStack.Screen name="Account" component={AccountPage} />
      <TabStack.Screen
        name="MotorcycleGroupNavigation"
        component={MotorcycleGroupNavigation}
        options={{
          headerShown: false,
          tabBarLabel: 'Motorcyles',
        }}
      />
      <TabStack.Screen
        name="MaintenanceActivitiesGroupNavigation"
        component={MaintenanceGroupNavigation}
        options={{
          headerShown: false,
          tabBarLabel: 'Maintenance Activities',
        }}
      />
    </TabStack.Navigator>
  );
}

export default TabGroup;
