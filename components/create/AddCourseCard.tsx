import Link from "next/link";
import { Button } from "@/components/ui/button";

export const AddCourseCard = () => {
  return (
    <div className="w-max h-[200px] border-dashed border-4 border-current rounded-lg flex justify-center items-center m-3">
      <Link href="/courses/new">
        <Button className="m-2">Создать</Button>
      </Link>
    </div>
  );
};
