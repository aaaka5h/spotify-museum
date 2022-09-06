import { BasicOMeter } from './basic-o-meter';
import { TopItem } from './top-track';

const SPOTIFY_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';
const BUTTON_TEXT = 'Click to generate grid!';

export const TopTracksDisplay = (data) => {
  return (
    <div className="flex flex-col justify-center w-screen">
      <BasicOMeter {...data.items} />
      {data.items && (
        <div className="mt-4 grid grid-cols-2 gap-y-4 sm:grid-cols-4 md:grid-cols-5">
          {data.items.map((item, idx) => {
            return <TopItem key={item.id} idx={idx + 1} {...item}></TopItem>;
          })}
        </div>
      )}
    </div>
  );
};
