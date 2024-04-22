import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { MouseEvent, useCallback, useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { createModule } from "@/actions/create";
import { deleteModule } from "@/actions/delete";
import { AddLessonAccordionContent } from "@/components/create/AddLessonAccordionContent";
import { Prisma } from ".prisma/client";
import ModuleGetPayload = Prisma.ModuleGetPayload;

export type Module = ModuleGetPayload<{
  include: {
    lessons: true;
  };
}>;

export const AddModulesAccordion = ({
  moduleList,
}: {
  moduleList: Module[];
}) => {
  const { id: courseId } = useParams();
  const [inputValue, setInputValue] = useState("");
  const [modules, setModules] = useState(() => moduleList);
  const [activeControls, setActiveControls] = useState<number | undefined>();

  const addModule = useCallback(() => {
    const cb = async () => {
      const newModule = await createModule({
        courseId: courseId as string,
        title: inputValue,
      });
      setModules((prev) => [...prev, newModule]);
    };

    if (inputValue) {
      cb().then(() => setInputValue(""));
    }
  }, [courseId, inputValue, setModules]);

  const handleDeleteModuleClick = useCallback(
    (e: MouseEvent, id: string) => {
      e.preventDefault();
      deleteModule({ id }).then((module) =>
        setModules((prev) => prev.filter((m) => m.id !== module.id)),
      );
    },
    [setModules],
  );

  return (
    <>
      <Accordion type="single" collapsible>
        {modules.map(({ title, id, lessons }, index) => (
          <AccordionItem
            value={title}
            key={id}
            onMouseEnter={() => setActiveControls(index)}
            onMouseLeave={() => setActiveControls(undefined)}
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex justify-between w-full mr-4">
                {title}
                {activeControls === index && (
                  <div className="flex gap-2">
                    <MdModeEdit className="hover:text-blue-600" />
                    <FaRegTrashCan
                      className="hover:text-red-600"
                      onClick={(e) => handleDeleteModuleClick(e, id)}
                    />
                  </div>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <AddLessonAccordionContent
                lessons={lessons}
                moduleId={id}
                courseId={courseId as string}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-6 flex justify-between items-center">
        <Input
          placeholder="название модуля"
          unstyled
          value={inputValue}
          className="w-full border-b-4 border border-current  dark:text-gray-300"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <Button
          className="w-44 flex gap-2"
          size="sm"
          onClick={addModule}
          disabled={!inputValue.trim()}
        >
          <FaPlus />
          добавить модуль
        </Button>
      </div>
    </>
  );
};
