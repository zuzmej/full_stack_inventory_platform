const Sidebar = ({ onLogout }: { onLogout: () => void }) => (
  <div style={{ width: '200px', backgroundColor: '#2c3e50', color: 'white', padding: '2rem 1rem' }}>
    <h2>Menu</h2>
    <button style={{ background: 'none', border: 'none', color: 'white' }}>My Account</button>
    <button onClick={onLogout} style={{ background: 'none', border: 'none', color: 'white' }}>Log out</button>
  </div>
);

export default Sidebar;
