import { storage } from "@ext/lib/firebase/firebase";
import { setAllTasks } from "@ext/lib/redux/features/allTasksSlice";
import { initializeChosenTask } from "@ext/lib/redux/features/chosenTaskSlice";
import { setVisibilityWindowDeleteTask } from "@ext/lib/redux/features/visibilityWindowDeleteTaskSlice";
import { useAppDispatch, useAppSelector } from "@ext/lib/redux/hooks";
import { decodeUrl } from "@ext/lib/utils/decodeUrl";
import { typeOfTasks } from "@ext/lib/utils/typeOfTasks";
import { bigListOfTask, oneItemFromBigListOfTask } from "@ext/typing";
import { deleteObject, ref } from "firebase/storage";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ChangeEvent, MouseEvent, useState } from "react";
import { CgDanger } from "react-icons/cg";
import { ImSpinner9 } from "react-icons/im";

function WindowDeleteTask() {
  const [error, setError] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [deleteTaskInput, setDeleteTaskInput] = useState("");
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const currentPath = usePathname();
  const currentTitle = decodeUrl(currentPath);
  const visibility = useAppSelector(
    (state) => state.visibilityWindowDeleteTask.value
  );
  const chosenTask: oneItemFromBigListOfTask = useAppSelector(
    (state) => state.chosenTask.value
  );

  const currentAllTasks = useAppSelector((state) => state.allTasks.value);
  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setDeleteTaskInput(e.target.value);
  };

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setShowLoader(true);
    if (!deleteTaskInput) {
      setShowLoader(false);
      setError("please fill in the required field");
      return null;
    }

    if (!deleteTaskInput || deleteTaskInput.trim() !== "Delete my task") {
      setShowLoader(false);
      setError("please type ' Delete my task ' correctly");
      return null;
    }

    if (chosenTask.nameOfImage) {
      const storageRef = ref(storage, chosenTask.nameOfImage as string);
      await deleteObject(storageRef)
        .then(() => {
          // File deleted successfully
        })
        .catch((error) => {
          setError("Failed to delete the image from firebase");
          return null;
        });
    }

    const response = await fetch("../../../api/deleteTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chosenTask),
    });

    const resJson = await response.json();
    if (resJson === "failure") {
      setShowLoader(false);
      setError("There is an error in deleting this task");
      return null;
    }

    const concernedBoard =
      currentAllTasks[chosenTask.type as keyof typeof currentAllTasks];
    const changedBoard = concernedBoard.filter(
      (item) => item._id !== chosenTask._id
    );
    const finalList: bigListOfTask = {
      ...currentAllTasks,
      [chosenTask.type as keyof typeof currentAllTasks]: changedBoard,
    };
    setShowLoader(false);
    dispatch(setVisibilityWindowDeleteTask(false));
    dispatch(initializeChosenTask());
    dispatch(setAllTasks(finalList));
    // getAllTasks({
    //   email: session?.user?.email as string,
    //   nameOfProject: currentTitle,
    //   dispatch: dispatch,
    // });
  };
  return (
    session?.user?.email &&
    visibility && (
      <div className="h-full w-full bg-[rgba(0,0,0,0.9)] absolute left-0 top-0 flex items-center justify-center">
        <div className="bg-[#0e0e21] rounded-md w-[93vmin] sm:w-[70vmin] p-5 sm:p-6 border-2 border-red-500 flex flex-col sm:gap-6 gap-3">
          <h1 className="text-lg sm:text-3xl font-medium text-center text-red-600">
            Delete Task
          </h1>
          <p className="text-white text-xs sm:text-sm text-center">
            This task will be deleted from our databases, along with all of its
            description.
          </p>
          <div className="text-xs sm:text-sm flex justify-center items-center">
            <h2 className="border border-yellow-600 rounded-lg p-3 text-yellow-500 bg-[#321414] flex items-center gap-1">
              <strong className="text-white">Warning:</strong> This action is
              not reversible. Please be certain
            </h2>
          </div>
          <div className=" flex justify-center">
            <hr className="border-red-500 border w-[80%]" />
          </div>
          <form
            action=""
            className="text-white text-xs sm:text-sm flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <h3>For now, you are trying to delete the task:</h3>

              <div className="flex justify-center">
                <div className="p-2 rounded-lg border border-blue-400 flex flex-col gap-1 bg-[#26294d] w-fit text-xs sm:text-sm">
                  <p className="">
                    <span className="">The title of task:</span>{" "}
                    <strong className="text-blue-200">
                      {chosenTask.title}
                    </strong>
                  </p>
                  <p>
                    Type of task:{" "}
                    <strong className="text-blue-200">
                      {typeOfTasks(chosenTask.type)}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3>
                To continue, please type{" "}
                <span className="font-bold underline">Delete my task</span>{" "}
                below: *
              </h3>
              <input
                type="text"
                className="p-2 rounded-md bg-transparent border border-red-500 outline-none"
                name="deleteTaskInput"
                placeholder="Type here ..."
                onChange={handleOnChangeInput}
              />
            </div>
            {error && (
              <div className="text-xs border-red-500 border-2 p-1 flex gap-1 items-center bg-[#461a1a] rounded-lg font-bold text-yellow-400">
                <CgDanger className="text-2xl" /> Error: {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setVisibilityWindowDeleteTask(false));
                  dispatch(initializeChosenTask());
                }}
                className="bg-blue-400 py-1 px-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className={
                  "py-1 px-2 rounded-md flex items-center gap-1 transition-all duration-300 bg-green-600"
                }
              >
                {showLoader && <ImSpinner9 className="text-lg animate-spin" />}
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default WindowDeleteTask;
