import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      setLoading(false);

      if (response.ok) {
        navigate('/');
      } else {
        const data = await response.json();
        setError(data.detail || 'Registration failed');
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong');
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/background_main2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1
        style={{
          color: 'black',
          fontSize: '55px',
          fontWeight: 'bold',
          fontFamily: 'Arial, sans-serif',
          marginBottom: '5rem',
        }}
      >
        Inventory Platform for XYZ
      </h1>

      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '2rem',
          borderRadius: '8px',
          width: '400px',
          textAlign: 'center',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div
          style={{
            height: '80px',
            backgroundColor: '#eee',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif',
            color: '#333',
          }}
        >
          Register
        </div>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '0.5rem',
            boxSizing: 'border-box',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '0.5rem',
            boxSizing: 'border-box',
          }}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1rem',
            boxSizing: 'border-box',
          }}
        />
        <button
          onClick={handleRegister}
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Registering...' : 'Submit'}
        </button>
        {error && (
          <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
        )}

        <p style={{ marginTop: '3rem', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <Link to="/" style={{ color: '#0077cc' }}>
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
