"use server";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export const deleteCourse = async ({ id }: { id: string }) => {
  await prisma.course.delete({ where: { id } });
  redirect("/courses");
};

export const deleteModule = async ({ id }: { id: string }) => {
  return prisma.module.delete({ where: { id } });
};

export const deleteLesson = async ({ id }: { id: string }) => {
  return prisma.lesson.delete({ where: { id } });
};
