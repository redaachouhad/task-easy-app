"use client";

import { setChosenTask } from "@ext/lib/redux/features/chosenTaskSlice";
import { setVisibilityWindowDeleteTask } from "@ext/lib/redux/features/visibilityWindowDeleteTaskSlice";
import { setVisibilityWindowUpdateTask } from "@ext/lib/redux/features/visibilityWindowUpdateTaskSlice";
import { useAppDispatch } from "@ext/lib/redux/hooks";
import { typeOfTasks } from "@ext/lib/utils/typeOfTasks";
import { oneItemFromBigListOfTask } from "@ext/typing";
import Image from "next/image";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import { ImSpinner9 } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

interface OneCard2Props {
  item: oneItemFromBigListOfTask;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
  innerRef?: (element: HTMLElement | null) => void;
  isDragging?: boolean;
}

function OneCard({
  item,
  draggableProps,
  dragHandleProps,
  innerRef,
  isDragging,
}: OneCard2Props) {
  const dispatch = useAppDispatch();

  const handleVisibilityDeleteTask = () => {
    dispatch(setVisibilityWindowDeleteTask(true));
    dispatch(setChosenTask(item));
  };
  const handleVisibilityUpdateTask = () => {
    dispatch(setVisibilityWindowUpdateTask(true));
    dispatch(setChosenTask(item));
  };

  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className={
        (isDragging
          ? "bg-[rgba(245,249,115,0.7)]"
          : "bg-[rgba(255,255,255,0.8)]") +
        " text-black my-3 mx-1 p-2.5 rounded-lg"
      }
    >
      <div className="text-xs flex items-center justify-end gap-2 w-full mb-1">
        {/* <button className="p-1 bg-blue-500 hover:bg-blue-600 font-semibold text-white rounded-md flex gap-1 items-center shadow-sm shadow-black text-xs ">
          <FaEye /> See more
        </button> */}
        {isDragging ? (
          <div className="bg-black p-1 rounded-full">
            <ImSpinner9 className="animate-spin text-white" />
          </div>
        ) : (
          <p className="text-white bg-[#000000] px-1 rounded-lg text-[0.65rem] shadow-md shadow-gray-400 font-medium">
            {typeOfTasks(item.type)}
          </p>
        )}
      </div>
      <div className="text-sm mb-1 font-medium">{item.title}</div>
      {item.urlImage && (
        <div className="w-full rounded-md overflow-hidden flex justify-center items-center">
          <Image
            src={item.urlImage as string}
            alt="image of color"
            width={100}
            height={100}
            quality={100}
            priority
            style={{
              width: "100%",
              height: "auto",
            }}
            unoptimized={true}
          />
        </div>
      )}
      <div className="text-xs mt-1">
        <p>
          From:{" "}
          <span>
            {item.dateTimeFrom
              ? item.dateTimeFrom.split("T").join(" ")
              : "not precised"}
          </span>
        </p>
        <p>
          To:{" "}
          <span>
            {item.dateTimeTo
              ? item.dateTimeTo.split("T").join(" ")
              : "not precised"}
          </span>
        </p>
      </div>
      <div className="text-xs w-full flex justify-between pt-1 gap-1 font-semibold text-white">
        <button
          onClick={handleVisibilityUpdateTask}
          className="bg-blue-500 hover:bg-blue-600 p-1 rounded-md flex gap-1 items-center shadow-md shadow-[#0000008a]"
        >
          <RxUpdate className="text-sm" /> Update
        </button>
        <button
          onClick={handleVisibilityDeleteTask}
          className="bg-red-500 hover:bg-red-600 p-1 rounded-md flex gap-1 items-center shadow-md shadow-[#0000008a]"
        >
          <MdDelete className="text-sm" /> Delete
        </button>
      </div>
    </div>
  );
}

export default OneCard;
