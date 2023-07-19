"use client";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/Button";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = props => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google", {
        callbackUrl: `${window.location.origin}/`,
      });
    } catch (error) {
      toast({
        title: "There was a problem.",
        description: "There was an error logging in with Google.",
        variant: "destructive",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const { className, ...rest } = props;
  return (
    <div {...rest} className={cn("flex justify-center", className)}>
      <Button
        size='sm'
        className='w-full'
        onClick={loginWithGoogle}
        isLoading={isLoading}
      >
        {isLoading ? null : <Icons.google className='w-4 h-4 mr-2' />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
