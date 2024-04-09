import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useCallback, useState } from "react";
import { Lesson } from "@prisma/client";
import { createLesson } from "@/actions/create";
import Link from "next/link";
import { MdModeEdit } from "react-icons/md";
import { deleteLesson } from "@/actions/delete";

export const AddLessonAccordionContent = ({
  moduleId,
  courseId,
  lessons,
}: {
  moduleId: string;
  courseId: string;
  lessons: Lesson[];
}) => {
  const [inputValue, setInputValue] = useState("");
  const [curLessons, setCurLessons] = useState<Lesson[]>(lessons);
  const [activeControls, setActiveControls] = useState<number | undefined>();

  const addLesson = useCallback(() => {
    if (inputValue) {
      createLesson({
        courseId: courseId as string,
        moduleId,
        title: inputValue,
      }).then((newLesson) => setCurLessons((prev) => [...prev, newLesson]));
      setInputValue("");
    }
  }, [courseId, inputValue, moduleId]);

  const handleDeleteLessonClick = useCallback(
    (e: React.MouseEvent<SVGElement, MouseEvent>, id: string) => {
      e.preventDefault();
      deleteLesson({ id }).then((lesson) =>
        setCurLessons((prev) => prev.filter((l) => l.id !== lesson.id)),
      );
    },
    [setCurLessons],
  );

  return (
    <div>
      <ol className="my-2 flex flex-col gap-0.5 mx-4">
        {curLessons.map(({ title, id }, index) => (
          <Link key={id} href={`/courses/${courseId}/${id}`}>
            <div
              className="hover:bg-slate-200 p-2 hover:rounded-lg flex justify-between items-center"
              onMouseEnter={() => setActiveControls(index)}
              onMouseLeave={() => setActiveControls(undefined)}
            >
              <div className="flex gap-2">
                ☑️<li>{title}</li>
              </div>
              {activeControls === index && (
                <div className="flex gap-2">
                  <MdModeEdit />
                  <FaRegTrashCan
                    onClick={(e) => handleDeleteLessonClick(e, id)}
                  />
                </div>
              )}
            </div>
          </Link>
        ))}
      </ol>
      <div className="flex justify-between items-center">
        <Input
          placeholder="название урока"
          unstyled
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <Button
          variant="secondary"
          className="flex gap-2"
          size="sm"
          onClick={addLesson}
          disabled={!inputValue.trim()}
        >
          <FaPlus />
          Добавить урок
        </Button>
      </div>
    </div>
  );
};
