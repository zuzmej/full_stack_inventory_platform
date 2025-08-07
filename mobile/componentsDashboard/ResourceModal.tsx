import React from 'react';
import {Modal, View, Text, Button, StyleSheet, TouchableWithoutFeedback, Keyboard,} from 'react-native';

const ResourceModal = ({
  resource,
  onClose,
}: {
  resource: any;
  onClose: () => void;
}) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString();
  };

  if (!resource) return null;

  return (
    <Modal
      visible={!!resource}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.title}>{resource.name}</Text>

            <Text><Text style={styles.label}>Category:</Text> {resource.category}</Text>
            <Text><Text style={styles.label}>Quantity:</Text> {resource.quantity}</Text>
            <Text><Text style={styles.label}>Status:</Text> {resource.status}</Text>
            <Text><Text style={styles.label}>Date Added:</Text> {formatDate(resource.date_added)}</Text>
            <Text><Text style={styles.label}>Last Updated:</Text> {formatDate(resource.last_updated)}</Text>

            <View style={styles.buttonWrapper}>
              <Button title="Close" onPress={onClose} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ResourceModal;

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
  label: {
    fontWeight: 'bold',
  },
  buttonWrapper: {
    marginTop: 20,
  },
});
