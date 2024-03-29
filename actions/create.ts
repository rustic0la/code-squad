"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export const createCourse = async ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  const session = await auth();
  const { id } = await prisma.course.create({
    data: {
      title,
      description,
      author: { connect: { id: session?.user?.id } },
    },
  });
  return id;
};

export const createModule = async ({
  courseId,
  title,
}: {
  courseId: string;
  title: string;
}) => {
  return prisma.module.create({
    data: { title, course: { connect: { id: courseId } } },
    include: { lessons: true },
  });
};

export const createLesson = async ({
  moduleId,
  courseId,
  title,
}: {
  title: string;
  courseId: string;
  moduleId: string;
}) => {
  return prisma.lesson.create({
    data: {
      title,
      module: { connect: { id: moduleId } },
      course: { connect: { id: courseId } },
    },
  });
};
