import { getAuthSession } from "@/lib/auth";
import { Bot } from "lucide-react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { UserAccountNav } from "./UserAccountNav";
import { buttonVariants } from "./ui/Button";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="fixed inset-x-0 top-0 z-[10] h-fit border-b border-zinc-300 bg-zinc-100 py-2">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Bot className="h-8 w-8 sm:h-6 sm:w-6" />
          <p className="hidden text-sm font-medium text-zinc-700 md:block">
            Saidit
          </p>
        </Link>
        <SearchBar />
        {session?.user ? (
          <UserAccountNav user={session.user} />
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
