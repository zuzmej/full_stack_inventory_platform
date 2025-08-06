import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../ComponentsDashboard/Sidebar';
import ResourceCard from '../ComponentsDashboard/ResourceCard';
import ResourceModal from '../ComponentsDashboard/ResourceModal';
import AddResourceModal from '../ComponentsDashboard/AddResourceModal';
import EditResourceModal from '../ComponentsDashboard/EditResourceModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedResource, setSelectedResource] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [resources, setResources] = useState<any[]>([]);
  const [editingResource, setEditingResource] = useState<any>(null);
  const [sortVisible, setSortVisible] = useState(false);  // czy pokazuje listę opcji sortowania
  const [sortOption, setSortOption] = useState('');
  const categories = Array.from(new Set(resources.map((r) => r.category)));
  const statuses = Array.from(new Set(resources.map((r) => r.status)));
  const [filterVisible, setFilterVisible] = useState(false);  // czy pokazuje listę opcji filtrowania
  const [filterOption, setFilterOption] = useState('');

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

  const handleDeleteResource = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this resource?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/resources/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete resource');
      setResources(resources.filter((res) => res.id !== id));
    } catch (error) {
      alert('Error deleting resource');
    }
  };

  const handleUpdateResource = async (id: number, updatedData: any) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/resources/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Failed to update resource');

      const updated = await response.json();
      setResources((prev) => prev.map((res) => (res.id === id ? updated : res)));
    } catch (error) {
      alert('Error updating resource');
    }
  };

  const getFilteredResources = () => {
    let filtered = [...resources];

    if (filterOption) {
      filtered = filtered.filter(
        (res) =>
          res.category === filterOption || res.status === filterOption
      );
    }

    return filtered;
  };

  const getSortedResources = () => {
    const sorted = [...getFilteredResources()];

    switch (sortOption) {
      case 'quantity-asc':
        return sorted.sort((a, b) => a.quantity - b.quantity);
      case 'quantity-desc':
        return sorted.sort((a, b) => b.quantity - a.quantity);
      case 'status-asc':
        return sorted.sort((a, b) => a.status.localeCompare(b.status));
      case 'status-desc':
        return sorted.sort((a, b) => b.status.localeCompare(a.status));
      case 'category-asc':
        return sorted.sort((a, b) => a.category.localeCompare(b.category));
      case 'category-desc':
        return sorted.sort((a, b) => b.category.localeCompare(a.category));
      default:
        return sorted;
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

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Lewy pasek menu */}
      <Sidebar onLogout={handleLogout} />

      {/* Główna zawartość */}
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <h1>Inventory Dashboard</h1>
        <hr style={{ borderTop: '3px solid #333', marginTop: '0.5rem' }} />

      {/* Przyciski nad tabelą */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '2rem 0', position: 'relative' }}>
          <button onClick={() => setSortVisible((prev) => !prev)} style={{ marginRight: '1rem' }}>
            Sort
          </button>
          {sortVisible && (
            <div style={{
              position: 'absolute',
              top: '2.5rem',
              right: '5rem', // przesunięcie względem Sort
              background: 'white',
              border: '1px solid #ccc',
              borderRadius: '5px',
              zIndex: 10,
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}>
              <div onClick={() => { setSortOption('quantity-asc'); setSortVisible(false); }} style={{ padding: '0.5rem', cursor: 'pointer' }}>Quantity (Ascending)</div>
              <div onClick={() => { setSortOption('quantity-desc'); setSortVisible(false); }} style={{ padding: '0.5rem', cursor: 'pointer' }}>Quantity (Descending)</div>
              <div onClick={() => { setSortOption('status-asc'); setSortVisible(false); }} style={{ padding: '0.5rem', cursor: 'pointer' }}>Status (A-Z)</div>
              <div onClick={() => { setSortOption('status-desc'); setSortVisible(false); }} style={{ padding: '0.5rem', cursor: 'pointer' }}>Status (Z-A)</div>
              <div onClick={() => { setSortOption('category-asc'); setSortVisible(false); }} style={{ padding: '0.5rem', cursor: 'pointer' }}>Category (A-Z)</div>
              <div onClick={() => { setSortOption('category-desc'); setSortVisible(false); }} style={{ padding: '0.5rem', cursor: 'pointer' }}>Category (Z-A)</div>
            </div>
          )}
          <button onClick={() => setFilterVisible((prev) => !prev)} style={{ marginRight: '1rem' }}>
            Filter
          </button>
          {filterVisible && (
            <div
              style={{
                position: 'absolute',
                top: '2.5rem',
                right: '10rem', // dostosuj jeśli trzeba
                background: 'white',
                border: '1px solid #ccc',
                borderRadius: '5px',
                zIndex: 10,
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                padding: '0.5rem',
              }}
            >
              <strong>Category:</strong>
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => {
                    setFilterOption(cat);
                    setFilterVisible(false);
                  }}
                  style={{ padding: '0.25rem', cursor: 'pointer' }}
                >
                  {cat}
                </div>
              ))}
              <strong style={{ marginTop: '0.5rem', display: 'block' }}>Status:</strong>
              {statuses.map((stat) => (
                <div
                  key={stat}
                  onClick={() => {
                    setFilterOption(stat);
                    setFilterVisible(false);
                  }}
                  style={{ padding: '0.25rem', cursor: 'pointer' }}
                >
                  {stat}
                </div>
              ))}
              <div
                onClick={() => {
                  setFilterOption('');
                  setFilterVisible(false);
                }}
                style={{ padding: '0.25rem', marginTop: '0.5rem', cursor: 'pointer', color: 'red' }}
              >
                ✕ Clear filter
              </div>
            </div>
          )}

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
          {getSortedResources().map((res) => (
            <ResourceCard key={res.id} resource={res} onView={setSelectedResource} onEdit={setEditingResource} onDelete={handleDeleteResource} />
          ))}
        </div>
        {/* Modal - podgląd zasobu */}
        {showAddModal && (
          <AddResourceModal onClose={() => setShowAddModal(false)} onSubmit={handleAddResource} />
        )}
        {selectedResource && (
          <ResourceModal resource={selectedResource} onClose={() => setSelectedResource(null)} />
        )}
        {/* Edycja zasobu */}
        {editingResource && (
          <EditResourceModal resource={editingResource} onClose={() => setEditingResource(null)} onSubmit={handleUpdateResource} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
