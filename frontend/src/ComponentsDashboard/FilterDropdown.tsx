type FilterDropdownProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
  categories: string[];
  statuses: string[];
};

const FilterDropdown = ({ visible, onClose, onSelect, categories, statuses }: FilterDropdownProps) => {
  if (!visible) return null;

  const handleSelect = (option: string) => {
    onSelect(option);
    onClose();
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '2.5rem',
        right: '10rem',
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
        <div key={cat} onClick={() => handleSelect(cat)} style={{ padding: '0.25rem', cursor: 'pointer' }}>
          {cat}
        </div>
      ))}
      <strong style={{ marginTop: '0.5rem', display: 'block' }}>Status:</strong>
      {statuses.map((stat) => (
        <div key={stat} onClick={() => handleSelect(stat)} style={{ padding: '0.25rem', cursor: 'pointer' }}>
          {stat}
        </div>
      ))}
      <div
        onClick={() => handleSelect('')}
        style={{ padding: '0.25rem', marginTop: '0.5rem', cursor: 'pointer', color: 'red' }}
      >
        ✕ Clear filter
      </div>
    </div>
  );
};

export default FilterDropdown;
