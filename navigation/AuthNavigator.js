// AuthNavigator.js

import React from 'react';
import LoginScreen from '../screens/auth/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../screens/auth/SignupScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
    screenOptions={{headerShown: false, animation:'slide_from_bottom',presentation:'fullScreenModal'}}>
      <Stack.Screen name="Login" component={LoginScreen}  />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
