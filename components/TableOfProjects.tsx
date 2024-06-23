"use client";

import { useAppSelector } from "@ext/lib/redux/hooks";
import { getDateAndTime } from "@ext/lib/utils/getDateAndTime";
import { TableOfProjectsState } from "@ext/typing";
import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import ProjectCard from "./ProjectCard";

function TableOfProjects() {
  const { data: session } = useSession();
  const listTitleOfProject: TableOfProjectsState = useAppSelector(
    (state) => state.titlesOfProjects
  );

  if (listTitleOfProject.loading) {
    return (
      <div className="h-full w-[98%] flex justify-center items-center bg-[rgba(255,255,255,0.7)] mx-2 my-5 animate-pulse">
        <CircularProgress />
      </div>
    );
  } else if (listTitleOfProject.error) {
    return (
      <div className="h-full w-[98%] flex justify-center items-center bg-[rgba(255,255,255,0.7)] mx-2 my-5 animate-pulse">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {session?.user?.email ? (
        <div className="h-full w-[98%]  grid sm:grid-cols-2 grid-cols-1 gap-4 overflow-y-scroll px-2 py-5">
          {listTitleOfProject.value.map((item, index) => {
            return (
              <ProjectCard
                key={index}
                index={index}
                title={item?.title}
                dateCreatedAt={getDateAndTime(String(item?.createdAt))}
                dateUpdatedAt={getDateAndTime(String(item?.updatedAt))}
                url="/projects"
              />
            );
          })}

          <style jsx>{`
            ::-webkit-scrollbar {
              width: 4px;
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
      ) : (
        <div className="h-full w-[98%] flex justify-center items-center bg-[rgba(255,255,255,0.7)] mx-2 my-5 animate-pulse">
          <CircularProgress />
        </div>
      )}
    </>
  );
}

export default TableOfProjects;
