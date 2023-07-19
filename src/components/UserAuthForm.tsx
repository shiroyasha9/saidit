import { cn } from "@/lib/utils";
import { FC } from "react";
import { Button } from "./ui/Button";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = props => {
  const { className, ...rest } = props;
  return (
    <div {...rest} className={cn("flex justify-center", className)}>
      <Button size='sm' className='w-full'>
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
