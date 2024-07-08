'use client';
import { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';

import { createAnalysisState } from './initialState';
import { createAnalysisReducer } from './templateReducer';
// import { addSettingReducer } from './reducers';

export const LaboratoryContext = createContext();
export const LaboratoryDispatchContext = createContext();

export const LaboratoryContextProvider = ({ children }) => {
	const [state, dispatch] = useImmerReducer(
		createAnalysisReducer,
		createAnalysisState
	);

	return (
		<LaboratoryContext.Provider value={state}>
			<LaboratoryDispatchContext.Provider value={dispatch}>
				{children}
			</LaboratoryDispatchContext.Provider>
		</LaboratoryContext.Provider>
	);
};

export const useLaboratoryContext = () => {
	return useContext(LaboratoryContext);
};

export const useLaboratoryDispatchContext = () => {
	return useContext(LaboratoryDispatchContext);
};
