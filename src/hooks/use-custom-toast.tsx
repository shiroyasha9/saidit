import Link from "next/link";
import { toast } from "./use-toast";
import { buttonVariants } from "@/components/ui/Button";

const useCustomToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: "Login required",
      description: "You must be logged in to do that",
      variant: "destructive",
      action: (
        <Link
          onClick={() => dismiss()}
          className={buttonVariants({ variant: "outline" })}
          href="/sign-in"
        >
          Login
        </Link>
      ),
    });
  };
  return { loginToast };
};

export default useCustomToast;
