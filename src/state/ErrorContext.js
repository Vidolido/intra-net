'use client';
import { createContext, useContext, useState } from 'react';

export const ErrorContext = createContext();

export const ErrorContextProvider = ({ children }) => {
  const [error, setError] = useState({
    error: {},
  });

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => {
  return useContext(ErrorContext);
};
