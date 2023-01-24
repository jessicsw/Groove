import { useState } from "react";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { auth } from "../lib/mutations";
import Image from "next/image";

const AuthForm = ({ mode }: { mode: "signin" | "signup" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const user = await auth(mode, { email, password });

    setIsLoading(false);
    router.push("/");
  };

  return (
    <div className="h-screen w-screen bg-black">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Image src="/logo.svg" alt="groove logo" width="100" height="100" />
        <form
          id={mode}
          onSubmit={handleSubmit}
          className="flex flex-col items-center rounded-md bg-[#3e4651] px-14 py-2"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="m-1 rounded-sm p-1"
            type="email"
            name="email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="m-1 rounded-sm p-1"
            type="password"
            name="password"
          />
          <button
            disabled={isLoading}
            type="submit"
            name={mode}
            className="mt-5 inline-flex h-[35px] w-[120px] items-center justify-center rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {isLoading ? (
              <Image
                src="/loader.svg"
                alt="Loading spinner"
                className="inline h-4 w-4 animate-spin text-gray-200 dark:text-gray-600"
                width="15"
                height="15"
              />
            ) : (
              mode
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
