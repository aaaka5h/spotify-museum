// Returns an object containing an access token, expiry token, and type from current hash
export const getFromAuth = (hash) => {
  const paramsInURL = hash.substring(1).split('&');
  const tokenObj = paramsInURL.reduce((acc, info) => {
    const [key, value] = info.split('=');
    acc[key] = value;
    return acc;
  }, {});

  return tokenObj;
};

// Returns the ordinal form of a given number
export const numToOrdinal = (num) => {
  const j = num % 10,
    k = num % 100;
  if (j == 1 && k != 11) {
    return num < 21 ? '#1' : num + 'st';
  }
  if (j == 2 && k != 12) {
    return num + 'nd';
  }
  if (j == 3 && k != 13) {
    return num + 'rd';
  }
  return num + 'th';
};

// Returns a song length in milliseconds in x:xx:xx format
export const formatSongLength = (length) => {
  if (length < 60000) {
    return `0:${length.toString().substring(0, 2)}`;
  }
  return new Date(length)
    .toISOString()
    .substring(11, 19)
    .replace(/^[0:]+/, '');
};

// Returns an array of two strings, a color and a popularity ranking from a given popularity from 0 to 100
export const colorizeNum = (num) => {
  if (num < 51) {
    if (num < 34) {
      if (num < 17) {
        return ['text-[#FF0D0D]', 'Extremely Low'];
      } else {
        return ['text-[#FF4e11]', 'Very Low'];
      }
    } else {
      return ['text-[#FF8E15]', 'Low'];
    }
  } else {
    if (num < 68) {
      return ['text-[#FAB733]', 'Medium'];
    } else if (num < 85) {
      return ['text-[#ACB334]', 'High'];
    } else {
      return ['text-[#69B34C]', 'Very High'];
    }
  }
};

// Return the average popularity given an array of songs with popularity data
export const getAvgPopularity = (songs) => {
  let acc = 0;
  const songKeys = Object.keys(songs);
  songKeys.forEach((i) => (acc += songs[i].popularity));
  return 100 - Math.floor(acc / songKeys.length);
};
