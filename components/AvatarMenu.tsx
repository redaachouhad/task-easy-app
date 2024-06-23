"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Avatar from "react-avatar";
import { CgProfile } from "react-icons/cg";
import { GoProjectRoadmap } from "react-icons/go";
import { GrLogout } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";

function AvatarMenu() {
  const router = useRouter();
  const [hideMenu, setHideMenu] = useState(false);
  const currentPath = usePathname();
  const desiredFormat = /^\/projects\/[^/]+\/board$/;
  const { data: session } = useSession();

  const handleOnClickGoogleSignOut = async () => {
    await signOut();
  };

  return (
    session?.user && (
      <div className="flex items-center gap-3 sm:gap-10 relative">
        <Avatar
          googleId="jhgvhbjkjn"
          size="40"
          round={true}
          name={session?.user?.name as string}
          src={session?.user?.image as string}
          className="cursor-pointer "
          onClick={() => setHideMenu(!hideMenu)}
        />

        <div
          className={
            "bg-[#0a41d9] absolute right-0 top-full mt-4 sm:mt-5 z-20 text-sm rounded-lg text-white overflow-hidden flex items-center flex-col transition-all duration-300 " +
            (hideMenu
              ? " opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-5 hidden")
          }
        >
          <div className="flex flex-col items-center p-2 gap-2">
            <p className="flex items-center w-full cursor-pointer">
              Signed in as:
            </p>
            <p className="flex items-center w-full cursor-pointer font-bold">
              {session?.user?.email}
            </p>
          </div>
          <hr className="w-[90%]" />
          <p
            className="flex items-center hover:bg-[rgba(255,255,255,0.2)] w-full p-2 gap-2 cursor-pointer"
            onClick={() => {
              setHideMenu(!hideMenu);
              router.replace("/projects");
            }}
          >
            <GoProjectRoadmap className="text-lg" /> Projects
          </p>
          <p className="flex items-center hover:bg-[rgba(255,255,255,0.2)] w-full p-2 gap-2 cursor-pointer">
            <CgProfile className="text-lg" /> Profil
          </p>
          <p className="flex items-center hover:bg-[rgba(255,255,255,0.2)] w-full p-2 gap-2 cursor-pointer">
            <IoSettingsOutline className="text-lg" /> Settings
          </p>
          <hr className="w-[90%]" />
          <p
            onClick={handleOnClickGoogleSignOut}
            className="flex items-center hover:bg-[rgba(255,255,255,0.2)] w-full p-2 gap-2 cursor-pointer"
          >
            <GrLogout className="text-md" /> Logout
          </p>
        </div>
      </div>
    )
  );
}

export default AvatarMenu;
