import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = ({ color = '#ff7043', size = 'large' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999, 
  },
});

export default Loader;
