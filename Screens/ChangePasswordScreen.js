import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const ChangePasswordScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const getUserEmail = async () => {
      const email = await AsyncStorage.getItem('currentUser');
      setUserEmail(email);
    };
    getUserEmail();
  }, []);

  const handleChangePassword = async () => {
    if (!userEmail) {
      Alert.alert('Error', 'No user is logged in.');
      return;
    }

    const storedPassword = await AsyncStorage.getItem(userEmail);

    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (currentPassword !== storedPassword) {
      Alert.alert('Error', 'Current password is incorrect.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    await AsyncStorage.setItem(userEmail, newPassword);
    Alert.alert('Success', 'Password has been changed successfully.', [
      { text: 'OK', onPress: () => navigation.navigate('Profile') },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Change Password</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      
      <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
        <Text style={styles.saveButtonText}>Save Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, alignItems: 'center' },
  backButton: { position: 'absolute', top: 40, left: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#8B00FF', marginBottom: 20, marginTop: 60 },
  input: { width: '100%', padding: 10, borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 15, fontSize: 16 },
  saveButton: { backgroundColor: '#8B00FF', padding: 15, borderRadius: 10, alignItems: 'center', width: '100%' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ChangePasswordScreen;
