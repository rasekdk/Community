import useRemoteData from './useRemoteData.js';
import { decodeToken } from 'react-jwt';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/providers/AuthProvider.js';

const useTheme = () => {
  const [theme, setTheme] = useState(JSON.parse(window.localStorage.getItem('theme')));
  if (theme === null) {
    setTheme('dark');
  }
  const html = document.querySelector('html');

  useEffect(() => {
    window.localStorage.setItem('theme', JSON.stringify(theme));
    if (theme === 'dark') {
      html.classList.remove('light');
      html.classList.add(theme);
    } else if (theme === 'light') {
      html.classList.remove('dark');
      html.classList.add(theme);
    }
  }, [theme, html]);
  return [theme, setTheme];
};

export default useTheme;
