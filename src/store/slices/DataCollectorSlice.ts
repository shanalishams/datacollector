import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FormFieldData } from "../../models/FormFieldData.ts";
import { RootState } from "../store.ts";

const initialState: FormFieldData = [];

const dataCollectorSlice = createSlice({
  name: "dataCollectorSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveFromFieldData: (state, action: PayloadAction<FormFieldData>) => {
      state = action.payload;
    },
  },
});

export const { saveFromFieldData } = dataCollectorSlice.actions;

export const selectFromFieldData = (state: RootState) => state;

export default dataCollectorSlice.reducer;
