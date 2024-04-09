"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";

export const EditorComponent = () => {
  const ejInstance = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const initializeEditor = useCallback(async () => {
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;
    const Quote = (await import("@editorjs/quote")).default;
    const Paragraph = (await import("@editorjs/paragraph")).default;

    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      onChange: async () => {
        let content = await editor?.saver?.save();
        console.log("=>(TextEditor.tsx:30) content", content);
      },
      inlineToolbar: true,
      data: { blocks: [] },
      tools: {
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        header: {
          class: Header,
          inlineToolbar: ["link"],
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: "/api/link",
          },
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file: File) {
                // upload to upload thing
                // const [res] = await uploadFiles([file], 'imageUploader')

                return {
                  success: 1,
                  file: {
                    url: "fileUrl",
                  },
                };
              },
            },
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        code: Code,
        inlineCode: InlineCode,
        table: Table,
        embed: Embed,
        quote: Quote,
        // codemirror: CodeMirrorTool,
      },
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ejInstance?.current?.destroy();
        ejInstance.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  return <div id="editorjs"></div>;
};
