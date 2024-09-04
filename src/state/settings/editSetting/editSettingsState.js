'use client';
import { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';

import { editSettingsReducer } from './editSettingReducer';
import { editSettingState } from './initialState';

export const EditSettingsContext = createContext();
export const EditSettingsDispatchContext = createContext();

export const EditSettingsContextProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(
    editSettingsReducer,
    editSettingState
  );

  return (
    <EditSettingsContext.Provider value={state}>
      <EditSettingsDispatchContext.Provider value={dispatch}>
        {children}
      </EditSettingsDispatchContext.Provider>
    </EditSettingsContext.Provider>
  );
};

export const useEditSettingsContext = () => {
  return useContext(EditSettingsContext);
};

export const useEditSettingsDispatchContext = () => {
  return useContext(EditSettingsDispatchContext);
};
