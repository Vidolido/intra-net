export const isObjectEmpty = (obj) => Object.keys(obj) === 0;

export const createRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
