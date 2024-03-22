"use client";

import {
  Avatar as AvatarWrapper,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

interface AvatarProps {
  image?: string | null;
  name?: string | null;
}

export const Avatar = ({ image, name }: AvatarProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <AvatarWrapper>
          {image && <AvatarImage src={image} />}
          {name && <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>}
        </AvatarWrapper>
      </PopoverTrigger>
      <PopoverContent>
        <Button variant="link" onClick={() => signOut()}>
          Выйти
        </Button>
      </PopoverContent>
    </Popover>
  );
};
