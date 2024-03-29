"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";
import { FormEvent, useState } from "react";
import { createCourse } from "@/actions/create";
import { useRouter } from "next/navigation";

export default function NewCoursePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const id = await createCourse({ title, description });
    router.replace(`/courses/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex m-6 flex-col gap-6 w-1/2 justify-center mx-auto">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Введите название курса
        </h3>
        <Input
          className="w-full"
          placeholder="Название курса"
          onChange={(e) => setTitle(e.target.value)}
        />
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Добавьте описание
        </h3>
        <Textarea
          placeholder="Добавьте описание"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          type="submit"
          variant="link"
          className="flex gap-2"
          disabled={!title}
        >
          Далее
          <FaArrowRight />
        </Button>
      </div>
    </form>
  );
}
