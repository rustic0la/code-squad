"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchModules } from "@/actions";
import { AddModulesAccordion } from "@/components/create/AddModulesAccordion";
import { Prisma } from "@prisma/client";
import ModuleGetPayload = Prisma.ModuleGetPayload;

export type Module = ModuleGetPayload<{
  include: {
    lessons: true;
  };
}>;

export default function CoursePage() {
  const { id } = useParams();
  const [modules, setModules] = useState<Module[]>([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    fetchModules({ courseId: id as string })
      .then((data) => setModules(data))
      .then(() => setPending(false));
  }, [id]);

  if (pending) {
    return <h1>LOADING</h1>;
  }
  return <AddModulesAccordion modules={modules} setModules={setModules} />;
}
