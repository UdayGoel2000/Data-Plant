import React, { useReducer, createContext, useContext, useEffect } from "react";
import { Prop, MyState, MyContext } from "../utils/Types";
import DataArray from "../assets/data.json";

const DataContext = createContext<MyContext | undefined>(undefined);
export const useMyContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
const DataProvider = ({ children }: Prop) => {
  const reducer = (state: MyState, newState: Partial<MyState>) => ({
    ...state,
    ...newState,
  });
  const [state, setState] = useReducer(reducer, {
    seacrhText: "",
    mainData: [],
  });
  const handleState = (obj: Partial<MyState>) => {
    setState(obj);
  };
  const contextValue: MyContext = {
    state,
    handleState,
  };
  useEffect(() => {
    handleState({ mainData: DataArray.DataArray });
  }, []);

  return (
    <div>
      <DataContext.Provider value={contextValue}>
        {children}
      </DataContext.Provider>
    </div>
  );
};

export { DataProvider, DataContext };
