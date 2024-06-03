'use client';
import { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';

import { addSettingState } from './initialState';
import { addSettingReducer } from './reducers';

export const SettingsContext = createContext();
export const SettingsDispatchContext = createContext();

export const SettingsContextProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(addSettingReducer, addSettingState);

  return (
    <SettingsContext.Provider value={state}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  return useContext(SettingsContext);
};

export const useSettingsDispatchContext = () => {
  return useContext(SettingsDispatchContext);
};
