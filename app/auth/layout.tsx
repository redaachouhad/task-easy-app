import Image from "next/image";
import bgLogin from "../../public/bg-login.jpg";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full relative">
      <Image
        src={bgLogin}
        alt="bg-login"
        fill={true}
        style={{ objectFit: "cover" }}
        priority={true}
        className="absolute right-0 top-0 w-6/10"
      />
      <div className="absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.4)] flex flex-col justify-center items-center gap-2">
        {children}
      </div>
    </div>
  );
}
