import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import navigationList from './Navigations';

const Stack = createNativeStackNavigator();

const Navigations = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      {navigationList.map(
        (item, index) =>
          item?.routeType === 'private' && (
            <Stack.Screen
              key={`navigation-private-${index}`}
              name={`${item.path}`}
              component={item.components}
            />
          ),
      )}
      {navigationList.map(
        (item, index) =>
          item?.routeType === 'public' && (
            <Stack.Screen
              key={`navigation-public-${index}`}
              name={`${item.path}`}
              component={item.components}
            />
          ),
      )}
    </Stack.Navigator>
  );
};

export default Navigations;
