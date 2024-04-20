"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchCourseById } from "@/actions";
import { AddModulesAccordion } from "@/components/create/AddModulesAccordion";
import { Prisma } from "@prisma/client";
import { Spinner } from "@/components/ui/Spinner";
import CourseGetPayload = Prisma.CourseGetPayload;

export type Course = CourseGetPayload<{
  include: {
    modules: {
      include: {
        lessons: true;
      };
    };
  };
}>;

export default function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const cb = async () => {
      const course = await fetchCourseById({ id: id as string });
      setCourse(course);
    };
    setPending(true);
    cb().then(() => setPending(false));
  }, [id]);

  if (pending) {
    return <Spinner />;
  }

  if (!course) {
    return null;
  }

  return (
    <div className="m-6 mx-10">
      <h1>{course.title}</h1>
      <h2>{course.description}</h2>
      <h3>Содержание:</h3>
      <AddModulesAccordion moduleList={course.modules} />
    </div>
  );
}
