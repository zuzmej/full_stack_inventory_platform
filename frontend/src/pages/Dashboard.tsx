import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedResource, setSelectedResource] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:8000/verify-token/${token}`);
        if (!response.ok) throw new Error('Token verification failed');
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    verifyToken();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const resources = [
    {
      id: 1,
      name: 'Printer Paper',
      category: 'Office',
      quantity: 50,
      status: 'Available',
      dateAdded: '2025-08-01',
      lastUpdated: '2025-08-04',
      image: 'https://via.placeholder.com/250x150?text=Printer+Paper',
    },
    {
      id: 2,
      name: 'Black Ink Cartridge',
      category: 'Office',
      quantity: 3,
      status: 'Low Stock',
      dateAdded: '2025-07-30',
      lastUpdated: '2025-08-03',
      image: 'https://via.placeholder.com/250x150?text=Ink+Cartridge',
    },
    {
      id: 3,
      name: 'Apples',
      category: 'Food',
      quantity: 100,
      status: 'Available',
      dateAdded: '2025-08-01',
      lastUpdated: '2025-08-05',
      image: 'https://via.placeholder.com/250x150?text=Apples',
    },
    {
      id: 4,
      name: 'Milk',
      category: 'Food',
      quantity: 5,
      status: 'Low Stock',
      dateAdded: '2025-07-28',
      lastUpdated: '2025-08-03',
      image: 'https://via.placeholder.com/250x150?text=Milk',
    },
    {
      id: 5,
      name: 'Eggs',
      category: 'Food',
      quantity: 0,
      status: 'Out of Stock',
      dateAdded: '2025-07-25',
      lastUpdated: '2025-08-02',
      image: 'https://via.placeholder.com/250x150?text=Eggs',
    },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '200px',
          backgroundColor: '#2c3e50',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem 1rem',
        }}
      >
        <h2 style={{ marginBottom: '2rem' }}>Menu</h2>
        <button
          style={{
            marginBottom: '1rem',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          My Account
        </button>
        <button
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          Log out
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {/* Header */}
        <h1 style={{ margin: 0 }}>Inventory Dashboard</h1>
        <hr style={{ borderTop: '3px solid #333', marginTop: '0.5rem' }} />

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '2rem 0' }}>
          <button style={{ marginRight: '1rem' }}>Sort</button>
          <button style={{ marginRight: '1rem' }}>Filter</button>
          <button style={{ backgroundColor: '#2c3e50', color: 'white' }}>
            + Add Resource
          </button>
        </div>

        {/* Resource Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {resources.map((res) => (
            <div
              key={res.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: 'white',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src={res.image}
                alt={res.name}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginBottom: '0.5rem',
                }}
              />
              <h3>{res.name}</h3>
              <p>Quantity: {res.quantity}</p>
              <p>Status: {res.status}</p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => setSelectedResource(res)}>View</button>
                <button>Edit</button>
                <button style={{ color: 'red' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal (View) */}
        {selectedResource && (
          <div
            onClick={() => setSelectedResource(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '8px',
                width: '400px',
              }}
            >
              <h2>{selectedResource.name}</h2>
              <img
                src={selectedResource.image}
                alt={selectedResource.name}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginBottom: '1rem',
                }}
              />
              <p><strong>Category:</strong> {selectedResource.category}</p>
              <p><strong>Quantity:</strong> {selectedResource.quantity}</p>
              <p><strong>Status:</strong> {selectedResource.status}</p>
              <p><strong>Date Added:</strong> {selectedResource.dateAdded}</p>
              <p><strong>Last Updated:</strong> {selectedResource.lastUpdated}</p>
              <button onClick={() => setSelectedResource(null)} style={{ marginTop: '1rem' }}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
