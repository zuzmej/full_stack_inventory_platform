import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }

      try {
        const response = await fetch('http://192.168.0.139:8000/users/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
        } else {
          const data = await response.json();
          setError(data.detail || 'Failed to load user data');
        }
      } catch (err) {
        setError('Network error');
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      {username ? (
        <Text>Welcome, {username}!</Text>
      ) : (
        <Text style={styles.error}>{error}</Text>
      )}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
  },
});
