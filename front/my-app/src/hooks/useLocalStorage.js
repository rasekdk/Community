import { useState, useEffect } from 'react';

export const useLocalStorage = (key = 'data', value) => {
  const [datos, setDatos] = useState(JSON.parse(window.localStorage.getItem(key)) || value);
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(datos));
  }, [datos, key]);
  return [datos, setDatos];
};
