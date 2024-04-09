"use client";

import { fetchCourses } from "@/actions";
import { AddCourseCard } from "@/components/create/AddCourseCard";
import { CourseCard } from "@/components/CourseCard";
import { deleteCourse } from "@/actions/delete";
import React, { useCallback, useEffect, useState } from "react";
import { Course } from "@prisma/client";
import { Spinner } from "@/components/ui/Spinner";

export default function CreatePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    fetchCourses()
      .then((data) => setCourses(data))
      .then(() => setPending(false));
  }, []);

  const handleDeleteCourseClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
      e.preventDefault();
      deleteCourse({ id }).then((course) =>
        setCourses((prev) => prev.filter((c) => c.id !== course.id)),
      );
    },
    [],
  );

  return (
    <>
      <div className="flex gap-5 flex-wrap">
        {pending ? (
          <div className="flex justify-center items-center w-full h-full">
            <Spinner />
          </div>
        ) : (
          <>
            {/*  TODO: make grid of three elements, increase padding*/}
            {courses.map((c) => (
              <CourseCard
                course={c}
                key={c.id}
                onClick={handleDeleteCourseClick}
              />
            ))}
            <AddCourseCard />
          </>
        )}
      </div>
    </>
  );
}
