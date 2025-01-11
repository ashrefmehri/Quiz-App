"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ModeToggle } from "../theme-toggle";

export const Navbar = () => {
  const pathname = usePathname();

  const menuItems = [
    { label: "Acceuil", link: "/" },
    { label: "À propos", link: "/apropos" },
    { label: "Fonctionnalités", link: "/fonctionnalités" },
    { label: "Tarifs", link: "/tarifs" },
  ];

  return (
    <div className="w-full  flex items-center justify-between md:px-10 px-4 py-4  relative ">
      <div className="Logo">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={130} height={50} />
        </Link>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        {menuItems.map((item) => (
          <div key={item.label}>
            <Link
              className={cn(
                "font-semibold text-xl hover:text-blue-600",
                pathname === item.link && "text-blue-600"
              )}
              href={item.link}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex items-center md:gap-5  gap-2">
        <ModeToggle/>
      <div className="flex gap-2">
        <Link href="/auth/connection">
          <Button
            variant="secondary"
            className="text-lg bg-transparent text-blue-600 rounded-full"
          >
            Connection
          </Button>
        </Link>
        <Link className="hidden md:flex" href="/auth/inscription">
          <Button className="text-lg bg-blue-600 hover:bg-blue-600/90 rounded-full">
            S'inscrire
          </Button>
        </Link>
      </div>
      </div>
    </div>
  );
};
