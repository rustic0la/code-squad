import {
  Breadcrumb as Wrapper,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation";

export const Breadcrumb = ({
  path,
}: {
  path: { id: string; title: string }[];
}) => {
  const router = useRouter();
  return (
    <Wrapper>
      <BreadcrumbList>
        {path.map(({ id, title }, index) => (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={index !== path.length - 1 ? `${id}` : undefined}
              >
                {index === path.length - 1 ? (
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                ) : (
                  title
                )}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== path.length - 1 && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Wrapper>
  );
};
