"use client";

import { ChangeEvent, useState } from "react";
import { MdOutlineArrowBack } from "react-icons/md";

function MenuChoosingForm() {
  const [hideMenu, setHideMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };
  return (
    <>
      <div
        className={
          "text-white flex flex-col items-center h-[40%] justify-around overflow-hidden transition-all duration-500 z-60 " +
          (hideMenu ? "w-[40vmin] sm:w-[50vmin] opacity-100" : "w-0 opacity-0")
        }
      >
        <label>
          <input
            className="hidden"
            type="radio"
            value="Board"
            checked={selectedOption === "Board"}
            onChange={handleOptionChange}
          />
          <h1
            className={
              (selectedOption === "Board" ? "border-b-2" : "") +
              " text-sm text-center p-2 sm:text-md"
            }
          >
            Board
          </h1>
        </label>
        <label>
          <input
            className="hidden"
            type="radio"
            value="Dashboard"
            checked={selectedOption === "Dashboard"}
            onChange={handleOptionChange}
          />
          <h1
            className={
              (selectedOption === "Dashboard" ? "border-b-2" : "") +
              " text-sm text-center p-2 sm:text-md"
            }
          >
            Dashboard
          </h1>
        </label>
        <label>
          <input
            className="hidden"
            type="radio"
            value="Timeline"
            checked={selectedOption === "Timeline"}
            onChange={handleOptionChange}
          />
          <h1
            className={
              (selectedOption === "Timeline" ? "border-b-2" : "") +
              " text-sm text-center p-2 sm:text-md"
            }
          >
            Timeline
          </h1>
        </label>
        <label className="bg-[rgb(33,60,101)] rounded-lg border-2">
          <input
            className="hidden"
            type="radio"
            value="GoBackToProjects"
            checked={selectedOption === "GoBackToProjects"}
            onChange={handleOptionChange}
          />
          <h1
            className={
              " text-sm text-center p-2 sm:text-md flex items-center gap-1"
            }
          >
            <MdOutlineArrowBack className="text-md sm:text-lg" /> Go Back To
            Projects
          </h1>
        </label>
      </div>
    </>
  );
}

export default MenuChoosingForm;
