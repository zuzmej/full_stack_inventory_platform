type SortDropdownProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
};

const SortDropdown = ({ visible, onClose, onSelect }: SortDropdownProps) => {
  if (!visible) return null;

  const handleSelect = (option: string) => {
    onSelect(option);
    onClose();
  };

  return (
    <div style={{
      position: 'absolute',
      top: '2.5rem',
      right: '5rem',
      background: 'white',
      border: '1px solid #ccc',
      borderRadius: '5px',
      zIndex: 10,
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    }}>
      <div onClick={() => handleSelect('quantity-asc')} style={{ padding: '0.5rem', cursor: 'pointer' }}>Quantity (Ascending)</div>
      <div onClick={() => handleSelect('quantity-desc')} style={{ padding: '0.5rem', cursor: 'pointer' }}>Quantity (Descending)</div>
      <div onClick={() => handleSelect('status-asc')} style={{ padding: '0.5rem', cursor: 'pointer' }}>Status (A-Z)</div>
      <div onClick={() => handleSelect('status-desc')} style={{ padding: '0.5rem', cursor: 'pointer' }}>Status (Z-A)</div>
      <div onClick={() => handleSelect('category-asc')} style={{ padding: '0.5rem', cursor: 'pointer' }}>Category (A-Z)</div>
      <div onClick={() => handleSelect('category-desc')} style={{ padding: '0.5rem', cursor: 'pointer' }}>Category (Z-A)</div>
    </div>
  );
};

export default SortDropdown;
