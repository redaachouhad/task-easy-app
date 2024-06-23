import { storage } from "@ext/lib/firebase/firebase";
import { setVisibilityWindowNewTask } from "@ext/lib/redux/features/visibilityWindowNewTaskSlice";
import { useAppDispatch, useAppSelector } from "@ext/lib/redux/hooks";
import { decodeUrl } from "@ext/lib/utils/decodeUrl";
import { getAllTasks } from "@ext/lib/utils/getAllTasks";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { CgDanger } from "react-icons/cg";
import { ImSpinner9 } from "react-icons/im";

function WindowAddTask() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [disableButton, setDisableButton] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    nameOfProject: "",
    titleInput: "",
    urlImageInput: "",
    dateTimeFromInput: "",
    dateTimeToInput: "",
    typeInput: "",
    nameOfImageInput: "",
  });
  const { data: session } = useSession();
  const currentPath = usePathname();
  const currentTitle = decodeUrl(currentPath);
  useEffect(() => {
    if (session?.user?.email) {
      setInputData((prevValue) => {
        return {
          ...prevValue,
          ["email"]: session?.user?.email as string,
          ["nameOfProject"]: currentTitle,
        };
      });
    }
  }, [session?.user?.email, currentTitle]);

  const [error, setError] = useState("");

  const visibility = useAppSelector(
    (state) => state.visibilityWindowNewTask.value
  );
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);

  const handleVisibility = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(setVisibilityWindowNewTask(false));
  };

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
    setDisableButton(true);
    setShowLoader(true);
    if (!session?.user?.email) {
      setError("Error, Please try again");
      setShowLoader(false);
      setDisableButton(false);
      return null;
    }

    if (!inputData.titleInput || !inputData.typeInput) {
      setError("Please fill in the required fields");
      setShowLoader(false);
      setDisableButton(false);
      return null;
    }

    const response1 = await fetch("../../../api/existTitleTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

    const resJson1 = await response1.json();
    if (resJson1.message === "failure1") {
      setError("The title of this task already exists");
      setShowLoader(false);
      setDisableButton(false);
      return null;
    }

    //storage of image
    let downloadURL = "";
    let nameFile = "";
    if (imageFile) {
      nameFile =
        inputData.email +
        "-" +
        currentTitle +
        "-" +
        inputData.typeInput +
        "-" +
        inputData.titleInput +
        "-" +
        imageFile?.name;

      const storageRef = ref(storage, nameFile);

      await uploadBytes(storageRef, imageFile)
        .then((snapshot) => {
          console.log("File uploaded successfully:", snapshot);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
      downloadURL = await getDownloadURL(storageRef);
      console.log("Download URL:", downloadURL);
    } else {
      console.error("No image file selected.");
    }
    const finalTask = {
      ...inputData,
      ["urlImageInput"]: downloadURL,
      ["nameOfImageInput"]: nameFile,
    };
    setImageFile(null);

    const response = await fetch("../../../api/addNewTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalTask),
    });

    const resJson = await response.json();
    if (resJson.message === "failure") {
      setError("Error in creating a new task");
      setShowLoader(false);
      setDisableButton(false);
      return null;
    }
    setError("");
    setShowLoader(false);
    setDisableButton(false);
    getAllTasks({
      email: session?.user?.email,
      nameOfProject: currentTitle,
      dispatch: dispatch,
    });
    dispatch(setVisibilityWindowNewTask(false));
    setInputData({
      email: session?.user?.email as string,
      nameOfProject: currentTitle,
      titleInput: "",
      urlImageInput: "",
      dateTimeFromInput: "",
      dateTimeToInput: "",
      typeInput: "",
      nameOfImageInput: "",
    });
  };

  const handleOnChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <>
      {visibility && (
        <div className="w-full h-full bg-[rgba(0,0,0,0.9)] absolute left-0 top-0 text-white flex items-center justify-center">
          <div className="bg-[#0e0e21] rounded-md w-[93vmin] sm:w-[70vmin] p-3 border-2 border-blue-500">
            <h1 className="text-lg sm:text-3xl font-medium text-center text-blue-500">
              Create New Task
            </h1>
            <form action="" className="text-sm flex flex-col gap-2 pt-6">
              <div className="flex flex-col gap-1">
                <span>Title of Task: *</span>
                <textarea
                  name="titleInput"
                  id="titleInput"
                  cols={30}
                  rows={2}
                  onChange={handleOnChangeTextArea}
                  className="text-white resize-none rounded-md p-1 bg-transparent border border-blue-500 outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <span>Upload Image:</span>
                <label htmlFor="urlImageInput">
                  <div className="text-xs flex gap-1 border-blue-500 cursor-pointer border rounded-md overflow-hidden">
                    <span className="bg-blue-500 p-1.5">Choose File</span>
                    <span className="p-1.5">
                      {imageFile ? imageFile.name : "no chosen file"}
                    </span>
                  </div>
                </label>
                <input
                  type="file"
                  name="urlImageInput"
                  id="urlImageInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleOnChangeImage}
                />
              </div>

              <div className="flex flex-col gap-1">
                <span>From:</span>
                <input
                  type="datetime-local"
                  name="dateTimeFromInput"
                  id="dateTimeFromInput"
                  onChange={(e) => handleOnChangeInput(e)}
                  className=" text-white p-1 rounded-md bg-transparent border border-blue-500 outline-none"
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
                  className=" text-white p-1 rounded-md bg-transparent border border-blue-500 outline-none"
                  required
                />
              </div>

              <div className="flex flex-col items-start gap-1">
                <span>Type of task: *</span>
                <select
                  name="typeInput"
                  id="typeInput"
                  className="text-white p-1 rounded-md w-full bg-transparent border border-blue-500 outline-none"
                  onChange={handleOnChangeSelect}
                  required
                >
                  <option value="" className="text-black">
                    ----
                  </option>
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
                  <CgDanger className="text-lg" /> Error: {error}
                </div>
              )}
              <div className="text-white flex justify-between text-xs sm:text-sm">
                <button
                  onClick={handleVisibility}
                  disabled={disableButton}
                  className="bg-red-500 hover:bg-red-600 p-1 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={disableButton}
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 p-1 rounded-md shadow-md shadow-black flex items-center gap-1"
                >
                  {showLoader && (
                    <ImSpinner9 className="text-md animate-spin" />
                  )}
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default WindowAddTask;
