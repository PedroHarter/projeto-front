import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/login';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Dashboard from '../components/Dashboard';
import Users from '../components/Users';
import Services from '../components/Services';

// Componente principal da aplicação
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota da página de login */}
        <Route path="/" element={<Login />} />
        
        {/* Rotas protegidas - só acessíveis após login */}
        <Route path="/dashboard" element={
          <div>
            <Navbar />
            <Dashboard />
            <Footer />
          </div>
        } />
        
        <Route path="/users" element={
          <div>
            <Navbar />
            <Users />
            <Footer />
          </div>
        } />
        
        <Route path="/services" element={
          <div>
            <Navbar />
            <Services />
            <Footer />
          </div>
        } />
        
        {/* Redireciona qualquer rota não encontrada para o dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;