import { useEffect } from 'react';
import { decodeToken } from 'react-jwt';

const useScroll = (modal) => {
  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modal]);
};

export default useScroll;
