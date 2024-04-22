"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useParams, usePathname } from "next/navigation";
import { getLessonInfo } from "@/actions/get";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumb } from "@/components/Breadcrumb";
import Markdown from "react-markdown";

export default function LessonPage() {
  const { lessonId } = useParams();
  console.log("path", usePathname());
  const [breadcrumbs, setBreadcrumbs] = useState<
    { id: string; title: string }[]
  >([]);

  const [pending, setPending] = useState(false);

  const [mdContent, setMdContent] = useState("");

  const handleEdit = useDebounce((e: ChangeEvent<HTMLTextAreaElement>) => {
    setMdContent(e.target.value);
  }, 2000);

  useEffect(() => {
    setPending(true);
    getLessonInfo({ id: lessonId as string })
      .then((data) => setBreadcrumbs(data))
      .then(() => setPending(false));
  }, [lessonId]);

  return (
    <div className="mx-10 flex flex-col gap-3">
      {pending ? (
        <Skeleton className="h-5 w-1/6" />
      ) : (
        <Breadcrumb path={breadcrumbs} />
      )}
      <div className="h-[calc(100vh-5rem)]">
        <ResizablePanelGroup direction="vertical" className="rounded-lg">
          <ResizablePanel defaultSize={100}>
            <ResizablePanelGroup direction="horizontal" className="rounded-lg">
              <ResizablePanel defaultSize={50}>
                <Textarea
                  onChange={handleEdit}
                  className="h-[98%] m-1 w-[calc(100%-10px)]"
                />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                <div className="flex flex-col gap-5 overflow-auto ml-4">
                  <Markdown rehypePlugins={[]} remarkPlugins={[]}>
                    {mdContent}
                  </Markdown>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={0}>
            <p>hello</p>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
