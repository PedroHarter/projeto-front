import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/login';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import Users from '../components/Users';
import Services from '../components/Services';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/users" element={
          <Layout>
            <Users />
          </Layout>
        } />
        <Route path="/services" element={
          <Layout>
            <Services />
          </Layout>
        } />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;