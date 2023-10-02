import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../redux/auth/api';
import signupImage from '../../assets/signupp.png';
import { selectAuthStatus } from '../../redux/auth/authSlice';
import Loader from '../../src/components/loader/Loader';

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    dispatch(signUp({ email, password }));
  };

  return (
    <View style={styles.container}>
      {status === 'loading' && <Loader />}
      <Image source={signupImage} style={{ height: 300, width: '80%' }} />
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  signupButton: {
    backgroundColor: '#ff7043',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#ffffff',
    marginTop: 20,
  },
  link: {
    color: '#03a9f4',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
