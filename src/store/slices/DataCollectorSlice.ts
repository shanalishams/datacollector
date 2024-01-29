import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FormFieldData } from "../../models/FormFieldData.ts";
import { RootState } from "../store.ts";

export interface DataCollectionState {
  formFieldData: FormFieldData;
}

const initialState: DataCollectionState = {
  formFieldData: [],
};

const dataCollectorSlice = createSlice({
  name: "dataCollectorSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveFromFieldData: (state, action: PayloadAction<FormFieldData>) => {
      state.formFieldData = action.payload;
    },
  },
});

export const { saveFromFieldData } = dataCollectorSlice.actions;

export const selectFromFieldData = (state: RootState) => {
  return state.DataCollectorReducer.formFieldData;
};

export default dataCollectorSlice.reducer;
