import Link from "next/link";
import { Button } from "@/components/ui/button";

export const AddCourseCard = () => {
  return (
    <Link href="/courses/new">
      <div className="w-44 h-56 border-dashed border-4 border-current rounded-lg flex justify-center items-center">
        <Button className="m-2">Создать</Button>
      </div>
    </Link>
  );
};
