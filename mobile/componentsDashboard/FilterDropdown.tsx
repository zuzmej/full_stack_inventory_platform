import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';

type FilterDropdownProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
  categories: string[];
  statuses: string[];
};

const FilterDropdown = ({
  visible,
  onClose,
  onSelect,
  categories,
  statuses,
}: FilterDropdownProps) => {
  const handleSelect = (option: string) => {
    onSelect(option);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.sectionTitle}>Category:</Text>
            {categories.map((cat) => (
              <TouchableOpacity key={cat} onPress={() => handleSelect(cat)}>
                <Text style={styles.option}>{cat}</Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.sectionTitle}>Status:</Text>
            {statuses.map((stat) => (
              <TouchableOpacity key={stat} onPress={() => handleSelect(stat)}>
                <Text style={styles.option}>{stat}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={() => handleSelect('')}>
              <Text style={[styles.option, { color: 'red', marginTop: 10 }]}>✕ Clear filter</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default FilterDropdown;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    elevation: 5,
    maxHeight: '70%',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  option: {
    fontSize: 16,
    paddingVertical: 8,
  },
});
