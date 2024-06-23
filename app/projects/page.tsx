"use client";
import TableOfProjects from "@ext/components/TableOfProjects";
import { initializeAllTasks } from "@ext/lib/redux/features/allTasksSlice";
import { useAppDispatch } from "@ext/lib/redux/hooks";
import { extractSpecialCharacters } from "@ext/lib/utils/extractSpecialCharacters";
import { functionGetTitlesOfProjects } from "@ext/lib/utils/functionGetTitlesOfProjects";
import { useSession } from "next-auth/react";
import { MouseEvent, useEffect, useState } from "react";
import { BiError } from "react-icons/bi";
import { ImSpinner9 } from "react-icons/im";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RiFileAddLine } from "react-icons/ri";

function ProjectsPage() {
  const { data: session } = useSession();
  const [hideCreate, setHideCreate] = useState(false);
  const [hideDelete, setHideDelete] = useState(true);
  const [titleProject, setTitleProject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session?.user?.email) {
      functionGetTitlesOfProjects(session?.user?.email as string, dispatch);
    }
  }, [session?.user?.email, dispatch]);

  useEffect(() => {
    console.log("reda");
    dispatch(initializeAllTasks());
  }, [dispatch]);

  const handleClick = () => {
    setHideCreate(false);
  };

  const handleAddProject = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    if (!titleProject) {
      setIsLoading(false);
      setError("Please give the title of the project");
      return null;
    }

    const listSepcialCharacters = extractSpecialCharacters(titleProject);
    if (listSepcialCharacters.length !== 0) {
      setIsLoading(false);
      setError(
        "Please don't use special characters like: " + listSepcialCharacters
      );
      return null;
    }

    const data = {
      email: session?.user?.email,
      title: titleProject.trim(),
    };

    const response1 = await fetch("../api/existTitleProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resJson1 = await response1.json();
    if (resJson1.message === "exist") {
      setError("This title already exist");
      setIsLoading(false);
      return null;
    }

    const response = await fetch("../api/addProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setHideCreate(false);
    setTitleProject("");
    setIsLoading(false);
    functionGetTitlesOfProjects(session?.user?.email as string, dispatch);
  };

  return (
    <>
      <div className="w-[93vmin] h-[90%] bg-[rgba(0,0,0,0.45)] backdrop-blur-xl flex flex-col text-white items-center rounded-lg pb-3">
        <div className="w-full">
          <h1 className="bg-transparent text-xl sm:text-2xl text-center p-3 font-light">
            Your Projects
          </h1>
        </div>
        <hr className="text-white w-[95%]" />
        <div
          className="w-full p-4 flex items-center gap-2 cursor-pointer"
          onClick={() => setHideCreate(true)}
        >
          <RiFileAddLine className="text-3xl" />
          <p className="text-sm sm:text-md">Create new project</p>
        </div>
        <TableOfProjects />
      </div>
      <div
        className={
          "absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.6)] backdrop-blur-2xl flex justify-center items-center z-30 " +
          (hideCreate ? " visible" : "hidden")
        }
      >
        <div className=" bg-[#0e3f54] w-[95vmin] h-[60%] sm:w-[70vmin] rounded-lg flex flex-col p-3 gap-5 items-center">
          <div className="w-full flex flex-row justify-end">
            <div onClick={handleClick} className="cursor-pointer">
              <IoMdCloseCircleOutline className="text-2xl text-white" />
            </div>
          </div>
          <h1 className="text-white text-lg sm:text-2xl font-semibold">
            Create a new project
          </h1>
          <form className="w-full flex flex-col gap-5 h-full justify-between">
            <div className="w-full h-full">
              <textarea
                name="titleOfProject"
                id="titleOfProject"
                className="bg-[#174b61e4] border-2 w-full h-full text-white placeholder:text-sm p-2 text-sm resize-none rounded-md"
                placeholder="The title of the project"
                onChange={(e) => {
                  setError("");
                  setTitleProject(e.target.value);
                }}
                value={titleProject}
              />
            </div>
            <div className="w-full">
              {error && (
                <div className="text-[0.8rem] text-red-600 text-start w-full flex items-center gap-2">
                  <BiError className="text-lg" /> <p>{error}</p>
                </div>
              )}
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                onClick={handleAddProject}
                className="bg-blue-500 hover:bg-blue-600  py-2 px-3 text-sm rounded-md text-white flex flex-row items-center gap-1"
              >
                {isLoading ? (
                  <>
                    <ImSpinner9 className="animate-spin text-md" /> <p>Wait</p>
                  </>
                ) : (
                  <p>Create</p>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProjectsPage;
