import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // tu będzie logika logowania (API call)
    console.log('Logging in with', email, password);
  };

  return (
    <div
      style={{
        backgroundImage: "url('/background_main.jpg')",
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
    
    {/* Tytuł */}
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

    {/* Formularz logowania */}
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
            color: '#333'
          }}
        >
          Log in
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '0.5rem',
            boxSizing: 'border-box'
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
            marginBottom: '1rem',
            boxSizing: 'border-box'
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>

        <p style={{ marginTop: '3rem', fontSize: '0.9rem' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#0077cc' }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

