"use server";
import { prisma } from "@/lib/db";

export const fetchCourses = async () => {
  return prisma.course.findMany();
};

export const fetchModules = async ({ courseId }: { courseId: string }) => {
  return prisma.module.findMany({
    where: { courseId: { equals: courseId } },
    include: { lessons: true },
  });
};

export const fetchLessons = async ({ moduleId }: { moduleId: string }) => {
  return prisma.lesson.findMany({ where: { moduleId } });
};
