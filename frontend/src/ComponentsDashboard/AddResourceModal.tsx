import React, { useState } from 'react';

const AddResourceModal = ({ onClose, onSubmit }: { onClose: () => void, onSubmit: (resource: any) => void }) => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    quantity: 0,
    status: 'Available',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const today = new Date().toISOString().slice(0, 10);
    onSubmit({
      ...form,
      quantity: Number(form.quantity),
      date_added: today,
      last_updated: today,
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '400px' }}>
        <h2>Add New Resource</h2>
        <input name="name" placeholder="Name" onChange={handleChange} style={{ display: 'block', margin: '0.5rem 0' }} />
        <input name="category" placeholder="Category" onChange={handleChange} style={{ display: 'block', margin: '0.5rem 0' }} />
        <input name="quantity" type="number" placeholder="Quantity" onChange={handleChange} style={{ display: 'block', margin: '0.5rem 0' }} />
        <select name="status" onChange={handleChange} style={{ display: 'block', margin: '0.5rem 0' }}>
          <option>Available</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
        <button onClick={handleSubmit}>Add</button>
        <button onClick={onClose} style={{ marginLeft: '1rem' }}>Cancel</button>
      </div>
    </div>
  );
};

export default AddResourceModal;
