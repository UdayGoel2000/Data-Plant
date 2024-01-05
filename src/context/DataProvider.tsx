import React, { useReducer, createContext, useContext } from "react";
import { Prop, MyState, MyContext } from "../utils/Types";

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
  const [state, setState] = useReducer(reducer, { seacrhText: "" });
  const handleState = (obj: Partial<MyState>) => {
    setState(obj);
  };
  const contextValue: MyContext = {
    state,
    handleState,
  };

  return (
    <div>
      <DataContext.Provider value={contextValue}>
        {children}
      </DataContext.Provider>
    </div>
  );
};

export { DataProvider, DataContext };
