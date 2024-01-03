import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import TabGroup from './TabStackNavigation';

const AppStack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          name="TabGroup"
          component={TabGroup}
          options={{headerShown: false}}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
