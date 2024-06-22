export const createLanguageInputs = (value) =>
	Object.entries(value).reduce((acc, currentValue) => {
		acc.push({ [currentValue[0]]: currentValue[1] });
		return acc;
	}, []);
