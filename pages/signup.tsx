import AuthForm from "../components/AuthForm";
import { Divider } from "@mui/material";
import { useRouter } from "next/router";
import Logo from "../public/logo.svg";

const SignUp = () => {
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
        <AuthForm mode="signup" />
      </div>
    </div>
  );
};

SignUp.auth = true;

export default SignUp;
