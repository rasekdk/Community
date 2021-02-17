import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

const useFont = () => {
  const [font, setFont] = useState(JSON.parse(window.localStorage.getItem('font')));
  if (font === null) {
    setFont(16);
  }
  const html = document.querySelector('html');
  useEffect(() => {
    window.localStorage.setItem('font', JSON.stringify(font));
    html.style.fontSize = `${font}px`;
  }, [font, html]);
  return [font, setFont];
};

export default useFont;
