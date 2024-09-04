// export const isObjectEmpty = (obj) => Object.keys(obj) === 0;
// export const isObjectEmpty = (obj) => Array.from(obj).length === 0;

export const isObjectEmpty = (value) => {
  if (typeof value === 'object') {
    // Check for empty objects
    return Object.keys(value).length === 0;
  }
};

export const createRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateGridTemplate = (columns) => {
  return `25px repeat(${columns}, 1fr) 25px`;
};
