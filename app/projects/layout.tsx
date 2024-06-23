import Image from "next/image";
import colorBg from "../../public/colors.jpg";
import StoreProvider from "./StoreProvider";
export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" h-full w-full relative">
      <Image
        src={colorBg}
        alt="bg-login"
        fill={true}
        style={{ objectFit: "cover" }}
        priority={true}
        className="absolute left-0 top-0"
      />
      <div className="absolute left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.0)] flex flex-col items-center justify-center">
        <StoreProvider>{children}</StoreProvider>
      </div>
    </div>
  );
}
