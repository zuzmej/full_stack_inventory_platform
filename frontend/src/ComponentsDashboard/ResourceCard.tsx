const ResourceCard = ({ resource, onView, onDelete, onEdit }: any) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      <h3>{resource.name}</h3>
      <p><strong>Category:</strong> {resource.category}</p>
      <p><strong>Status:</strong> {resource.status}</p>
      <p><strong>Quantity:</strong> {resource.quantity}</p>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => onView(resource)} style={{ marginRight: '1rem' }}>
          View
        </button>
        <button onClick={() => onEdit(resource)} style={{ marginRight: '1rem' }}>
          Edit
        </button>
        <button onClick={() => onDelete(resource.id)} style={{ backgroundColor: 'rgba(168, 2, 2, 0.66)', color: 'white' }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;
