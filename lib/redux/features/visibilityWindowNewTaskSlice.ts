import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface visibilityWindowNewTaskProps {
  value: boolean;
}

const initialState: visibilityWindowNewTaskProps = {
  value: false,
};

export const visibilityWindowNewTaskSlice = createSlice({
  name: "visibilityWindowNewTask",
  initialState,
  reducers: {
    setVisibilityWindowNewTask: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setVisibilityWindowNewTask } =
  visibilityWindowNewTaskSlice.actions;

export default visibilityWindowNewTaskSlice.reducer;
