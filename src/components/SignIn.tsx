import { Bot } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import UserAuthForm from "./UserAuthForm";

const SignIn: FC = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex-col flex space-y-2 text-center">
        <Bot className="w-6 h-6 mx-auto" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Saidit account and agree to our
          User Agreement and Privacy Policy.
        </p>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-zinc-700 ">
          New To Saidit?{" "}
          <Link
            href="/sign-up"
            className="hover:text-zinc-800 text-sm underline underline-offset-4"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
