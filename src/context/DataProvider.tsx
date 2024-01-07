import React, { useReducer, createContext, useContext, useEffect } from "react";
import { Prop, MyState, MyContext, modalDetailsType } from "../utils/Types";
import DataArray from "../assets/data.json";

const DataContext = createContext<MyContext | undefined>(undefined);
export const useMyContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
export const TimeToValue = (time: string) => {
  const t = time.split(":");
  if (t[1][2] === "A") return `${t[0]}:${t[1].slice(0, 2)}`;
  else return `${12 + +t[0]}:${t[1].slice(0, 2)}`;
};
export const ValueToTime = (value: string) => {
  const v = value.split(":");
  if (Number(v[0]) < 12 || (Number(v[0]) <= 11 && Number(v[1]) < 59)) {
    return `${Number(v[0])}:${v[1]}AM`;
  } else {
    return `${Number(v[0]) - 12 === 0 ? Number(v[0]) : Number(v[0]) - 12}:${
      v[1]
    }PM`;
  }
};
const DataProvider = ({ children }: Prop) => {
  const reducer = (state: MyState, newState: Partial<MyState>) => ({
    ...state,
    ...newState,
  });
  const d = new Date();
  const [state, setState] = useReducer(reducer, {
    seacrhText: "",
    mainData: [],
    apiData: [],
    isModalOpen: false,
    modalType: "None",
    clickedDataId: "",
    modalDeatils: {
      Title: "",
      Description: "",
      Subject: "",
      Frequency: "Monthly",
      Repeat: "",
      Time: `${d.getHours()}:${d.getMinutes()}`,
    },
  });
  const handleState = (obj: Partial<MyState>) => {
    setState(obj);
  };
  const contextValue: MyContext = {
    state,
    handleState,
  };
  useEffect(() => {
    handleState({
      apiData: DataArray.DataArray,
      mainData: DataArray.DataArray,
    });
  }, []);

  useEffect(() => {
    if (state.seacrhText !== "") {
      handleState({
        mainData: [
          ...state.apiData.filter((ele) =>
            ele.Title.includes(state.seacrhText)
          ),
        ],
      });
    } else {
      handleState({ mainData: [...state.apiData] });
    }
  }, [state.seacrhText, state.apiData]);

  useEffect(() => {
    if (state.modalType === "Edit") {
      console.log();
      const editModalData: modalDetailsType | null = [
        ...state.apiData.map((ele) =>
          ele.Id === state.clickedDataId
            ? {
                Title: ele.Title,
                Description: ele.Description,
                Subject: ele.Subject,
                Frequency:
                  ele.Schedule.indexOf(" on ") !== -1
                    ? ele.Schedule.split(" on ")[0]
                    : ele.Schedule.split(" at ")[0],
                Repeat:
                  ele.Schedule.indexOf(" on ") !== -1
                    ? ele.Schedule.split(" on ")[1].split(" at ")[0]
                    : "",
                Time: TimeToValue(ele.Schedule.split(" at ")[1]),
              }
            : null
        ),
      ].filter((ele) => ele)[0];
      handleState({
        isModalOpen: true,
        modalDeatils: editModalData
          ? editModalData
          : {
              Title: "string",
              Description: "string",
              Subject: "string",
              Frequency: "string",
              Repeat: "string",
              Time: "string",
            },
      });
    } else if (state.modalType === "Delete") {
      handleState({
        apiData: [
          ...state.apiData.filter((ele) => ele.Id !== state.clickedDataId),
        ],
        modalType: "None",
      });
    } else if (state.modalType === "Add") {
      handleState({
        isModalOpen: true,
        modalDeatils: {
          Title: "",
          Description: "",
          Subject: "",
          Frequency: "Monthly",
          Repeat: "",
          Time: `${d.getHours()}:${d.getMinutes()}`,
        },
      });
    }
  }, [state.modalType]);
  useEffect(() => {
    handleState({ modalDeatils: { ...state.modalDeatils, Repeat: "" } });
  }, [state.modalDeatils.Frequency]);

  return (
    <div>
      <DataContext.Provider value={contextValue}>
        {children}
      </DataContext.Provider>
    </div>
  );
};

export { DataProvider, DataContext };
