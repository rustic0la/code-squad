"use server";

import { prisma } from "@/lib/db";

export const getLessonInfo = async ({ id }: { id: string }) => {
  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: { course: true, module: true },
  });

  if (!lesson) return [];

  return [
    { id: lesson.course?.id || "", title: lesson.course?.title || "" },
    { id: lesson.module?.id || "", title: lesson.module?.title || "" },
    { id, title: lesson.title },
  ];
};
