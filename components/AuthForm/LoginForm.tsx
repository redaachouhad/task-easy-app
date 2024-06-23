"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useState } from "react";
import { BiError } from "react-icons/bi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { GoogleLoginButton } from "react-social-login-buttons";
import logoTakeEase from "../../public/logo-taskease.png";
function LoginForm() {
  const router = useRouter();
  const [reveal, setReveal] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isPending, setIsPending] = useState(false);

  const handleOnClickReveal = () => {
    setReveal(!reveal);
  };

  const handleOnClickGoogle = async () => {
    await signIn("google", { callbackUrl: "/projects" });
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError("");
    setFormData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleOnClickCredentials = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill out all required fields.");
      return null;
    }

    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (res?.ok) {
      router.replace("/projects");
    } else {
      setError("Incorrect credentials");
      return null;
    }
  };

  return (
    <>
      <div className="h-14 w-full flex justify-center items-center gap-2 font-semibold">
        <div className="w-14">
          <Image
            src={logoTakeEase}
            alt="logo"
            style={{ objectFit: "cover" }}
            placeholder="blur"
            priority={true}
          />
        </div>
        <h1 className="text-white text-3xl sm:text-[2.3rem]">TaskEase</h1>
      </div>
      <div className="w-[90vmin] sm:w-[50vmin] bg-[rgb(0,0,0,0.8)] backdrop-blur-lg p-3 flex items-center flex-col rounded-3xl overflow-hidden">
        <div className=" w-full h-12 flex justify-center items-center mb-3">
          <h1 className="text-white text-2xl sm:text-3xl flex gap-3 font-extralight">
            <IoPersonOutline />
            Login
          </h1>
        </div>
        <form className=" flex flex-col items-center gap-4">
          <div className="p-2 flex gap-1 sm:gap-2 border border-white rounded-xl items-center w-[80vmin] sm:w-[40vmin]">
            <MdEmail className="text-white text-xl sm:text-2xl" />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email *"
              onChange={handleOnChange}
              className="p-1 bg-transparent outline-none text-white w-full text-sm"
              required
            />
          </div>
          <div className="p-2 flex gap-1 sm:gap-2 border border-white rounded-xl items-center w-[80vmin] sm:w-[40vmin]">
            <RiLockPasswordLine className="text-white text-xl sm:text-2xl" />
            <input
              type={!reveal ? "password" : "text"}
              name="password"
              id="password"
              placeholder="Password *"
              onChange={handleOnChange}
              className="p-1 bg-transparent focus:outline-none text-white w-full text-sm"
              required
            />
            <IoMdEye
              className={
                "text-white text-xl sm:text-2xl " + (!reveal ? "" : "hidden")
              }
              onClick={handleOnClickReveal}
            />
            <IoMdEyeOff
              className={
                "text-white text-xl sm:text-2xl " + (reveal ? "" : "hidden")
              }
              onClick={handleOnClickReveal}
            />
          </div>
          <div className="flex flex-start w-full">
            <Link
              href={"/"}
              className="underline-blue-400 text-blue-400 text-[0.8rem] sm:text-[0.9rem]"
            >
              Forgot password?
            </Link>
          </div>
          {error && (
            <div className="text-[0.8rem] text-red-600 text-start w-full flex items-center gap-2">
              <BiError className="text-lg" /> <p>{error}</p>
            </div>
          )}
          <button
            onClick={handleOnClickCredentials}
            type="submit"
            className="bg-white text-bla border-2 px-10 py-2 rounded-3xl text-sm font-extrabold my-1"
          >
            Login
          </button>
          <div className="text-[0.8rem] sm:text-[0.9rem] text-white flex gap-1 justify-end w-full">
            <p>New member ?</p>
            <Link href={"/auth/signup"} className="text-blue-300">
              Register
            </Link>
          </div>
          <div className="text-white w-full flex items-center gap-2">
            <hr className="w-full" />
            <p className="text-white">Or</p>
            <hr className="w-full" />
          </div>
          <div>
            <GoogleLoginButton
              text="Log in with Google"
              style={{
                fontSize: "0.9rem",
                height: "2.3rem",
                backgroundColor: "white",
              }}
              onClick={handleOnClickGoogle}
            />
          </div>
        </form>
      </div>{" "}
    </>
  );
}

export default LoginForm;
