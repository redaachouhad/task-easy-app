import { setVisibilityWindowDeleteProject } from "@ext/lib/redux/features/visibilityWindowDeleteProjectSlice";
import { useAppDispatch, useAppSelector } from "@ext/lib/redux/hooks";
import { decodeUrl } from "@ext/lib/utils/decodeUrl";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { CgDanger } from "react-icons/cg";
import { ImSpinner9 } from "react-icons/im";

function WindowDeleteProject() {
  const currentPath = usePathname();
  const currentTitle = decodeUrl(currentPath);
  const router = useRouter();
  const [disableButton, setDisableButton] = useState(true);
  const visibility = useAppSelector(
    (state) => state.visibilityWindowDeleteProject.value
  );
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [dataInput, setDataInput] = useState({
    email: "",
    nameOfProjectInput: currentTitle,
    deleteProjectInput: "",
  });
  const { data: session } = useSession();
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user?.email) {
      setDataInput((prevValue) => {
        return { ...prevValue, ["email"]: session?.user?.email as string };
      });
    }
  }, [session?.user?.email]);

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError("");
    setDataInput({ ...dataInput, [name]: value.trim() });
  };
  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setShowLoader(true);
    if (!session?.user?.email) {
      setShowLoader(false);
      setError("Please verify your connection and try again");
      return null;
    }

    if (dataInput.deleteProjectInput !== "Delete my project") {
      setShowLoader(false);
      setError('Please type " Delete my project "');
      return null;
    }
    const response = await fetch("../../../api/deleteProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataInput),
    });

    const resJson = await response.json();
    if (resJson.message === "success") {
      setShowLoader(false);
      dispatch(setVisibilityWindowDeleteProject(false));
      router.push("/projects");
    } else {
      setShowLoader(false);
      setError(`Oppps ... Error Occurred`);
      return null;
    }
  };

  return (
    session?.user?.email &&
    visibility && (
      <div className="h-full w-full bg-[rgba(0,0,0,0.9)] absolute left-0 top-0 flex items-center justify-center">
        <div className="bg-[#0e0e21] rounded-md w-[93vmin] sm:w-[70vmin] p-5 sm:p-6 border-2 border-red-500 flex flex-col gap-6">
          <h1 className="text-lg sm:text-3xl font-medium text-center text-red-600">
            Delete This Project
          </h1>
          <p className="text-white text-xs sm:text-sm text-center">
            This project will be delete from our Databases, along with all of
            its created tasks.
          </p>
          <div className="text-xs sm:text-sm flex justify-center items-center">
            <h2 className="border border-yellow-600 rounded-lg p-3 text-yellow-500 bg-[#321414]">
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
              <h3>For now, you are trying to delete the project .</h3>
              <h3 className="font-bold underline text-md sm:text-lg">
                {currentTitle}
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <h3>
                To continue with this operation, please type{" "}
                <span className="font-bold underline">Delete my project</span>{" "}
                below: *
              </h3>
              <input
                type="text"
                className="p-2 rounded-md bg-transparent border border-red-500 outline-none"
                name="deleteProjectInput"
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
                  dispatch(setVisibilityWindowDeleteProject(false));
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
                {showLoader && <ImSpinner9 className="text-lg animate-spin" />}{" "}
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default WindowDeleteProject;
