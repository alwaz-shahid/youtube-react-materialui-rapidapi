import React, { useState, useContext } from 'react';

const MyContext = React.createContext({});

const MyContextProvider = ({ children }) => {
  const [state, setState] = useState({});

  const setValue = (key, value) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const getLocalData = (key) => {
    const data = localStorage.getItem(key);

    if (data) {
      return JSON.parse(data);
    }

    return null;
  };

  const setLocalData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return (
    <MyContext.Provider value={{ state, setValue, getLocalData, setLocalData }}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => useContext(MyContext);

export { MyContextProvider, useMyContext };
