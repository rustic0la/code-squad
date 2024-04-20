"use client";

import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import Markdown from "react-markdown";

export default function LessonPage() {
  const [mdContent, setMdContent] = useState("");

  const handleEdit = useDebounce((e: ChangeEvent<HTMLTextAreaElement>) => {
    setMdContent(e.target.value);
  }, 2000);

  return (
    <div className="flex gap-10 mx-10 h-[calc(100vh-3rem)]">
      <Textarea className="w-1/2" onChange={handleEdit} />
      <div className="w-1/2 flex flex-col gap-5 overflow-auto">
        <Markdown rehypePlugins={[]} remarkPlugins={[]}>
          {mdContent}
        </Markdown>
      </div>
    </div>
  );
}
