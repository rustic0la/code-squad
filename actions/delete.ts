"use server";

import { prisma } from "@/lib/db";

export const deleteCourse = async ({ id }: { id: string }) => {
  return prisma.course.delete({ where: { id } });
};

export const deleteModule = async ({ id }: { id: string }) => {
  return prisma.module.delete({ where: { id } });
};

export const deleteLesson = async ({ id }: { id: string }) => {
  return prisma.lesson.delete({ where: { id } });
};
