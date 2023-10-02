import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { UserIcon, ArrowLeftIcon, HeartIcon, BookmarkIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon, UserCircleIcon } from 'react-native-heroicons/outline';
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser?._user);

      console.log("🚀 ~ file: ProfileScreen.js:15 ~ unsubscribe ~ currentUser:", currentUser?._user)

    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }; 
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <ArrowLeftOnRectangleIcon size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* User Details */}
      <View style={styles.profileDetails}>
        <UserCircleIcon size={150} color={'white'} style={styles.avatar} />
        <Text style={styles.userName}>{user?.user || 'User'}</Text>
        <Text style={styles.mobileNumber}>{user?.email}</Text>
      </View>

      {/* Profile Sections */}
      <TouchableOpacity style={styles.section}>
        <HeartIcon size={24} color="#ffffff" />
        <Text style={styles.sectionTitle}>Likes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <BookmarkIcon size={24} color="#ffffff" />
        <Text style={styles.sectionTitle}>Watchlist</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <Cog6ToothIcon size={24} color="#ffffff" />
        <Text style={styles.sectionTitle}>Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logoutButton: {
    padding: 10,
  },
  profileDetails: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  userName: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mobileNumber: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 20,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 20,
  },
});

export default ProfileScreen;
