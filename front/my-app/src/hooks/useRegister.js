import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useRegister = (data) => {
  // const history = useHistory();
  const url = 'http://192.168.0.19:8081/register';

  console.log(JSON.stringify(data));

  const result = fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  // history.push('/topic');
  return null;
};

export default useRegister;
