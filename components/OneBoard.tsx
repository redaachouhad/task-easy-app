"use client";

import { oneItemFromBigListOfTask } from "@ext/typing";
import dynamic from "next/dynamic";
import { Key, useEffect, useState } from "react";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import OneCard from "./OneCard";

const Droppable = dynamic(
  async () => {
    const mod = await import("react-beautiful-dnd");
    return mod.Droppable;
  },
  { ssr: false }
);
const Draggable = dynamic(
  async () => {
    const mod = await import("react-beautiful-dnd");
    return mod.Draggable;
  },
  { ssr: false }
);
interface OneBoard2Props {
  titleBoard: string;
  typeBoard: typeOfTask;
  data: oneItemFromBigListOfTask[];
}

type typeOfTask = "todo" | "inprogress" | "done";

function OneBoard({ titleBoard, typeBoard, data }: OneBoard2Props) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
      const widthWindow = window.innerWidth;
      console.log(widthWindow);
    }
  }, []);
  return (
    <div className="w-full py-2">
      <div className="w-full h-full flex flex-col gap-2 bg-[rgb(41,40,60)] rounded-md items-center">
        <h1 className="text-center sm:text-lg text-md font-light">
          {titleBoard}
        </h1>
        <hr className="w-[90%]" />
        {isBrowser && (
          <Droppable droppableId={typeBoard}>
            {(provided) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="h-full overflow-y-scroll px-6 sm:px-2 w-full"
                >
                  {data.map((item, index) => {
                    return (
                      <Draggable
                        key={parseInt(item._id as string) as Key}
                        draggableId={item._id as string}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <OneCard
                              draggableProps={provided.draggableProps}
                              dragHandleProps={
                                provided.dragHandleProps as DraggableProvidedDragHandleProps
                              }
                              innerRef={provided.innerRef}
                              key={parseInt(item._id as string) as Key}
                              item={item}
                              isDragging={snapshot.isDragging}
                            />
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  <style jsx>{`
                    ::-webkit-scrollbar {
                      width: 6px;
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
              );
            }}
          </Droppable>
        )}
      </div>
    </div>
  );
}

export default OneBoard;
