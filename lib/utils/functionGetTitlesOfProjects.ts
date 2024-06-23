import { InfoOfProjectState } from "@ext/typing";
import {
  setTableOfProjects,
  setTableOfProjectsError,
  setTableOfProjectsLoading,
} from "../redux/features/titleOfProjectsSlice";
import { AppDispatch } from "../redux/store";

export const functionGetTitlesOfProjects = async (
  sessionEmail: string,
  dispatch: AppDispatch
) => {
  const data = { email: sessionEmail };
  dispatch(setTableOfProjectsLoading(true));
  try {
    const response = await fetch("../api/getTitlesOfProjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resJson: InfoOfProjectState[] = await response.json();
    dispatch(setTableOfProjects(resJson));
  } catch (error) {
    dispatch(
      setTableOfProjectsError(
        "There is an error in fetching titles of projectsPlease refresh the page"
      )
    );
  }
};
