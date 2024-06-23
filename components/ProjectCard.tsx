"use client";

import { setCurrentTitle } from "@ext/lib/redux/features/currentTitleSlice";
import { useAppDispatch } from "@ext/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";

interface propsProjectCard {
  index: number;
  title: string;
  dateCreatedAt: string;
  dateUpdatedAt: string;
  url: string;
}

function ProjectCard({
  index,
  title,
  dateCreatedAt,
  dateUpdatedAt,
  url,
}: propsProjectCard) {
  const dispatch = useAppDispatch();
  // const pendingIcon: boolean = useAppSelector(
  //   (state) => state.pendingSeeMore.value
  // );
  const [pendingIcon, setPendingIcon] = useState(false);
  const router = useRouter();
  const handleOnClickSeeMore = () => {
    setPendingIcon(true);
    dispatch(setCurrentTitle(title));
    router.push("/projects/" + title + "/board");
  };

  return (
    <div className="w-full h-fit pb-6 px-0 flex flex-col items-center justify-between gap-5 bg-[rgba(95,133,209,0.6)] rounded-xl">
      <div className="w-full h-full flex flex-col">
        <h1 className="sm:text-2xl text-center text-xl font-light py-2 rounded-t-xl bg-[rgba(19,21,67,1)]">
          Project {index + 1}
        </h1>
        <br />
        <div className="text-center text-lg sm:text-xl w-full h-full px-3 flex justify-center items-center">
          <h1>{title}</h1>
        </div>

        <br />
        {/* <h1 className="text-[0.8rem] font-light flex flex-col items-center w-full text-xs sm:text-sm">
          <span>
            Created at:{" "}
            <span className="font-semibold text-xs">{dateCreatedAt}</span>
          </span>
          <span>
            Updated at:{" "}
            <span className="font-semibold text-xs">{dateUpdatedAt}</span>
          </span>
        </h1> */}
      </div>
      <div className="w-full flex justify-center">
        <button
          type="submit"
          onClick={handleOnClickSeeMore}
          className="text-xs sm:text-sm p-1 rounded-md bg-blue-600 hover:bg-blue-700  shadow-black shadow-sm flex items-center gap-1"
        >
          {pendingIcon && <ImSpinner9 className="animate-spin" />} See more
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
