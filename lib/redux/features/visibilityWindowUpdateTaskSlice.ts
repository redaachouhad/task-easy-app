import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface visibilityWindowUpdateTaskProps {
  value: boolean;
}

const initialState: visibilityWindowUpdateTaskProps = {
  value: false,
};

export const visibilityWindowUpdateTaskSlice = createSlice({
  name: "visibilityWindowUpdateTask",
  initialState,
  reducers: {
    setVisibilityWindowUpdateTask: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setVisibilityWindowUpdateTask } =
  visibilityWindowUpdateTaskSlice.actions;

export default visibilityWindowUpdateTaskSlice.reducer;
