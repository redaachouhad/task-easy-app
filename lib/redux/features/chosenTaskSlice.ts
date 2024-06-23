import { oneItemFromBigListOfTask } from "@ext/typing";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface chosenTaskProps {
  value: oneItemFromBigListOfTask;
}

const initialState: chosenTaskProps = {
  value: {
    _id: "",
    email: "",
    nameOfProject: "",
    title: "",
    urlImage: "",
    dateTimeFrom: "",
    dateTimeTo: "",
    type: "",
    nameOfImage: "",
    createdAt: "",
    updatedAt: "",
  } as oneItemFromBigListOfTask,
};

export const chosenTaskSlice = createSlice({
  name: "chosenTask",
  initialState,
  reducers: {
    setChosenTask: (state, action: PayloadAction<oneItemFromBigListOfTask>) => {
      state.value = action.payload;
    },
    initializeChosenTask: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { setChosenTask, initializeChosenTask } = chosenTaskSlice.actions;

export default chosenTaskSlice.reducer;
