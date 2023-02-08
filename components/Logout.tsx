import { fetchUser } from "@/lib/fetchers";
import { AiFillCaretDown } from "react-icons/ai";
import Image from "next/image";
import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";
import { logoutUser } from "@/lib/mutations";

const Logout = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: user } = useSWR("/api/me", fetchUser);
  const router = useRouter();

  const handleDropDownMenu = () => {
    setIsVisible((state) => !state);
  };

  const handleLogOut = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <div className="m-1 text-xs font-semibold text-white">
      <button
        type="button"
        onClick={handleDropDownMenu}
        className="relative rounded-full bg-black p-1.5 hover:bg-opacity-60"
      >
        <div className="flex items-center">
          <Image
            src={`https://picsum.photos/seed/${user?.id}/400`}
            alt="avatar"
            width={30}
            height={30}
            className="rounded-full bg-yellow-500"
          />
          <div className="px-1.5">{user?.firstName}</div>
          <AiFillCaretDown className="" size={12} />
        </div>
      </button>
      <div
        className={`${
          isVisible ? "block" : "hidden"
        } absolute right-1 z-10 mt-1 rounded-md bg-black bg-opacity-80 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div
          className="scroll m-1.5 w-32 overflow-y-scroll p-2 hover:rounded-sm hover:bg-white hover:bg-opacity-20"
          role="none"
          onClick={handleLogOut}
        >
          Log out
        </div>
      </div>
    </div>
  );
};

export default Logout;
