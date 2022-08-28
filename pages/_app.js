import '../styles/index.css';
import { useState, useEffect } from 'react';
import { TopItemDisplay } from '../src/components/top-item-display';
function MyApp({ Component, pageProps }) {
  const CLIENT_ID = 'b9a2303ef14e4e718e4cf49e46e6f6dd';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const REDIRECT_URI = 'http://localhost:3000';
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
  });

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <TopItemDisplay item="tracks" />
      <a
        className="my-4 flex w-fit text-sm p-2 font-light border border-black rounded-xl 
        hover:bg-black hover:text-green-500 hover:scale-110 hover:font-bold hover:ring-green-500 hover:ring-2"
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
          '%20'
        )}&response_type=${RESPONE_TYPE}`}
      >
        Login to Spotify
      </a>
    </div>
  );
}

export default MyApp;
