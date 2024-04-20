import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import React from "react";

export const AddCourseCard = () => {
  return (
    <Link href="/courses/new">
      <div className="w-44 h-56 border-dashed border-4 border-current rounded-lg flex justify-center items-center">
        <Button className="m-2 flex gap-2">
          <FaPlus />
          Создать
        </Button>
      </div>
    </Link>
  );
};
