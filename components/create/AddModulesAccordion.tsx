import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SetStateAction, useCallback, useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { createModule } from "@/actions/create";
import { deleteModule } from "@/actions/delete";
import { AddLessonAccordionContent } from "@/components/create/AddLessonAccordionContent";
import { Module } from "@/app/courses/[id]/page";

export const AddModulesAccordion = ({
  modules,
  setModules,
}: {
  modules: Module[];
  setModules: (value: SetStateAction<Module[]>) => void;
}) => {
  const { id: courseId } = useParams();
  const [inputValue, setInputValue] = useState("");
  const [activeControls, setActiveControls] = useState<number | undefined>();

  const addModule = useCallback(() => {
    if (inputValue) {
      createModule({
        courseId: courseId as string,
        title: inputValue,
      }).then((newModule) => setModules((prev) => [...prev, newModule]));
      setInputValue("");
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
      <div className="w-3/4 mx-auto flex justify-between items-center">
        <Input
          placeholder="Введите название модуля"
          unstyled
          value={inputValue}
          className="w-full border-b-4 border border-current"
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
          Добавить модуль
        </Button>
      </div>
      <Accordion type="single" className="w-3/4 mx-auto mt-6" collapsible>
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
                    <MdModeEdit />
                    <FaRegTrashCan
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
    </>
  );
};
