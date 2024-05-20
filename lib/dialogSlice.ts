import { createSlice } from "@reduxjs/toolkit";

type DialogBoxState = {
  showDialogBox: boolean;
  path: string;
};

const initialState: DialogBoxState = {
  showDialogBox: false,
  path: "/dashboard",
};

export const dialogSlice = createSlice({
  name: "dialogBox",
  initialState,
  reducers: {
    updateShowDialogBox: (state, action) => {
      state.showDialogBox = action.payload;
    },
    updatePath: (state, action) => {
      state.path = action.payload;
    },
  },
});

export const { updateShowDialogBox, updatePath } = dialogSlice.actions;

export default dialogSlice.reducer;
