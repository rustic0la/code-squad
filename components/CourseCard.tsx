import Link from "next/link";
import Image from "next/image";
import React, { MouseEvent, useState } from "react";
import { Course } from "@prisma/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BsCardImage } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";

export const CourseCard = ({
  course,
  onClick,
}: {
  course: Course;
  onClick: (e: MouseEvent, id: string) => void;
}) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <Link key={course.id} href={`/courses/${course.id}`}>
      <Card
        className="relative flex justify-center items-center flex-col min-w-24 rounded-xl max-w-48 h-56 hover:transition-all hover:-translate-y-1"
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
      >
        <CardContent className="w-20 flex items-center justify-center">
          {course.image ? (
            <Image
              src={course.image}
              alt={course.image}
              className="w-20 h-16"
            />
          ) : (
            <BsCardImage className="w-20 h-16" />
          )}
          {showDelete && (
            <FaRegTrashCan
              onClick={(e) => onClick(e, course.id)}
              className="absolute right-3 top-3 hover:text-red-600"
            />
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2 p-2">
          <h3>{course.title}</h3>
          <p>{course.createdAt.toLocaleString()}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};
