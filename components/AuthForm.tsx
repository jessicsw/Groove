import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { authorizeLogin, createUser } from "../lib/mutations";
import Image from "next/image";

type AuthFormProps = {
  mode: "login" | "signup";
};

const AuthForm = ({ mode }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const user =
      mode === "login"
        ? await authorizeLogin({ email, password })
        : await createUser({ email, password, firstName, lastName });

    setIsLoading(false);
    router.push("/");
  };

  return (
    <div className="h-full w-full text-white">
      <div className="p-7 text-center text-base font-semibold ">
        {mode === "login"
          ? "To continue, log in to Groove."
          : "Sign up with your email address"}
      </div>
      <form
        id={mode}
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center justify-center"
      >
        <label className="m-2 flex w-full flex-col" htmlFor="email">
          {mode === "login" ? "Email Address" : `What's your email address?`}
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
          {mode === "login" ? "Password" : "Create a password"}
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mt-2 w-full rounded-sm py-3 pl-2 text-black"
            type="password"
            name="password"
          />
        </label>
        {mode === "signup" && (
          <label className="mt-2 flex w-full flex-col" htmlFor="firstName">
            What's your first name?
            <input
              id="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="mt-2 w-full rounded-sm py-3 pl-2 text-black"
              type="first name"
              name="first name"
            />
          </label>
        )}
        {mode === "signup" && (
          <label className="mt-2 flex w-full flex-col" htmlFor="lastName">
            What's your last name?
            <input
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="mt-2 w-full rounded-sm py-3 pl-2 text-black"
              type="last name"
              name="last name"
            />
          </label>
        )}
        <div className="mt-5 h-[50px] w-[146px]">
          <button
            disabled={isLoading}
            type="submit"
            name={mode}
            className="inline-flex h-12 w-36 items-center justify-center rounded-full bg-[#3857aa] py-2.5 px-5 text-sm font-bold text-white hover:h-[50px] hover:w-[146px] focus:h-[50px] focus:w-[146px]"
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
