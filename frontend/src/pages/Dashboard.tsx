import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
        console.log(token)
      try {
        const response = await fetch(`http://localhost:8000/verify-token/${token}`);

        if (!response.ok) {
          throw new Error('Token verification failed');
        }
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    verifyToken();
  }, [navigate]);

  return <div>This is a protected page. Only visible to authenticated users.</div>;
}

export default Dashboard;

// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Dashboard() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyToken = async () => {
//       const token = localStorage.getItem('token');

//       if (!token) {
//         navigate('/');
//         return;
//       }

//       try {
//         const response = await fetch('http://localhost:8000/verify-token', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Token verification failed');
//         }
//       } catch (error) {
//         localStorage.removeItem('token');
//         navigate('/');
//       }
//     };

//     verifyToken();
//   }, [navigate]);

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <p>This is a protected page. Only visible to authenticated users.</p>
//     </div>
//   );
// }

// export default Dashboard;
