import { bigListOfTask, oneItemFromBigListOfTask } from "@ext/typing";
import { setAllTasks } from "../redux/features/allTasksSlice";
import { AppDispatch } from "../redux/store";

export async function getAllTasks(data: {
  email: string;
  nameOfProject: string;
  dispatch: AppDispatch;
}) {
  const response = await fetch("../../../api/getAllTasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resJson = await response.json();
  const resJson1: oneItemFromBigListOfTask[] = Array.from(
    resJson.finalData
  ) as oneItemFromBigListOfTask[];
  const todoList: oneItemFromBigListOfTask[] = resJson1.filter(
    (item) => item.type === "todo"
  ) as oneItemFromBigListOfTask[];
  const inprogressList: oneItemFromBigListOfTask[] = resJson1.filter(
    (item) => item.type === "inprogress"
  ) as oneItemFromBigListOfTask[];
  const doneList: oneItemFromBigListOfTask[] = resJson1.filter(
    (item) => item.type === "done"
  ) as oneItemFromBigListOfTask[];
  const finalResult: bigListOfTask = {
    todo: todoList as oneItemFromBigListOfTask[],
    inprogress: inprogressList as oneItemFromBigListOfTask[],
    done: doneList as oneItemFromBigListOfTask[],
  } as bigListOfTask;
  data.dispatch(setAllTasks(finalResult));
}
