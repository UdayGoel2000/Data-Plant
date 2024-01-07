export type Prop = { children: JSX.Element };
export type TableDataType = {
  Id: string;
  Title: string;
  Description: string;
  Subject: string;
  Schedule: string;
};
// export type FrequencyType = "Monthly" | "Daily" | "Weekly";
export type modalDetailsType = {
  Title: string;
  Description: string;
  Subject: string;
  // Frequency: FrequencyType;
  Frequency: string;
  Repeat: string;
  Time: string;
};

export type ModalType = "Edit" | "Add" | "Delete" | "None";

export type MyState = {
  seacrhText: string;
  mainData: TableDataType[];
  apiData: TableDataType[];
  isModalOpen: boolean;
  modalType: ModalType;
  clickedDataId: string;
  modalDeatils: modalDetailsType;
};
export type MyContext = {
  state: MyState;
  handleState: (obj: Partial<MyState>) => void;
};
