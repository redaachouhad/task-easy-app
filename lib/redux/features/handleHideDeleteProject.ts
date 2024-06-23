import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type handleHideDeleteProjectType = {
  value: boolean;
};

const initialState: handleHideDeleteProjectType = {
  value: true,
};

export const handleHideDeleteProjectSlice = createSlice({
  name: "handleHideDeleteProject",
  initialState,
  reducers: {
    setHandleHideDeleteProject: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setHandleHideDeleteProject } =
  handleHideDeleteProjectSlice.actions;

export default handleHideDeleteProjectSlice.reducer;
