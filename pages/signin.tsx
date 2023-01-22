import AuthForm from "../components/AuthForm";

const SignIn = () => {
  return <AuthForm mode="signin" />;
};

SignIn.auth = true;

export default SignIn;
