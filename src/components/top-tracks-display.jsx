import axios from 'axios';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { BasicOMeter } from './basic-o-meter';
import { TopItem } from './top-track';

const SPOTIFY_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';

export const TopTracksDisplay = () => {
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
      .get(SPOTIFY_ENDPOINT, {
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
        <>
          <button
            className="mt-4 p-2 flex justify-center text-xs border border-black rounded-xl transition-all
          hover:text-white hover:scale-105 hover:bg-black focus:ring-black focus:ring-2"
            onClick={() => getTopTracks()}
          >
            'Generate museum!'
          </button>
          <span className="text-sm my-2 mx-4 justify-center text-center">
            Login to Spotify to generate your museum! If you are unable to
            generate museum after login, please try reconnecting to Spotify and
            generating again!
          </span>
        </>
      )}
      <div
        className={classNames(
          gridStyles,
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
