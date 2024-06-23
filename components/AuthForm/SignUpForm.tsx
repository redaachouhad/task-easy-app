"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useState } from "react";
import { BiError } from "react-icons/bi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { IoPersonAddOutline, IoPersonCircle } from "react-icons/io5";
import { MdEmail, MdLockReset } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiVerizon } from "react-icons/si";
import { GoogleLoginButton } from "react-social-login-buttons";
import logoTakeEase from "../../public/logo-taskease.png";
function SignUpForm() {
  const [reveal1, setReveal1] = useState(false);
  const [reveal2, setReveal2] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleOnClickReveal1 = () => {
    setReveal1(!reveal1);
  };

  const handleOnClickReveal2 = () => {
    setReveal2(!reveal2);
  };

  const handleOnChangeFormData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError("");
    setFormData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleOnClickGoogle = async () => {
    await signIn("google", { callbackUrl: "/projects" });
  };

  const handleOnClickSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill out all required fields.");
      return null;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return null;
    }
    const response = await fetch("../api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const resData = (await response.json()) as { message: string };

    if (resData.message === "success") {
      setSuccess("Your account has been successfully registered");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1000);
    } else {
      setError(
        "An account with this email already exists. Please sign in instead."
      );
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
      <div className="w-[90vmin] sm:w-[50vmin] bg-[rgb(0,0,0,0.8)] backdrop-blur-lg p-3 flex items-center flex-col rounded-3xl overflow-hidden shadow-black">
        <div className=" w-full h-12 flex justify-center items-center mb-6">
          <h1 className="text-white text-2xl sm:text-3xl flex gap-3 font-extralight ">
            <IoPersonAddOutline />
            Sign Up
          </h1>
        </div>
        <form className="flex flex-col items-center gap-4">
          <div className="p-2 flex gap-1 sm:gap-2 border border-white rounded-xl items-center w-[80vmin] sm:w-[40vmin]">
            <IoPersonCircle className="text-white text-xl sm:text-2xl" />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Username *"
              className="p-1 bg-transparent outline-none text-white w-full text-sm"
              onChange={handleOnChangeFormData}
              required
            />
          </div>
          <div className="p-2 flex gap-1 sm:gap-2 border border-white rounded-xl items-center w-[80vmin] sm:w-[40vmin]">
            <MdEmail className="text-white text-xl sm:text-2xl" />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email *"
              className="p-1 bg-transparent outline-none text-white w-full text-sm"
              onChange={handleOnChangeFormData}
              required
            />
          </div>
          <div className="p-2 flex gap-1 sm:gap-2 border border-white rounded-xl items-center w-[80vmin] sm:w-[40vmin]">
            <RiLockPasswordLine className="text-white text-xl sm:text-2xl" />
            <input
              type={!reveal1 ? "password" : "text"}
              name="password"
              id="password"
              placeholder="Password *"
              className="p-1 bg-transparent focus:outline-none text-white w-full text-sm"
              onChange={handleOnChangeFormData}
              required
            />
            <IoMdEye
              className={
                "text-white text-xl sm:text-2xl " + (!reveal1 ? "" : "hidden")
              }
              onClick={handleOnClickReveal1}
            />
            <IoMdEyeOff
              className={
                "text-white text-xl sm:text-2xl " + (reveal1 ? "" : "hidden")
              }
              onClick={handleOnClickReveal1}
            />
          </div>
          <div className="p-2 flex gap-1 sm:gap-2 border border-white rounded-xl items-center w-[80vmin] sm:w-[40vmin]">
            <MdLockReset className="text-white text-xl sm:text-2xl" />
            <input
              type={!reveal2 ? "password" : "text"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm password *"
              className="p-1 bg-transparent focus:outline-none text-white w-full text-sm"
              onChange={handleOnChangeFormData}
              required
            />
            <IoMdEye
              className={
                "text-white text-xl sm:text-2xl " + (!reveal2 ? "" : "hidden")
              }
              onClick={handleOnClickReveal2}
            />
            <IoMdEyeOff
              className={
                "text-white text-xl sm:text-2xl " + (reveal2 ? "" : "hidden")
              }
              onClick={handleOnClickReveal2}
            />
          </div>
          {error && (
            <div className="text-[0.8rem]  text-red-500 text-start w-full flex items-center gap-2 font-semibold">
              <BiError className="text-lg" /> <p>{error}</p>
            </div>
          )}
          {success && (
            <div className="text-[0.8rem] sm:text-[0.9rem] text-green-500 text-start w-full flex items-center gap-2 font-semibold">
              <SiVerizon className="text-lg" /> <p>{success}</p>
            </div>
          )}
          <button
            type="submit"
            onClick={(e) => handleOnClickSubmit(e)}
            className="bg-white text-bla border-2 px-10 py-2 rounded-3xl text-sm font-extrabold my-1"
          >
            Sign up
          </button>
        </form>
        <div className="text-[0.8rem] text-white flex gap-1 justify-end w-full mt-2 px-6">
          <p>Have already an account ?</p>
          <Link href={"/auth/login"} className="text-blue-300">
            Login
          </Link>
        </div>
        <div className="text-white w-full flex items-center gap-2 px-6 py-3">
          <hr className="w-full" />
          <p className="text-white">Or</p>
          <hr className="w-full" />
        </div>

        <div className="p-2">
          <GoogleLoginButton
            text="Sign Up with Google"
            style={{
              fontSize: "0.9rem",
              height: "2.3rem",
              backgroundColor: "white",
            }}
            onClick={handleOnClickGoogle}
          />
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
