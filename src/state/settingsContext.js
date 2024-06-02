'use client';
import { createContext, useContext, useState } from 'react';
import { useImmerReducer } from 'use-immer';

import { addSettingState } from './initialState';
import { addSettingReducer } from './reducers';

export const SettingsContext = createContext();
export const SettingsDispatchContext = createContext();

export const SettingsContextProvider = ({ children }) => {
	// const [state, dispatch] = useState(addSettingReducer, addSettingState);

	const [state, setState] = useState({
		collections: [],
		defaultLanguage: {
			_id: '6656eed3b12adae590481cfe',
			language: 'en',
			locale: 'en-US',
		},
		optionSchema: null,
		inputType: 'simple',
		settings: [],
		selectedCollection: 0,
	});

	return (
		<SettingsContext.Provider value={{ state, setState }}>
			{/* <SettingsDispatchContext.Provider value={dispatch}> */}

			{children}
			{/* </SettingsDispatchContext.Provider> */}
		</SettingsContext.Provider>
	);
};

export const useSettingsContext = () => {
	return useContext(SettingsContext);
};
