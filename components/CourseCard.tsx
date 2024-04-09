import Link from "next/link";
import Image from "next/image";

import { Course } from "@prisma/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BsCardImage } from "react-icons/bs";

export const CourseCard = ({ course }: { course: Course }) => {
  return (
    <Link key={course.id} href={`/courses/${course.id}`}>
      <Card className="flex justify-center items-center flex-col min-w-24 rounded-xl">
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
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>{course.createdAt.toLocaleString()}</p>
        </CardFooter>
      </Card>
      {/*<div className="border-dashed border-4 border-current flex justify-center items-center flex-col min-w-24">*/}
      {/*  <div className="w-20 h-16 flex items-center justify-center">*/}
      {/*    {course.image ? (*/}
      {/*      <Image*/}
      {/*        src={course.image}*/}
      {/*        alt={course.image}*/}
      {/*        className="w-20 h-16"*/}
      {/*      />*/}
      {/*    ) : (*/}
      {/*      <BsCardImage className="w-20 h-16" />*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*  <h3>{course.title}</h3>*/}
      {/*  <p>{course.description}</p>*/}
      {/*  <p>{course.createdAt.toLocaleString()}</p>*/}
      {/*</div>*/}
    </Link>
  );
};
