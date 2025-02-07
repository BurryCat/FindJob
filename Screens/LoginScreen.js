import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      const existingUser = await AsyncStorage.getItem(email);
      if (existingUser) {
        Alert.alert('Error', 'This email is already registered.');
        return;
      }

      await AsyncStorage.setItem(email, password);
      Alert.alert('Success', 'Registration successful! You can now log in.');
      setIsRegistering(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong during registration.');
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      const storedPassword = await AsyncStorage.getItem(email);

      if (!storedPassword) {
        Alert.alert('Error', 'No account found for this email.');
        return;
      }

      if (storedPassword === password) {
        
        await AsyncStorage.setItem('currentUser', email);

        Alert.alert('Success', 'Login successful!');
        onLoginSuccess(email); 
      } else {
        Alert.alert('Error', 'Invalid email or password.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong during login.');
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>{isRegistering ? 'Register' : 'Login'}</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={isRegistering ? handleRegister : handleLogin}
        >
          <Text style={styles.buttonText}>
            {isRegistering ? 'Register' : 'Login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsRegistering(!isRegistering)}
        >
          <Text style={styles.switchText}>
            {isRegistering
              ? 'Already have an account? Log in'
              : 'Don’t have an account? Register'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    width: '85%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  switchText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
