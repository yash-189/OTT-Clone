import React from 'react'
import BottomTabNavigator from './BottomTabNavigator';
import MovieDetailsScreen from '../screens/home/MovieDetailsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animationEnabled:true
            }}>
            <Stack.Screen name="Home" component={BottomTabNavigator} />
            <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{animation:'slide_from_right' }} />
        </Stack.Navigator>
    )
}

export default AppNavigator