import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface visibilityWindowDeleteTaskProps {
  value: boolean;
}

const initialState: visibilityWindowDeleteTaskProps = {
  value: false,
};

export const visibilityWindowDeleteTaskSlice = createSlice({
  name: "visibilityWindowDeleteTask",
  initialState,
  reducers: {
    setVisibilityWindowDeleteTask: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setVisibilityWindowDeleteTask } =
  visibilityWindowDeleteTaskSlice.actions;

export default visibilityWindowDeleteTaskSlice.reducer;
