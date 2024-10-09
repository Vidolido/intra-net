'use client';
import { createContext, useContext } from 'react';

import { useImmerReducer } from 'use-immer';
import { singleDocumentReducer } from './reducer';
import { singleDocumentState } from './initialState';

export const SingleDocumentContext = createContext();
export const SingleDocumentDispatchContext = createContext();

export const SingleDocumentContextProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(
    singleDocumentReducer,
    singleDocumentState
  );

  return (
    <SingleDocumentContext.Provider value={state}>
      <SingleDocumentDispatchContext.Provider value={dispatch}>
        {children}
      </SingleDocumentDispatchContext.Provider>
    </SingleDocumentContext.Provider>
  );
};

export const useSingleDocumentContext = () => {
  return useContext(SingleDocumentContext);
};

export const useSingleDocumentDispatchContext = () => {
  return useContext(SingleDocumentDispatchContext);
};
