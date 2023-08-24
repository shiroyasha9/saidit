import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/Toaster";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Saidit",
  description: "A Reddit clone built with Next.js and TypeScript.",
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "light bg-white text-slate-900 antialiased",
        inter.className,
      )}
    >
      <Providers>
        <body className="min-h-screen bg-slate-50 pt-12 antialiased">
          {/* @ts-expect-error server component */}
          <Navbar />

          {authModal}
          <div className="container mx-auto h-full max-w-7xl pt-12">
            {children}
            <Toaster />
          </div>
        </body>
      </Providers>
    </html>
  );
}
