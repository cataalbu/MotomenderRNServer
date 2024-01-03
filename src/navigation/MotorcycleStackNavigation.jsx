import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MotorcycleListPage from '../pages/Motorcycle/MotorcycleListPage';
import MotorcycleDetailsPage from '../pages/Motorcycle/MotorcycleDetailsPage';
import MotorcycleUpdatePage from '../pages/Motorcycle/MotorcycleUpdatePage';
import MotorcycleCreatePage from '../pages/Motorcycle/MotorcycleCreatePage';

const MotorcycleStack = createNativeStackNavigator();

function MotorcycleGroupNavigation() {
  return (
    <MotorcycleStack.Navigator>
      <MotorcycleStack.Screen
        name="MotorcycleListPage"
        component={MotorcycleListPage}
        options={{
          headerTitle: 'Motorcycles',
        }}
      />
      <MotorcycleStack.Screen
        name="MotorcycleDetailsPage"
        component={MotorcycleDetailsPage}
        options={{
          headerTitle: 'Motorcycle Details',
        }}
      />
      <MotorcycleStack.Screen
        name="MotorcycleCreatePage"
        component={MotorcycleCreatePage}
        options={{
          headerTitle: 'Add a motorcycle',
          presentation: 'modal',
        }}
      />
      <MotorcycleStack.Screen
        name="MotorcycleUpdatePage"
        component={MotorcycleUpdatePage}
        options={{
          headerTitle: 'Add motorcycle',
          presentation: 'modal',
        }}
      />
    </MotorcycleStack.Navigator>
  );
}

export default MotorcycleGroupNavigation;
