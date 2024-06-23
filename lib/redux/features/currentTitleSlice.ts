import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface currentProject {
  title: string;
}

const initialState: currentProject = {
  title: "",
};

export const currentTitleSlice = createSlice({
  name: "currentTitle",
  initialState,
  reducers: {
    setCurrentTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { setCurrentTitle } = currentTitleSlice.actions;

export default currentTitleSlice.reducer;
