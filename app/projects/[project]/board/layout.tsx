export default function OneProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.2)]">
        <div className="w-full h-full bg-[rgba(255,255,255,0.18)] backdrop-blur-md flex flex-col items-center p-2">
          {children}
        </div>
      </div>
    </>
  );
}
