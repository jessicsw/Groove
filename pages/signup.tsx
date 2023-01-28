import AuthForm from "../components/AuthForm";
import Image from "next/image";

const SignUp = () => {
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
      <div className="m-auto w-[380px]">
        <AuthForm mode="signup" />
      </div>
    </div>
  );
};

SignUp.auth = true;

export default SignUp;
