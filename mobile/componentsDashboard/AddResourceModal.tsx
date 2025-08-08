import React, { useState } from 'react';
import {Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddResourceModal = ({
  visible,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (resource: any) => void;
}) => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    quantity: '',
    status: 'Available',
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...form,
      quantity: Number(form.quantity),
    });
    setForm({
      name: '',
      category: '',
      quantity: '',
      status: 'Available',
    });
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Add New Resource</Text>

            <TextInput
              placeholder="Name"
              value={form.name}
              onChangeText={(text) => handleChange('name', text)}
              style={styles.input}
            />

            <TextInput
              placeholder="Category"
              value={form.category}
              onChangeText={(text) => handleChange('category', text)}
              style={styles.input}
            />

            <TextInput
              placeholder="Quantity"
              value={form.quantity}
              keyboardType="numeric"
              onChangeText={(text) => handleChange('quantity', text)}
              style={styles.input}
            />

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={form.status}
                onValueChange={(value) => handleChange('status', value)}
              >
                <Picker.Item label="Available" value="Available" />
                <Picker.Item label="Low Stock" value="Low Stock" />
                <Picker.Item label="Out of Stock" value="Out of Stock" />
              </Picker>
            </View>

            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddResourceModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    marginBottom: 10,
    overflow: 'hidden',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  closeIcon: {
    position: 'absolute',
    right: 15,
    zIndex: 1,
    padding: 5,
  },
  closeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    borderWidth: 1,
    marginHorizontal: 5,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});
