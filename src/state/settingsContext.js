'use client';
import { createContext, useContext, useState } from 'react';

export const SettingsContext = createContext();

export const SettingsContextProvider = ({ children }) => {
	const [state, setState] = useState({});

	return (
		<SettingsContext.Provider value={{ state, setState }}>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettingsContext = () => {
	return useContext(SettingsContext);
};
