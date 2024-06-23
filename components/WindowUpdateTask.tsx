import { initializeChosenTask } from "@ext/lib/redux/features/chosenTaskSlice";
import { setVisibilityWindowUpdateTask } from "@ext/lib/redux/features/visibilityWindowUpdateTaskSlice";
import { useAppDispatch, useAppSelector } from "@ext/lib/redux/hooks";
import { decodeUrl } from "@ext/lib/utils/decodeUrl";
import { getAllTasks } from "@ext/lib/utils/getAllTasks";
import { typeOfTasks } from "@ext/lib/utils/typeOfTasks";
import { oneItemFromBigListOfTask } from "@ext/typing";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ChangeEvent, MouseEvent, useState } from "react";
import { CgDanger } from "react-icons/cg";
import { ImSpinner9 } from "react-icons/im";

function WindowUpdateTask() {
  const currentPath = usePathname();
  const currentTitle = decodeUrl(currentPath);
  const [inputData, setInputData] = useState({
    nameOfProject: currentTitle,
    titleInput: "",
    urlImageInput: "",
    dateTimeFromInput: "",
    dateTimeToInput: "",
    typeInput: "",
  });
  const { data: session } = useSession();
  //   useEffect(() => {
  //     if (session?.user?.email) {
  //       setInputData({
  //         ...inputData,
  //         ["nameOfProject"]: currentTitle,
  //       });
  //     }
  //   }, [session?.user?.email]);

  const [error, setError] = useState("");

  const visibility = useAppSelector(
    (state) => state.visibilityWindowUpdateTask.value
  );
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);

  const handleVisibility = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(setVisibilityWindowUpdateTask(false));
  };
  const chosenTask: oneItemFromBigListOfTask = useAppSelector(
    (state) => state.chosenTask.value
  );

  const handleOnChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setError("");
    const { name, value } = e.target;
    setInputData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const { name, value } = e.target;
    setInputData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleOnChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setError("");
    const { name, value } = e.target;
    setInputData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    const inputDataCopy = inputData;
    setShowLoader(true);
    if (!session?.user?.email) {
      setError("Error, Please try again");
      setShowLoader(false);
      return null;
    }

    if (
      !inputDataCopy.titleInput &&
      !inputDataCopy.typeInput &&
      !inputDataCopy.dateTimeFromInput &&
      !inputDataCopy.dateTimeToInput
    ) {
      setError(" Please fill in one field at least.");
      setShowLoader(false);
      return null;
    }

    const response = await fetch("../../../api/updateTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cibleData: chosenTask, updateData: inputData }),
    });
    const resJson = await response.json();
    if (resJson.message === "failure") {
      setError("Error in update this task, please try again");
      setShowLoader(false);
      return null;
    }
    setError("");
    setShowLoader(false);
    await getAllTasks({
      email: session?.user?.email,
      nameOfProject: currentTitle,
      dispatch: dispatch,
    });
    dispatch(setVisibilityWindowUpdateTask(false));
    dispatch(initializeChosenTask());
    setInputData({
      nameOfProject: currentTitle,
      titleInput: "",
      urlImageInput: "",
      dateTimeFromInput: "",
      dateTimeToInput: "",
      typeInput: "",
    });
  };

  return (
    <>
      {visibility && (
        <div className="w-full h-full bg-[rgba(0,0,0,0.9)] absolute left-0 top-0 text-white flex items-center justify-center">
          <div className="bg-[#0e0e21] rounded-md w-[93vmin] sm:w-[70vmin] p-3 border-2 border-green-500">
            <h1 className="text-xl sm:text-3xl font-medium text-center text-green-500">
              Update task
            </h1>
            <p className="text-xs sm:text-sm mt-2">Concerned task:</p>
            <div className="text-sm flex justify-center mt-2">
              <div className="border-2 border-green-500 rounded-lg w-fit p-2 bg-green-900">
                <p>
                  Project:{" "}
                  <strong className="text-green-300">{currentTitle}</strong>
                </p>
                <p>
                  Task:{" "}
                  <strong className="text-green-300">{chosenTask.title}</strong>
                </p>
                <p>
                  State:{" "}
                  <strong className="text-green-300">
                    {typeOfTasks(chosenTask.type)}
                  </strong>
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <hr className="my-4 w-[80%] border rounded-full border-green-500 " />
            </div>
            <form action="" className="text-xs sm:text-sm flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span>Title of Task:</span>
                <textarea
                  name="titleInput"
                  id="titleInput"
                  cols={30}
                  rows={3}
                  onChange={handleOnChangeTextArea}
                  className="text-white resize-none rounded-md p-1 bg-transparent border border-green-500 outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <span>From:</span>
                <input
                  type="datetime-local"
                  name="dateTimeFromInput"
                  id="dateTimeFromInput"
                  onChange={handleOnChangeInput}
                  className=" text-white p-1 rounded-md bg-transparent border border-green-500 outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <span>To:</span>
                <input
                  type="datetime-local"
                  name="dateTimeToInput"
                  id="dateTimeToInput"
                  onChange={handleOnChangeInput}
                  className=" text-white p-1 rounded-md bg-transparent border border-green-500 outline-none"
                  required
                />
              </div>

              <div className="flex flex-col items-start gap-1">
                <span>Type of task:</span>
                <select
                  name="typeInput"
                  id="typeInput"
                  className="text-white p-1 rounded-md w-full bg-transparent border border-green-500 outline-none"
                  onChange={handleOnChangeSelect}
                  required
                >
                  <option value="">----</option>
                  <option value="todo" className="text-black">
                    Todo
                  </option>
                  <option value="inprogress" className="text-black">
                    In Progress
                  </option>
                  <option value="done" className="text-black">
                    Done
                  </option>
                </select>
              </div>
              {error && (
                <div className="text-xs border-red-500 border-2 p-1 flex gap-1 items-center bg-[#461a1a] rounded-lg font-bold text-yellow-400">
                  <CgDanger className="text-lg" /> Error : {error}
                </div>
              )}
              <div className="text-white flex justify-between text-xs sm:text-sm">
                <button
                  onClick={handleVisibility}
                  className="bg-red-500 hover:bg-red-600 p-1 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-green-500 hover:bg-green-600 p-1 rounded-md shadow-md shadow-black flex items-center gap-1"
                >
                  {showLoader && (
                    <ImSpinner9 className="text-md animate-spin" />
                  )}
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default WindowUpdateTask;
