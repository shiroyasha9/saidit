import { Bot } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import UserAuthForm from "./UserAuthForm";

const SignIn: FC = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Bot className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
        <p className="mx-auto max-w-xs text-sm">
          By continuing, you are setting up a Saidit account and agree to our
          User Agreement and Privacy Policy.
        </p>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-zinc-700 ">
          New To Saidit?{" "}
          <Link
            href="/sign-up"
            className="text-sm underline underline-offset-4 hover:text-zinc-800"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
