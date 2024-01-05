export type Prop = { children: JSX.Element };
export type MyState = {
  seacrhText: string;
};
export type MyContext = {
  state: MyState;
  handleState: (obj: Partial<MyState>) => void;
};
