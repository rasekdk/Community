import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const AuthContext = React.createContext('');

const AuthProvider = ({ value, children }) => {
  const [auth, setAuth] = useLocalStorage('auth', value);
  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
