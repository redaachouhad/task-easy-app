import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface pendingSeeMoreProps {
  value: boolean;
}

const initialState: pendingSeeMoreProps = {
  value: false,
};

export const pendingSeeMoreSlice = createSlice({
  name: "pendingSeeMore",
  initialState,
  reducers: {
    setPendingSeeMore: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setPendingSeeMore } = pendingSeeMoreSlice.actions;

export default pendingSeeMoreSlice.reducer;
