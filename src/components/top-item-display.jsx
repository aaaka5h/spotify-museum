import axios from 'axios';
import { useState, useEffect } from 'react';
import { TopItem } from './top-item';

const SPOTIFY_ENDPOINT = 'https://api.spotify.com/v1/me/top';

export const TopItemDisplay = (item = 'tracks', className) => {
  const [token, setToken] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  const getTopArtists = async (endpointItem) => {
    await axios
      .get(`${SPOTIFY_ENDPOINT}/tracks`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setData(resp.data);
      })
      .catch((err) => {
        console.log('Error:' + err);
      });
  };

  return (
    <div className="grid grid-cols-4">
      {data.items ? (
        data?.items.map((item) => {
          return <TopItem key={item.id} item={item}></TopItem>;
        })
      ) : (
        <button className="cols col-span-4" onClick={() => getTopArtists(item)}>
          Generate Museum!
        </button>
      )}
    </div>
  );
};
