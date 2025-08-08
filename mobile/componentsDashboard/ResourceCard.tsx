import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
        <TouchableOpacity style={styles.button} onPress={() => onView(resource)}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onEdit(resource)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(resource.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
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
  button: {
    backgroundColor: '#2c3e50',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'rgba(168, 2, 2, 0.66)',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    flex: 1,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
