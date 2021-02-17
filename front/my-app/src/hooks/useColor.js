import useRemoteData from './useRemoteData.js';
import { decodeToken } from 'react-jwt';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/providers/AuthProvider.js';

const useColor = () => {
  const [color, setColor] = useState(JSON.parse(window.localStorage.getItem('color')));
  if (color === null) {
    setColor('green');
  }
  const html = document.querySelector('html');
  useEffect(() => {
    window.localStorage.setItem('color', JSON.stringify(color));
    if (color === 'blue') {
      html.classList.remove('yellow');
      html.classList.remove('pink');
      html.classList.remove('purple');
      html.classList.remove('orange');
      html.classList.remove('green');
      html.classList.add(color);
    } else if (color === 'yellow') {
      html.classList.remove('blue');
      html.classList.remove('pink');
      html.classList.remove('purple');
      html.classList.remove('orange');
      html.classList.remove('green');
      html.classList.add(color);
    } else if (color === 'pink') {
      html.classList.remove('blue');
      html.classList.remove('yellow');
      html.classList.remove('purple');
      html.classList.remove('orange');
      html.classList.remove('green');
      html.classList.add(color);
    } else if (color === 'purple') {
      html.classList.remove('yellow');
      html.classList.remove('pink');
      html.classList.remove('orange');
      html.classList.remove('green');
      html.classList.remove('blue');
      html.classList.add(color);
    } else if (color === 'orange') {
      html.classList.remove('yellow');
      html.classList.remove('pink');
      html.classList.remove('purple');
      html.classList.remove('green');
      html.classList.remove('blue');
      html.classList.add(color);
    } else if (color === 'green') {
      html.classList.remove('yellow');
      html.classList.remove('pink');
      html.classList.remove('purple');
      html.classList.remove('orange');
      html.classList.remove('blue');
      html.classList.add(color);
    }
  }, [color, html]);
  return [color, setColor];
};

export default useColor;
