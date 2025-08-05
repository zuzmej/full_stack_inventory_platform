const ResourceCard = ({ resource, onView }: any) => (
  <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
    <h3>{resource.name}</h3>
    <p>Quantity: {resource.quantity}</p>
    <p>Status: {resource.status}</p>
    <button onClick={() => onView(resource)}>View</button>
  </div>
);

export default ResourceCard;
