import { useEffect, useState } from 'react';

const useRemoteData = (url, auth = '') => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          auth: auth,
          'Content-type': 'application/json',
        },
      });

      const json = await res.json();
      await setData(json);
    };
    loadData();
  }, [url, auth, setData]);

  return [data, setData];
};

export default useRemoteData;
