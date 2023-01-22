import { ReactElement } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="h-screen w-screen">
      <div className="absolute top-0 left-0 w-[250px]">
        <Sidebar />
      </div>
      <div className="ml-[250px]">{children}</div>
      <div className="absolute left-0 bottom-0">player</div>
    </div>
  );
};

export default Layout;
