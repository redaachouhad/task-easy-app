"use client";

import { useEffect, useState } from "react";
// import {
//     DragDropContext,
//     Draggable,
//     DropResult,
//     Droppable,
//   } from "react-beautiful-dnd";

import { DropResult } from "react-beautiful-dnd";

import { setAllTasks } from "@ext/lib/redux/features/allTasksSlice";
import { setVisibilityWindowDeleteProject } from "@ext/lib/redux/features/visibilityWindowDeleteProjectSlice";
import { setVisibilityWindowNewTask } from "@ext/lib/redux/features/visibilityWindowNewTaskSlice";
import { useAppDispatch, useAppSelector } from "@ext/lib/redux/hooks";
import { decodeUrl } from "@ext/lib/utils/decodeUrl";
import { getAllTasks } from "@ext/lib/utils/getAllTasks";
import { bigListOfTask, oneItemFromBigListOfTask } from "@ext/typing";
import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { GrRefresh } from "react-icons/gr";
import { ImSpinner9 } from "react-icons/im";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import OneBoard from "./OneBoard";

const DragDropContext = dynamic(
  async () => {
    const mod = await import("react-beautiful-dnd");
    return mod.DragDropContext;
  },
  { ssr: false }
);

function Board() {
  const [hideSettings, setHideSettings] = useState(false);
  const { data: session } = useSession();
  const currentPath = usePathname();
  const currentTitle = decodeUrl(currentPath);
  const dispatch = useAppDispatch();
  const currentListTasks = useAppSelector((state) => state.allTasks.value);
  const [pendingSpinner, setPendingSpinner] = useState(false);
  const handleOnClickHideSettings = () => {
    setHideSettings(!hideSettings);
  };

  const handleVisibilityCreateTask = () => {
    setHideSettings(!hideSettings);
    dispatch(setVisibilityWindowNewTask(true));
  };

  const handleVisibilityDeleteProject = () => {
    setHideSettings(!hideSettings);
    dispatch(setVisibilityWindowDeleteProject(true));
  };

  const handleVisibilityRefreshBoard = () => {
    setHideSettings(!hideSettings);
    getAllTasks({
      email: session?.user?.email as string,
      nameOfProject: currentTitle,
      dispatch: dispatch,
    });
  };

  useEffect(() => {
    if (session?.user?.email) {
      getAllTasks({
        email: session?.user?.email,
        nameOfProject: currentTitle,
        dispatch: dispatch,
      });
    }
  }, [session?.user?.email, dispatch, currentTitle]);

  // Override console.error
  // This is a hack to suppress the warning about missing defaultProps in the recharts library
  // @link https://github.com/recharts/recharts/issues/3615
  const error = console.error;

  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  const router = useRouter();

  const handleGoBack = () => {
    setPendingSpinner(true);
    router.push("/projects");
  };

  const handleEndDrag = async (result: DropResult) => {
    console.log(result);
    const { destination, source, draggableId } = result;

    let droppableListSource: oneItemFromBigListOfTask[] = currentListTasks[
      source.droppableId as keyof typeof currentListTasks
    ] as oneItemFromBigListOfTask[];
    let droppableListDestination: oneItemFromBigListOfTask[] = currentListTasks[
      destination?.droppableId as keyof typeof currentListTasks
    ] as oneItemFromBigListOfTask[];
    let concernedTask = droppableListSource[source.index];
    let concernedTaskAfterChangingTask = {
      ...droppableListSource[source.index],
      type: destination?.droppableId,
      index: destination?.index,
    };

    let sourceList = [
      ...droppableListSource.slice(0, source.index),
      ...droppableListSource.slice(source.index + 1),
    ];
    let destinationList: oneItemFromBigListOfTask[];
    let finalList: bigListOfTask;
    if (source.droppableId === destination?.droppableId) {
      destinationList = [
        ...sourceList.slice(0, destination?.index),
        concernedTaskAfterChangingTask,
        ...sourceList.slice(destination?.index),
      ] as oneItemFromBigListOfTask[];
      finalList = {
        ...currentListTasks,
        [destination?.droppableId]: destinationList,
      };

      dispatch(setAllTasks(finalList));
    } else {
      destinationList = [
        ...droppableListDestination.slice(0, destination?.index),
        concernedTaskAfterChangingTask,
        ...droppableListDestination.slice(destination?.index),
      ] as oneItemFromBigListOfTask[];
      finalList = {
        ...currentListTasks,
        [source.droppableId]: sourceList,
        [destination?.droppableId as string]: destinationList,
      };

      dispatch(setAllTasks(finalList));
      const response = await fetch("../../../api/saveTasksWithOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cible: concernedTask,
          type: destination?.droppableId,
        }),
      });
    }
    // dispatch(setAllTasks(finalList));
    // getAllTasks({
    //   email: session?.user?.email as string,
    //   nameOfProject: currentTitle,
    //   dispatch: dispatch,
    // });
  };
  return session?.user?.email ? (
    <>
      <div className="w-[90vmin] sm:w-[97vmin] lg:w-[140vmin] bg-[rgb(10,9,38)] text-white text-sm rounded-t-lg text-center text-md pt-2 pr-2 pl-2">
        <div className="w-full flex justify-between items-center">
          <button
            onClick={handleGoBack}
            className="border-2 p-1 flex items-center gap-1 rounded-md text-white text-xs"
          >
            <FaArrowLeft /> <span>Go Back</span>{" "}
            {pendingSpinner && <ImSpinner9 className="animate-spin" />}
          </button>
          <div className="flex relative">
            <IoMdSettings
              onClick={handleOnClickHideSettings}
              className="text-xl text-white  cursor-pointer"
            />
            <div
              className={
                "absolute right-0 z-20 top-full mt-2 mr-1 flex flex-col w-44 sm:w-48 text-black bg-[#97beeb] rounded-md text-xs sm:text-sm overflow-hidden font-medium " +
                (hideSettings ? "visible" : "hidden")
              }
            >
              <div
                className="flex gap-1 items-center justify-start cursor-pointer hover:bg-[#cfe1f695] p-1.5"
                onClick={handleVisibilityRefreshBoard}
              >
                <GrRefresh /> Refresh Board
              </div>
              <hr className="border-black" />
              <div
                className="flex gap-1 items-center justify-start cursor-pointer hover:bg-[#cfe1f695] p-1.5"
                onClick={handleVisibilityCreateTask}
              >
                <FaRegSquarePlus /> Add new task
              </div>
              <hr className="border-black" />
              <div
                onClick={handleVisibilityDeleteProject}
                className="flex gap-1 items-center justify-start cursor-pointer hover:bg-[#cfe1f695] p-1.5"
              >
                <MdOutlineDelete
                  onClick={(e) => {
                    e.preventDefault();
                    setHideSettings(!hideSettings);
                    dispatch(setVisibilityWindowDeleteProject(true));
                  }}
                  className="text-lg"
                />{" "}
                Delete this Project
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="w-[90vmin] sm:w-[97vmin] lg:w-[140vmin] bg-[rgb(10,9,38)] text-white text-center text-sm sm:text-lg pb-1">
        Project: {currentTitle}
      </h1>
      <DragDropContext onDragEnd={handleEndDrag}>
        <div className="w-[90vmin] sm:w-[97vmin] lg:w-[140vmin] h-[100%] bg-[rgb(10,9,38)] text-white flex justify-between rounded-b-lg flex-col sm:flex-row overflow-y-scroll sm:overflow-hidden px-3 gap-3 lg:px-5 lg:gap-6">
          <OneBoard
            titleBoard={"Todo"}
            typeBoard={"todo"}
            data={currentListTasks["todo"]}
          />
          <OneBoard
            titleBoard={"In Progress"}
            typeBoard={"inprogress"}
            data={currentListTasks["inprogress"]}
          />
          <OneBoard
            titleBoard={"Done"}
            typeBoard={"done"}
            data={currentListTasks["done"]}
          />
          <style jsx>{`
            ::-webkit-scrollbar {
              width: 8px;
            }
            ::-webkit-scrollbar-thumb {
              background-color: #d1d5db;
              border-radius: 4px;
            }
            ::-webkit-scrollbar-track {
              background-color: transparent;
              border-radius: 4px;
            }
          `}</style>
        </div>
      </DragDropContext>
    </>
  ) : (
    <div className="w-[90vmin] sm:w-[95vmin] lg:w-[140vmin] h-[100%] bg-[rgba(255,255,255,0.6)] rounded-lg animate-pulse flex justify-center items-center">
      <CircularProgress />
    </div>
  );
}

export default Board;
