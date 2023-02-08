import AuthForm from "../components/AuthForm";
import Image from "next/image";
import Logo from "../public/logo.svg";

const SignUp = () => {
  return (
    <div className="h-screen w-screen bg-black text-sm text-white">
      <div className="flex items-center justify-center">
        <div className="pr-5 text-lg">Groove</div>
        <Logo />
      </div>
      <div className="m-auto w-[380px]">
        <AuthForm mode="signup" />
      </div>
    </div>
  );
};

SignUp.auth = true;

export default SignUp;
