import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ onLogout, navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [editingBio, setEditingBio] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      const savedFirstName = await AsyncStorage.getItem('firstName');
      const savedLastName = await AsyncStorage.getItem('lastName');
      const savedProfileImage = await AsyncStorage.getItem('profileImage');
      const savedBio = await AsyncStorage.getItem('bio');

      if (savedFirstName) setFirstName(savedFirstName);
      if (savedLastName) setLastName(savedLastName);
      if (savedProfileImage) setProfileImage(savedProfileImage);
      if (savedBio) setBio(savedBio);
    };
    loadDetails();
  }, []);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: onLogout },
    ]);
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      await AsyncStorage.setItem('profileImage', result.assets[0].uri);
    }
  };

  const saveName = async () => {
    await AsyncStorage.setItem('firstName', firstName);
    await AsyncStorage.setItem('lastName', lastName);
    setEditingName(false);
  };

  const saveBio = async () => {
    await AsyncStorage.setItem('bio', bio);
    setEditingBio(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={handleImagePicker}>
            <Image
              source={profileImage ? { uri: profileImage } : { uri: 'https://via.placeholder.com/100' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          {editingName ? (
            <View style={styles.nameInputContainer}>
              <TextInput
                style={styles.nameInput}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextInput
                style={styles.nameInput}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
              />
              <TouchableOpacity onPress={saveName}>
                <Ionicons name="checkmark" size={15} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setEditingName(true)}>
              <Text style={styles.profileName}>{firstName || 'Enter'} {lastName || 'Your Name'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.bioSection}>
        {editingBio ? (
          <View style={styles.nameInputContainer}>
            <TextInput
              style={styles.bioInput}
              placeholder="Enter your bio"
              value={bio}
              onChangeText={setBio}
              multiline
            />
            <TouchableOpacity onPress={saveBio}>
              <Ionicons name="checkmark" size={20} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setEditingBio(true)}>
            <Text style={styles.bioText}>{bio || 'Add your bio'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.menuContainer}>
        <MenuItem icon="mail-outline" label="Messages" badge={5} onPress={() => navigation.navigate('Messages')} />
        <MenuItem icon="briefcase-outline" label="Find a Job" onPress={() => navigation.navigate('FindJob')} />
        <MenuItem icon="lock-closed-outline" label="Change Password" onPress={() => navigation.navigate('ChangePassword')} />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#FF725E" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const MenuItem = ({ icon, label, badge, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#555" />
    <Text style={styles.menuLabel}>{label}</Text>
    {badge && <View style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#8B00FF', padding: 20, alignItems: 'center', borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
  profileSection: { alignItems: 'center', marginTop: 30 },
  avatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#fff' },
  profileName: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginTop: 10 },
  bioSection: { padding: 20 },
  bioText: { fontSize: 16, color: '#555', marginBottom: 10 },
  nameInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 4,
    borderRadius: 7,
    marginTop: 7,
    width: '90%', 
    alignSelf: 'center',
  },
  nameInput: {
    color: 'white',
    fontSize: 16,
    marginRight: 5,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    width: '40%',  
    maxWidth: 150,
  },
  bioInput: {
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    width: '80%',
    minHeight: 80,
  },
  menuContainer: { padding: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  menuLabel: { marginLeft: 15, fontSize: 16, flex: 1, color: '#333' },
  badge: { backgroundColor: '#FF725E', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', padding: 20, borderTopWidth: 1, borderColor: '#ddd' },
  logoutText: { marginLeft: 10, fontSize: 16, color: '#FF725E', fontWeight: 'bold' },
});

export default ProfileScreen;
