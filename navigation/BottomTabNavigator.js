
import React from 'react';
import { View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from '../screens/explore/ExploreScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import HomeScreen from '../screens/home/HomeScreen';
import { FilmIcon, HomeIcon, MagnifyingGlassIcon, TicketIcon, UserCircleIcon } from 'react-native-heroicons/outline';
import { Path, Svg } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator 
  screenOptions={{
    headerShown:false,
 
      tabBarActiveTintColor: '#ff7043',
      tabBarShowLabel: false,
      tabBarStyle: {
        position: 'absolute',
         backgroundColor: 'black', 
         borderWidth:0,
         borderColor:'black',
         bottom: 0,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        height: 60,
        elevation: 0,
      },
  }}
  >
    <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{padding:10, backgroundColor:focused?'#ff7043':'', borderRadius:50}}>
            <FilmIcon name="home" color={'#ffffff'} size={focused ? 30 : 28} />
            </View>
          )

        }} />
    <Tab.Screen name="Explore" component={ExploreScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{padding:10, backgroundColor:focused?'#ff7043':'', borderRadius:50}}>
            <MagnifyingGlassIcon name="home" color={'#ffffff'} size={focused ? 30 : 28} />
            </View>
          )

        }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{padding:10, backgroundColor:focused?'#ff7043':'', borderRadius:50}}>
            <TicketIcon name="home" color={'#ffffff'} size={focused ? 30 : 28} />
            </View>
          )

        }} />
    <Tab.Screen name="Profilee" component={ProfileScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{padding:10, backgroundColor:focused?'#ff7043':'', borderRadius:50}}>
            <UserCircleIcon name="home" color={'#ffffff'} size={focused ? 30 : 28} />
            </View>
          )

        }} />
  </Tab.Navigator>
);

export default BottomTabNavigator;
