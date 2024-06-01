'use client';
import { createContext, useContext, useState } from 'react';

export const SettingsContext = createContext();

export const SettingsContextProvider = ({ children }) => {
	const [state, setState] = useState({
		collections: [],
		defaultLanguage: {
			_id: '6656eed3b12adae590481cfe',
			language: 'en',
			locale: 'en-US',
		},
		optionSchema: null,
		inputType: '',
		settings: [],
		selectedCollection: 0,
	});

	return (
		<SettingsContext.Provider value={{ state, setState }}>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettingsContext = () => {
	return useContext(SettingsContext);
};
