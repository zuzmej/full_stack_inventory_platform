import React, { useState } from 'react';

const EditResourceModal = ({ resource, onClose, onSubmit }: any) => {
  const [formData, setFormData] = useState({
    name: resource.name,
    category: resource.category,
    quantity: resource.quantity,
    status: resource.status,
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(resource.id, formData);
    onClose();
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',  alignItems: 'center', justifyContent: 'center', }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '400px', margin: 'auto' }}>
        <h2>Edit Resource</h2>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" style={{ display: 'block', margin: '0.5rem 0' }} />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" style={{ display: 'block', margin: '0.5rem 0' }} />
        <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantity" style={{ display: 'block', margin: '0.5rem 0' }} />
        <select name="status" value={formData.status} onChange={handleChange} style={{ display: 'block', margin: '0.5rem 0' }}>
          <option>Available</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleSubmit} style={{ marginRight: '1rem' }}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditResourceModal;
