import { configureStore } from "@reduxjs/toolkit";
import allTasksReducer from "./features/allTasksSlice";
import chosenTaskReducer from "./features/chosenTaskSlice";
import currentTitleReducer from "./features/currentTitleSlice";
import handleHideDeleteProjectReducer from "./features/handleHideDeleteProject";
import pendingSeeMoreSlice from "./features/pendingSeeMoreSlice";
import titlesOfProjectsReducer from "./features/titleOfProjectsSlice";
import visibilityWindowDeleteProjectReducer from "./features/visibilityWindowDeleteProjectSlice";
import visibilityWindowDeleteTaskReducer from "./features/visibilityWindowDeleteTaskSlice";
import visibilityWindowNewTaskReducer from "./features/visibilityWindowNewTaskSlice";
import visibilityWindowUpdateTaskReducer from "./features/visibilityWindowUpdateTaskSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      titlesOfProjects: titlesOfProjectsReducer,
      currentTitle: currentTitleReducer,
      handleHideDeleteProject: handleHideDeleteProjectReducer,
      visibilityWindowNewTask: visibilityWindowNewTaskReducer,
      visibilityWindowDeleteProject: visibilityWindowDeleteProjectReducer,
      visibilityWindowDeleteTask: visibilityWindowDeleteTaskReducer,
      allTasks: allTasksReducer,
      chosenTask: chosenTaskReducer,
      visibilityWindowUpdateTask: visibilityWindowUpdateTaskReducer,
      pendingSeeMore: pendingSeeMoreSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
