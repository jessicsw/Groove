import { PropsWithChildren } from "react";
import Sidebar from "./Sidebar";
import PlayerBar from "./PlayerBar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen w-screen">
      <div className="absolute top-0 left-0 w-[250px]">
        <Sidebar />
      </div>
      <div className="relative ml-[250px] h-[calc(100vh-100px)]">
        {children}
      </div>
      <div className="absolute left-0 bottom-0 h-[100px] w-full">
        <PlayerBar />
      </div>
    </div>
  );
};

export default Layout;
