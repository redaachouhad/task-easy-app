import { allTasksProps, bigListOfTask } from "@ext/typing";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: allTasksProps = {
  value: {
    todo: [],
    inprogress: [],
    done: [],
  },
};

export const allTasksSlice = createSlice({
  name: "allTasks",
  initialState,
  reducers: {
    setAllTasks: (state, action: PayloadAction<bigListOfTask>) => {
      state.value = action.payload;
    },
    initializeAllTasks: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { setAllTasks, initializeAllTasks } = allTasksSlice.actions;

export default allTasksSlice.reducer;
