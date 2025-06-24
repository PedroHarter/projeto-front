import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const AppLayout = () => (
  <div className="layout">
    <Navbar />
    <main className="layout-main">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default AppLayout;