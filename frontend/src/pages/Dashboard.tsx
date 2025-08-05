import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../ComponentsDashboard/Sidebar';
import ResourceCard from '../ComponentsDashboard/ResourceCard';
import ResourceModal from '../ComponentsDashboard/ResourceModal';
import AddResourceModal from '../ComponentsDashboard/AddResourceModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedResource, setSelectedResource] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [resources, setResources] = useState<any[]>([]);

  const handleAddResource = async (newResource: any) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newResource),
      });

      if (!response.ok) throw new Error('Failed to add resource');
      const added = await response.json();
      setResources([...resources, added]);
    } catch (error) {
      alert('Error adding resource');
    }
  };

  // Sprawdzenie tokena (czy użytkownik zalogowany)
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

  // Wylogowanie
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/resources', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch resources');
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);


  // // Lista zasobów
  // const resources = [
  //   { id: 1, name: 'Printer Paper', category: 'Office', quantity: 50, status: 'Available', dateAdded: '2025-08-01', lastUpdated: '2025-08-04' },
  //   { id: 2, name: 'Black Ink Cartridge', category: 'Office', quantity: 3, status: 'Low Stock', dateAdded: '2025-07-30', lastUpdated: '2025-08-03' },
  //   { id: 3, name: 'Apples', category: 'Food', quantity: 100, status: 'Available', dateAdded: '2025-08-01', lastUpdated: '2025-08-05' },
  //   { id: 4, name: 'Milk', category: 'Food', quantity: 5, status: 'Low Stock', dateAdded: '2025-07-28', lastUpdated: '2025-08-03' },
  //   { id: 5, name: 'Eggs', category: 'Food', quantity: 0, status: 'Out of Stock', dateAdded: '2025-07-25', lastUpdated: '2025-08-02' },
  // ];

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Lewy pasek menu */}
      <Sidebar onLogout={handleLogout} />

      {/* Główna zawartość */}
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <h1>Inventory Dashboard</h1>
        <hr style={{ borderTop: '3px solid #333', marginTop: '0.5rem' }} />

        {/* Przyciski nad tabelą */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '2rem 0' }}>
          <button style={{ marginRight: '1rem' }}>Sort</button>
          <button style={{ marginRight: '1rem' }}>Filter</button>
          <button style={{ backgroundColor: '#2c3e50', color: 'white' }} onClick={() => setShowAddModal(true)}> + Add Resource</button>
        </div>

        {/* Lista zasobów */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {resources.map((res) => (
            <ResourceCard key={res.id} resource={res} onView={setSelectedResource} />
          ))}
        </div>

        {/* Modal - podgląd zasobu */}
        {showAddModal && (
          <AddResourceModal
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddResource}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
