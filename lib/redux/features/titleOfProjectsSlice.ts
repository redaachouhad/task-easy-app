import { InfoOfProjectState, TableOfProjectsState } from "@ext/typing";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: TableOfProjectsState = {
  value: [],
  loading: false,
  error: null,
};

export const titlesOfProjectsSlice = createSlice({
  name: "titlesOfProjects",
  initialState,
  reducers: {
    setTableOfProjects: (
      state,
      action: PayloadAction<InfoOfProjectState[]>
    ) => {
      state.value = action.payload;
      state.loading = false;
      state.error = null;
    },
    setTableOfProjectsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      state.error = null;
    },
    setTableOfProjectsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setTableOfProjects,
  setTableOfProjectsLoading,
  setTableOfProjectsError,
} = titlesOfProjectsSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

export default titlesOfProjectsSlice.reducer;
