import { useEffect, useState } from 'react';
import AuthService from '../services/auth.service';
import  AuthContext  from './AuthContext';


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const setAuth = (user) => {
    setUser(user);
  }

  return (
    <AuthContext.Provider value={{ user, setAuth }}>{children}</AuthContext.Provider>
  );
};

