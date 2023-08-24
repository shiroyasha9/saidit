import { getAuthSession } from "@/lib/auth";
import { Bot } from "lucide-react";
import Link from "next/link";
import UserAccountNav from "./UserAccountNav";
import { buttonVariants } from "./ui/Button";
import SearchBar from "./SearchBar";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-10 py-2 ">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex gap-2 items-center">
          <Bot className="w-8 h-8 sm:h-6 sm:w-6" />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Saidit
          </p>
        </Link>
        <SearchBar />
        {session?.user ? (
          <UserAccountNav
            user={{
              name: session.user.name,
              image: session.user.image,
              email: session.user.email,
            }}
          />
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
