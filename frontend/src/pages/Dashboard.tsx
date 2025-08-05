import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../ComponentsDashboard/Sidebar';
import ResourceCard from '../ComponentsDashboard/ResourceCard';
import ResourceModal from '../ComponentsDashboard/ResourceModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedResource, setSelectedResource] = useState(null);

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

  // Lista zasobów
  const resources = [
    { id: 1, name: 'Printer Paper', category: 'Office', quantity: 50, status: 'Available', dateAdded: '2025-08-01', lastUpdated: '2025-08-04' },
    { id: 2, name: 'Black Ink Cartridge', category: 'Office', quantity: 3, status: 'Low Stock', dateAdded: '2025-07-30', lastUpdated: '2025-08-03' },
    { id: 3, name: 'Apples', category: 'Food', quantity: 100, status: 'Available', dateAdded: '2025-08-01', lastUpdated: '2025-08-05' },
    { id: 4, name: 'Milk', category: 'Food', quantity: 5, status: 'Low Stock', dateAdded: '2025-07-28', lastUpdated: '2025-08-03' },
    { id: 5, name: 'Eggs', category: 'Food', quantity: 0, status: 'Out of Stock', dateAdded: '2025-07-25', lastUpdated: '2025-08-02' },
  ];

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
          <button style={{ backgroundColor: '#2c3e50', color: 'white' }}>+ Add Resource</button>
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
        {selectedResource && (
          <ResourceModal resource={selectedResource} onClose={() => setSelectedResource(null)} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
