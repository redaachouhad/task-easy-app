import Image from "next/image";
// import imageOpening from "../public/img-opening.jpg";
import bgImage from "../public/pexels-fauxels-3183197.jpg";

export default function Home() {
  return (
    <div className="h-screen relative">
      <div className="absolute w-full h-full left-0 top-0">
        <Image
          src={bgImage}
          alt="background image"
          fill={true}
          placeholder="blur"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="absolute w-full h-full bg-[rgba(0,0,0,0.65)] flex items-center justify-center overflow-hidden">
        <div className="w-[100vmin] h-[98%] text-white text-center flex flex-col items-center justify-center gap-5">
          <h1 className="text-[2rem] sm:text-[3.5rem] mb-2">
            Welcome to TaskEase
          </h1>
          <p className="text-[0.8rem] sm:text-xl w-4/5">
            TaskEase, powered by Next.js, is your go-to application for
            seamlessly organizing your tasks, boosting productivity, and meeting
            deadlines with ease.
          </p>
          <p className="text-[0.8rem] sm:text-xl w-4/5 my-2">
            Get started today and experience the simplicity and efficiency of
            TaskEase!
          </p>
          <p className="text-[0.8rem] sm:text-xl w-4/5 my-2">Happy tasking!</p>
          <div></div>
        </div>
      </div>
    </div>
  );
}
