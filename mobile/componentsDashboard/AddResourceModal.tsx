import React, { useState } from 'react';
import {Modal, View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
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
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
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

            <View style={styles.buttonRow}>
              <Button title="Add" onPress={handleSubmit} />
              <View style={{ width: 10 }} />
              <Button title="Cancel" onPress={onClose} color="#999" />
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
});
