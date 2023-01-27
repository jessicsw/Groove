import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/mutations";
import { Divider } from "@mui/material";
import Image from "next/image";

const AuthForm = ({ mode }: { mode: "login" | "signup" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const user = await auth(mode, { email, password });

    setIsLoading(false);
    router.push("/");
  };

  return (
    <div className="h-full w-full text-white">
      <div className="p-5 text-center text-base font-semibold ">
        To continue, log in to Groove.
      </div>
      <form
        id={mode}
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center justify-center"
      >
        <label className="m-2 flex w-full flex-col" htmlFor="email">
          Email Address
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="mt-2 rounded-sm py-3 pl-2 text-black"
            type="email"
            name="email"
          />
        </label>
        <label className="m-2 flex w-full flex-col" htmlFor="password">
          Password
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mt-2 w-full rounded-sm py-3 pl-2 text-black"
            type="password"
            name="password"
          />
        </label>
        <div className="mt-5 h-[50px] w-[146px]">
          <button
            disabled={isLoading}
            type="submit"
            name={mode}
            className="inline-flex h-12 w-36 items-center justify-center rounded-full bg-[#3857aa] py-2.5 px-5 text-sm font-bold text-white hover:h-[50px] hover:w-[146px] focus:h-[50px]  focus:w-[146px] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {isLoading ? (
              <Image
                src="/loader.svg"
                alt="Loading spinner"
                className="inline h-4 w-4 animate-spin text-gray-200 dark:text-gray-600"
                width="15"
                height="15"
              />
            ) : mode === "login" ? (
              "LOG IN"
            ) : (
              "SIGN UP"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
