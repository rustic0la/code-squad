import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { MouseEvent, useCallback, useState } from "react";
import { Lesson } from "@prisma/client";
import { createLesson } from "@/actions/create";
import Link from "next/link";
import { MdModeEdit } from "react-icons/md";
import { deleteLesson } from "@/actions/delete";
import { Spinner } from "@/components/ui/Spinner";

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
  const [pending, setPending] = useState(false);

  const addLesson = useCallback(() => {
    const cb = async (title: string) => {
      const newLesson = await createLesson({
        courseId: courseId as string,
        moduleId,
        title,
      });
      setCurLessons((prev) => [...prev, newLesson]);
    };

    if (inputValue) {
      setPending(true);
      cb(inputValue);
      setInputValue("");
      setPending(false);
    }
  }, [courseId, inputValue, moduleId]);

  const handleDeleteLessonClick = useCallback(
    (e: MouseEvent, id: string) => {
      const cb = async () => {
        const lesson = await deleteLesson({ id });
        setCurLessons((prev) => prev.filter((l) => l.id !== lesson.id));
      };

      e.preventDefault();
      cb();
    },
    [setCurLessons],
  );

  return (
    <div>
      <ol className="my-2 flex flex-col gap-0.5 mx-4">
        {curLessons.map(({ title, id }, index) => (
          <Link key={id} href={`/courses/${courseId}/${id}`}>
            <div
              className="hover:bg-slate-200 hover:dark:bg-slate-600 p-2 hover:rounded-lg flex justify-between items-center"
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
          {pending ? (
            <Spinner />
          ) : (
            <>
              <FaPlus />
              добавить урок
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
