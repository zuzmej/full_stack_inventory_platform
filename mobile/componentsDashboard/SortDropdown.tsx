import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type SortDropdownProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
};

const sortOptions = [
  { label: 'Quantity (Ascending)', value: 'quantity-asc' },
  { label: 'Quantity (Descending)', value: 'quantity-desc' },
  { label: 'Status (A-Z)', value: 'status-asc' },
  { label: 'Status (Z-A)', value: 'status-desc' },
  { label: 'Category (A-Z)', value: 'category-asc' },
  { label: 'Category (Z-A)', value: 'category-desc' },
];

const SortDropdown = ({ visible, onClose, onSelect }: SortDropdownProps) => {
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
          {sortOptions.map((opt) => (
            <TouchableOpacity key={opt.value} onPress={() => handleSelect(opt.value)}>
              <Text style={styles.option}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default SortDropdown;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 40,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
  },
  option: {
    paddingVertical: 10,
    fontSize: 16,
  },
});
