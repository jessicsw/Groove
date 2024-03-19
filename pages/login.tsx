import { Divider } from "@mui/material";
import { useRouter } from "next/router";
import AuthForm from "../components/AuthForm";
import Logo from "../public/logo.svg";

const LogIn = () => {
  const router = useRouter();
  return (
    <div className="h-screen w-screen bg-black text-sm text-white">
      <div className="flex justify-center">
        <button
          className="flex items-center"
          onClick={() => router.replace("/")}
        >
          <div className="pr-1 text-lg">Groove</div>
          <Logo className="py-4" />
        </button>
      </div>
      <Divider className="bg-gray-700" />
      <div className="m-auto w-[380px]">
        <AuthForm mode="login" />
        <div className="relative py-10">
          <Divider className="bg-gray-700" />
          <div className="absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] bg-black p-3 text-center">
            OR
          </div>
        </div>
        <div className="text-center text-xl font-semibold">
          Don&apos;t have an account?
        </div>
        <button
          onClick={() => router.replace("/signup")}
          className="mt-5 h-12 w-full rounded-full bg-white font-bold text-gray-500 hover:h-[50px] hover:w-[101%]"
        >
          SIGN UP FOR GROOVE
        </button>
      </div>
    </div>
  );
};

LogIn.auth = true;

export default LogIn;
