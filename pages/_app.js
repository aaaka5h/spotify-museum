import '../styles/index.css';
import { useEffect, useState } from 'react';
import { TopTracksDisplay } from '../src/components/top-tracks-display';
import axios from 'axios';

function MyApp() {
  const CLIENT_ID = 'b9a2303ef14e4e718e4cf49e46e6f6dd';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const REDIRECT_URI = 'https://spotify-museum.vercel.app/';
  // const REDIRECT_URI = 'http://localhost:3000';
  const RESPONE_TYPE = 'token';
  const SCOPES = [
    'user-read-email',
    'user-top-read',
    'user-read-private',
    'user-library-read',
    'user-library-modify',
    'user-read-playback-state',
    'user-modify-playback-state',
  ];
  const SPOTIFY_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';

  const [token, setToken] = useState('');
  const [data, setData] = useState({});
  const [gridStyles, setGridStyles] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  const getFromAuth = (hash) => {
    const paramsInURL = hash.substring(1).split('&');
    const tokenObj = paramsInURL.reduce((acc, info) => {
      const [key, value] = info.split('=');
      acc[key] = value;
      return acc;
    }, {});

    return tokenObj;
  };

  useEffect(() => {
    const currHash = window.location.hash;
    if (currHash) {
      const { access_token, expires_in, token_type } = getFromAuth(currHash);

      localStorage.clear();
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('expiresIn', expires_in);
      localStorage.setItem('tokenType', token_type);
    }
  }, []);

  const getTopTracks = async () => {
    console.log('Got tracks');
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
        console.log('Error: ' + err);
      });
  };

  return (
    <div className="flex flex-col w-screen justify-center items-center">
      {data.items && <TopTracksDisplay {...data} />}
      <a
        className="mt-4 flex w-fit text-sm p-2 font-light border border-black rounded-xl transition-all
          hover:text-white hover:scale-105 hover:bg-black focus:ring-black focus:ring-2"
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
          '%20'
        )}&response_type=${RESPONE_TYPE}`}
      >
        Login to Spotify
      </a>
      {data && (
        <button
          className="mt-4 flex justify-center"
          onClick={() => getTopTracks()}
        >
          Click to generate grid!
        </button>
      )}
    </div>
  );
}

export default MyApp;
