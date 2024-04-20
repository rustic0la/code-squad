// import { EditorComponent } from "@/components/create/TextEditor";
// import { Button } from "@/components/ui/button";
// import QuizCreator from "@/components/create/QuizCreator";
//
// export default function LessonPage() {
//   return (
//     <>
//       <h1>lesson page</h1>
//       <EditorComponent />
//       <Button>Создать тест</Button>
//       <QuizCreator />
//     </>
//   );
// }

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
    <div className="flex gap-10">
      <Textarea
        className="w-1/2 min-h-[calc(100vh-5rem-65px)]"
        onChange={handleEdit}
      />
      <div className="w-1/2 flex flex-col gap-5">
        <Markdown rehypePlugins={[]} remarkPlugins={[]}>
          {mdContent}
        </Markdown>
      </div>
    </div>
  );
}
