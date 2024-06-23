"use client";

import Image from "next/image";
// import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";
// import Avatar from "react-avatar";
import { useSession } from "next-auth/react";
import { IoMenu } from "react-icons/io5";
import { MdPersonAdd } from "react-icons/md";
import { SlLogin } from "react-icons/sl";
import LogoTaskEase from "../public/logo-taskease.png";
import AvatarMenu from "./AvatarMenu";
import OneLink from "./OneLink";

function NavBar() {
  const [heightDiv, setHeightDiv] = useState("h-0");
  const { data: session, status } = useSession();

  const currentPath = usePathname();

  const handleOnClickHeightDiv = () => {
    setHeightDiv(heightDiv === "h-0" ? "h-40" : "h-0");
  };

  function navBarAuthentication() {
    if (session) {
      return <AvatarMenu />;
    }
    // else if (status === "loading") {
    //   return null;
    // }
    else {
      return (
        <>
          <IoMenu
            className="text-2xl sm:hidden"
            onClick={handleOnClickHeightDiv}
          />
          <div
            className={`flex items-center flex-col sm:flex-row absolute sm:static left-0 sm:left-auto top-0 sm:top-auto bg-[rgba(0,0,0,0.5)] backdrop-blur-xl sm:bg-transparent w-full sm:w-auto mt-[3.2rem] sm:mt-0 sm:h-auto justify-evenly sm:gap-10 overflow-hidden ${heightDiv} transition-height duration-100 ease-linear sm:transition-none`}
          >
            <OneLink
              path="/auth/signup"
              text="Sign Up"
              symbol={<MdPersonAdd className="text-xl" />}
              onClick={handleOnClickHeightDiv}
            />
            <OneLink
              path="/auth/login"
              text="Login"
              symbol={<SlLogin className="text-lg" />}
              onClick={handleOnClickHeightDiv}
            />
          </div>
        </>
      );
    }
  }

  return currentPath !== "/auth/login" && currentPath !== "/auth/signup" ? (
    <nav className="w-screen bg-[rgb(21,15,37)]  text-white flex justify-between items-center px-3 sm:px-8 py-2 z-10 relative">
      <div className="flex items-center">
        <div className="w-8 sm:w-10">
          <Image
            src={LogoTaskEase}
            alt="image of logo"
            height={30}
            width={30}
            style={{
              width: "auto",
              height: "auto",
            }}
          />
        </div>
        <h1 className="text-lg sm:text-2xl font-semibold">TaskEase</h1>
      </div>

      {navBarAuthentication()}
    </nav>
  ) : null;
}

export default NavBar;
