import axios from 'axios';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { BasicOMeter } from './basic-o-meter';
import { TopItem } from './top-track';

const SPOTIFY_ENDPOINT = 'https://api.spotify.com/v1/me/top';
const BUTTON_TEXT = 'Generate grid!';

export const TopTracksDisplay = (item = 'tracks', className) => {
  const [token, setToken] = useState('');
  const [data, setData] = useState({});
  const [gridStyles, setGridStyles] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  const getTopTracks = async () => {
    await axios
      .get(`${SPOTIFY_ENDPOINT}/tracks`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((resp) => {
        setData(resp.data);
        setGridStyles('w-screen');
      })
      .catch((err) => {
        console.log('Error:' + err);
      });
  };

  return (
    <>
      {data.items ? (
        <BasicOMeter {...data.items} />
      ) : (
        <button
          className="flex justify-center"
          onClick={() => getTopTracks(item)}
        >
          {BUTTON_TEXT}
        </button>
      )}
      <div
        className={classNames(
          gridStyles,
          className,
          'mt-4 grid grid-cols-2 gap-y-4 sm:grid-cols-4 md:grid-cols-5'
        )}
      >
        {data.items &&
          data?.items.map((item, idx) => {
            return <TopItem key={item.id} idx={idx + 1} {...item}></TopItem>;
          })}
      </div>
    </>
  );
};
