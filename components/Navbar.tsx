import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Login } from "@/components/Login";
import Logo from "@/public/images/logo.png";
import Image from "next/image";
import { auth } from "@/lib/auth";
import React from "react";
import { Avatar } from "@/components/Avatar";

export const Navbar = async () => {
  const session = await auth();

  return (
    <Dialog>
      <div className="fixed bg-gradient-to-r from-gray-800 w-full p-2 flex items-center justify-between">
        <Link href="/">
          <Image alt="Logo" src={Logo} width={160} />
        </Link>
        {/*<div className="flex w-full max-w-sm items-center space-x-2">*/}
        {/*  <Input placeholder="поиск курса" className="w-full" />*/}
        {/*  <Button>*/}
        {/*    <MdSearch className="h-5 w-5" />*/}
        {/*  </Button>*/}
        {/*</div>*/}
        <DialogTrigger asChild>
          {!session?.user ? (
            <Button variant="ghost" size="sm">
              Войти
            </Button>
          ) : (
            <Avatar image={session?.user.image} name={session?.user.name} />
          )}
        </DialogTrigger>
      </div>
      {!session?.user && <Login />}
    </Dialog>
  );
};
