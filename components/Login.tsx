"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export const Login = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Авторизуйтесь</DialogTitle>
        <DialogDescription>
          выберите способ авторизации, чтобы начать проходить курсы
        </DialogDescription>
      </DialogHeader>
      <Button
        variant="outline"
        className="flex gap-2"
        onClick={() => signIn("google")}
      >
        <FcGoogle className="h-6 w-6" />
        продолжить с Google
      </Button>
      <Button
        variant="outline"
        className="flex gap-2"
        onClick={() => signIn("github")}
      >
        <FaGithub className="h-6 w-6" />
        продолжить с Github
      </Button>
    </DialogContent>
  );
};
