import Image from "next/image";
import { BsCardImage } from "react-icons/bs";
import Link from "next/link";

export const CourseCard = ({ course }) => {
  return (
    <Link key={course.id} href={`/courses/${course.id}`}>
      <div className="border-dashed border-4 border-current flex justify-center items-center flex-col min-w-24">
        <div className="w-20 h-16 flex items-center justify-center">
          {course.image ? (
            <Image
              src={course.image}
              alt={course.image}
              className="w-20 h-16"
            />
          ) : (
            <BsCardImage className="w-20 h-16" />
          )}
        </div>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <p>{course.createdAt.toLocaleString()}</p>
      </div>
    </Link>
  );
};
