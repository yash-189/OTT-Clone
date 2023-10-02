import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import { Provider } from 'react-redux';
import { store } from './store';
import AppNavigator from './navigation/AppNavigator';

const App = () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;

 
  return (
    <Provider store={store}>
    <SafeAreaProvider>
      <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
        </SafeAreaProvider>
        </Provider>
  )
}

export default App