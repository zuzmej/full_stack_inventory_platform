import React, { useEffect, useState } from 'react';
import {View, Text, Button, StyleSheet, ScrollView, Alert, TouchableOpacity, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

import AddResourceModal from '../componentsDashboard/AddResourceModal';
import EditResourceModal from '../componentsDashboard/EditResourceModal';
import ResourceModal from '../componentsDashboard/ResourceModal';
import ResourceCard from '../componentsDashboard/ResourceCard';
import SortDropdown from '../componentsDashboard/SortDropdown';
import FilterDropdown from '../componentsDashboard/FilterDropdown';

const DashboardScreen = () => {
  const router = useRouter();
  const [resources, setResources] = useState<any[]>([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [editingResource, setEditingResource] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const categories = Array.from(new Set(resources.map(r => r.category)));
  const statuses = Array.from(new Set(resources.map(r => r.status)));

  useEffect(() => {
    const verifyToken = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        const res = await fetch(`http://192.168.0.139:8000/verify-token/${token}`);
        if (!res.ok) throw new Error('Invalid token');
      } catch (err) {
        await AsyncStorage.removeItem('token');
        router.replace('/');
      }
    };
    verifyToken();
  }, []);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch('http://192.168.0.139:8000/resources', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setResources(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResources();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/');
  };

  const handleAddResource = async (newResource: any) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://192.168.0.139:8000/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newResource),
      });

      if (!response.ok) throw new Error('Failed to add resource');
      const added = await response.json();
      setResources([...resources, added]);
    } catch (error) {
      Alert.alert('Error', 'Error adding resource');
    }
  };

  const handleDeleteResource = async (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this resource?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('token');
              const response = await fetch(`http://192.168.0.139:8000/resources/${id}`, {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              if (!response.ok) throw new Error('Failed to delete resource');
              setResources(resources.filter((res) => res.id !== id));
            } catch (error) {
              Alert.alert('Error', 'Error deleting resource');
            }
          },
        },
      ]
    );
  };

  const handleUpdateResource = async (id: number, updatedData: any) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://192.168.0.139:8000/resources/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Failed to update resource');

      const updated = await response.json();
      setResources((prev) => prev.map((res) => (res.id === id ? updated : res)));
    } catch (error) {
      Alert.alert('Error', 'Error updating resource');
    }
  };

  const getFilteredResources = () => {
    let filtered = [...resources];
    if (filterOption) {
      filtered = filtered.filter(
        (res) => res.category === filterOption || res.status === filterOption
      );
    }
    return filtered;
  };

  const getSortedResources = () => {
    const sorted = [...getFilteredResources()];
    switch (sortOption) {
      case 'quantity-asc':
        return sorted.sort((a, b) => a.quantity - b.quantity);
      case 'quantity-desc':
        return sorted.sort((a, b) => b.quantity - a.quantity);
      case 'status-asc':
        return sorted.sort((a, b) => a.status.localeCompare(b.status));
      case 'status-desc':
        return sorted.sort((a, b) => b.status.localeCompare(a.status));
      case 'category-asc':
        return sorted.sort((a, b) => a.category.localeCompare(b.category));
      case 'category-desc':
        return sorted.sort((a, b) => b.category.localeCompare(a.category));
      default:
        return sorted;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Inventory Dashboard</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>

      <View style={styles.buttonRow}>
        <Button title="Sort" onPress={() => setSortVisible(!sortVisible)} />
        <Button title="Filter" onPress={() => setFilterVisible(!filterVisible)} />
        <Button title="+ Add" onPress={() => setShowAddModal(true)} />
      </View>

      {sortVisible && (
        <SortDropdown visible onClose={() => setSortVisible(false)} onSelect={setSortOption} />
      )}
      {filterVisible && (
        <FilterDropdown
          visible
          onClose={() => setFilterVisible(false)}
          onSelect={setFilterOption}
          categories={categories}
          statuses={statuses}
        />
      )}

      <ScrollView style={styles.resourceList}>
        {getSortedResources().map((res) => (
          <ResourceCard
            key={res.id}
            resource={res}
            onView={setSelectedResource}
            onEdit={setEditingResource}
            onDelete={handleDeleteResource}
          />
        ))}
      </ScrollView>

      <AddResourceModal visible={showAddModal} onClose={() => setShowAddModal(false)} onSubmit={handleAddResource} />
      <ResourceModal resource={selectedResource} onClose={() => setSelectedResource(null)} />
      <EditResourceModal resource={editingResource} onClose={() => setEditingResource(null)} onSubmit={handleUpdateResource} />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16
  },
  resourceList: {
    flex: 1
  }
});
