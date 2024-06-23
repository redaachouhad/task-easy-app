import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface visibilityWindowDeleteProjectProps {
  value: boolean;
}

const initialState: visibilityWindowDeleteProjectProps = {
  value: false,
};

export const visibilityWindowDeleteProjectSlice = createSlice({
  name: "visibilityWindowDeleteProject",
  initialState,
  reducers: {
    setVisibilityWindowDeleteProject: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setVisibilityWindowDeleteProject } =
  visibilityWindowDeleteProjectSlice.actions;

export default visibilityWindowDeleteProjectSlice.reducer;
