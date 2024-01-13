import { GridRowSelectionModel } from "@mui/x-data-grid";
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

type Props = {
  children: ReactNode;
};

type SelectDialySalesContextType = {
  rowSlectionModel: GridRowSelectionModel;
  setRowSelectionModel: Dispatch<SetStateAction<GridRowSelectionModel>>;
};

export const SelectDialySalesContext = createContext({} as SelectDialySalesContextType);

export const SelectDialySalesContextProvider = (props: Props) => {
  const [rowSlectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  return (
    <SelectDialySalesContext.Provider value={{ rowSlectionModel, setRowSelectionModel }}>
      {props.children}
    </SelectDialySalesContext.Provider>
  );
};
