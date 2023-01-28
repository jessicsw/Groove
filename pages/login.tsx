import { Divider } from "@mui/material";
import { useRouter } from "next/router";
import AuthForm from "../components/AuthForm";
import Image from "next/image";

const LogIn = () => {
  const router = useRouter();
  return (
    <div className="h-screen w-screen bg-black text-sm text-white">
      <div className="flex items-center justify-center">
        <div className="pr-5 text-lg">Groove</div>
        <Image
          className="py-4"
          src="/logo.svg"
          alt="groove logo"
          width="100"
          height="100"
        />
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
          Don't have an account?
        </div>
        <button
          onClick={() => router.push("/signup")}
          className="mt-5 w-full rounded-full bg-white p-5 font-bold text-gray-500"
        >
          SIGN UP FOR GROOVE
        </button>
      </div>
    </div>
  );
};

LogIn.auth = true;

export default LogIn;
