"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchCourseById } from "@/actions";
import { AddModulesAccordion } from "@/components/create/AddModulesAccordion";
import { Prisma } from "@prisma/client";
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
    setPending(true);
    fetchCourseById({ id: id as string })
      .then((data) => setCourse(data))
      .then(() => setPending(false));
  }, [id]);

  if (pending) {
    return <h1>LOADING</h1>;
  }

  if (!course) {
    return null;
  }

  return (
    <>
      <h1>{course.title}</h1>
      <h3>{course.description}</h3>
      <AddModulesAccordion modules={course.modules} setModules={() => {}} />
    </>
  );
}
