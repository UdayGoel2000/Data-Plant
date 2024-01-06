export type Prop = { children: JSX.Element };
export type TableDataType = {
  Id: string;
  Title: string;
  Description: string;
  Subject: string;
  Schedule: string;
};
export type MyState = {
  seacrhText: string;
  mainData: TableDataType[];
};
export type MyContext = {
  state: MyState;
  handleState: (obj: Partial<MyState>) => void;
};
