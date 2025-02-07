import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './Screens/LoginScreen';
import ProfileScreen from './Screens/ProfileScreen';
import MessagesScreen from './Screens/MessagesScreen';
import FindJobScreen from './Screens/FindJobScreen';
import ChangePasswordScreen from './Screens/ChangePasswordScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedInEmail = await AsyncStorage.getItem('loggedInEmail');
        if (loggedInEmail) {
          setIsLoggedIn(true); 
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setLoading(false); 
      }
    };

    checkLoginStatus();
  }, []);

  const handleLoginSuccess = async (email) => {
    try {
      await AsyncStorage.setItem('loggedInEmail', email);
      setIsLoggedIn(true); 
    } catch (error) {
      console.error('Error saving login status:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('loggedInEmail'); 
      setIsLoggedIn(false); 
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (loading) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Profile">
              {props => <ProfileScreen {...props} onLogout={handleLogout} />}
            </Stack.Screen>
            <Stack.Screen name="Messages" component={MessagesScreen} />
            <Stack.Screen name="FindJob" component={FindJobScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          </>
        ) : (
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
