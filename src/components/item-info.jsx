import classNames from 'classnames';
import { numToOrdinal, formatSongLength, colorizeNum } from '../helpers';

export const ItemInfo = (item) => {
  const popularityProps = colorizeNum(item.popularity);

  return (
    <div className="text-sm text-gray-500 font-semibold">
      <p className="font-normal">
        {item.name} by{' '}
        {item.artists?.map((artist, index) => {
          return `${
            index !== item.artists.length - 1
              ? `${artist.name} and `
              : artist.name
          }`;
        })}{' '}
        is your {numToOrdinal(item.index)} favorite song right now!
      </p>
      <br></br>
      <p>
        Popularity ranking:{' '}
        <span className={classNames(popularityProps[0], 'font-normal')}>
          {popularityProps[1]}
        </span>
      </p>
      <p>
        Track length:{' '}
        <span className="font-normal">
          {formatSongLength(item.duration_ms)}
        </span>{' '}
      </p>
      <p>
        Album:{' '}
        <span className="font-normal">
          {item.album.album_type === 'ALBUM'
            ? item.album.name
            : 'Released as single'}
        </span>
      </p>
    </div>
  );
};
