const ResourceModal = ({ resource, onClose }: any) => {
  // Formatowanie daty (np. do YYYY-MM-DD)
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString();  // lub inny format
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '400px', margin: 'auto' }}>
        <h2>{resource.name}</h2>
        <p><strong>Category:</strong> {resource.category}</p>
        <p><strong>Quantity:</strong> {resource.quantity}</p>
        <p><strong>Status:</strong> {resource.status}</p>
        <p><strong>Date Added:</strong> {formatDate(resource.date_added)}</p>
        <p><strong>Last Updated:</strong> {formatDate(resource.last_updated)}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};


export default ResourceModal;
