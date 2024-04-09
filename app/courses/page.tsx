import { fetchCourses } from "@/actions";
import { AddCourseCard } from "@/components/create/AddCourseCard";
import { CourseCard } from "@/components/CourseCard";
import { deleteCourse } from "@/actions/delete";

export default async function CreatePage() {
  const courses = await fetchCourses();

  const handleDeleteCourseClick = async (id: string) => {
    await deleteCourse({ id });
  };

  return (
    <div className="flex gap-5 flex-wrap">
      {courses.map((c) => (
        <CourseCard course={c} key={c.id} />
      ))}
      <AddCourseCard />
    </div>
    // <Button
    //     size="icon"
    //     variant="destructive"
    //     onClick={handleDeleteCourseClick}
    // >
    //     <FaRegTrashCan />
    // </Button>
  );
}
