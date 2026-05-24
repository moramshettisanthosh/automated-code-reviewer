import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('nova_token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('nova_token', token);
      api.setToken(token);
      api.get('/auth/profile').then((response) => setUser(response.data.user)).catch(() => logout());
    } else {
      localStorage.removeItem('nova_token');
    }
  }, [token]);

  const login = (data) => {
    setToken(data.token);
    setUser(data.user);
    navigate('/dashboard');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('nova_token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
