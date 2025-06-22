import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
} 