import { Divider } from "@mui/material";
import Image from "next/image";
import Logo from "../../public/logo.svg";

const SidebarSkeleton = () => {
  return (
    <div className="h-[calc(100vh-100px)] w-full bg-black p-5 text-gray-400">
      <div className="h-full">
        <div className="w-full pb-7">
          <Logo />
          <span className="pl-5 text-white">Groove</span>
        </div>
        <div className="animate-pulse delay-500 duration-700 ease-in-out">
          <div className="h-[200px]">
            <ul className="mb-10 text-gray-300">
              <div className="mb-5 h-3 w-[85px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-5 h-3 w-[85px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2 h-3 w-[120px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </ul>
            <ul className="mb-4 text-gray-300">
              <div className="mb-5 h-3 w-[130px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-5 h-3 w-[100px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </ul>
            <Divider className="my-0 mx-auto bg-gray-700" />
          </div>
          <div className="scroll h-[calc(100vh-390px)] hover:overflow-auto">
            <ul>
              <div className="mb-5 h-2 w-[70px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-5 h-2 w-[70px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-5 h-2 w-[70px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-5 h-2 w-[70px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-5 h-2 w-[70px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarSkeleton;
