"use client";

import { fetchCourses } from "@/actions";
import { AddCourseCard } from "@/components/create/AddCourseCard";
import { CourseCard } from "@/components/CourseCard";
import { deleteCourse } from "@/actions/delete";
import React, { MouseEvent, useCallback, useEffect, useState } from "react";
import { Course } from "@prisma/client";
import { Spinner } from "@/components/ui/Spinner";

export default function CreatePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const cb = async () => {
      const courses = await fetchCourses();
      setCourses(courses);
    };
    setPending(true);
    cb();
    setPending(false);
  }, []);

  const handleDeleteCourseClick = useCallback((e: MouseEvent, id: string) => {
    const cb = async () => {
      const course = await deleteCourse({ id });
      setCourses((prev) => prev.filter((c) => c.id !== course.id));
    };

    e.preventDefault();
    cb();
  }, []);

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
