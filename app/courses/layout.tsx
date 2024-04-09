import { ReactNode } from "react";

export default async function CoursesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="w-3/4 mx-auto">{children}</div>;
}
