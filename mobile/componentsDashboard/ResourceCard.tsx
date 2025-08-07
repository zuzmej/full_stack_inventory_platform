import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ResourceCard = ({
  resource,
  onView,
  onDelete,
  onEdit,
}: {
  resource: any;
  onView: (res: any) => void;
  onDelete: (id: number) => void;
  onEdit: (res: any) => void;
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{resource.name}</Text>
      <Text><Text style={styles.label}>Category:</Text> {resource.category}</Text>
      <Text><Text style={styles.label}>Status:</Text> {resource.status}</Text>
      <Text><Text style={styles.label}>Quantity:</Text> {resource.quantity}</Text>

      <View style={styles.buttonRow}>
        <View style={styles.buttonWrapper}>
          <Button title="View" onPress={() => onView(resource)} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Edit" onPress={() => onEdit(resource)} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Delete"
            onPress={() => onDelete(resource.id)}
            color="#a80202"
          />
        </View>
      </View>
    </View>
  );
};

export default ResourceCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  label: {
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
});
