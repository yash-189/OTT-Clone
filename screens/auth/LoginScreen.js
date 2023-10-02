import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/auth/api';
import loginImage from '../../assets/Login-pana.png'
import { selectAuthStatus } from '../../redux/auth/authSlice';
import Loader from '../../src/components/loader/Loader';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(signIn({ email, password }));
  };

  return (
   
      <View style={styles.container}>
        {status ==='loading' && <Loader/>}
         <Image
    source={loginImage}  style={{height:300,width:'80%'}}
      />
        <Text style={styles.title}>Welcome Back!</Text>
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          Don't have an account?{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('SignUp')}
          >
            Sign Up
          </Text>
        </Text>
      </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'black'
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
  loginButton: {
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
  registerText: {
    color: '#ffffff',
    marginTop: 20,
  },
  link: {
    color: '#03a9f4',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
