'use client';

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  { ssr: false }
);

export default function CKEditorClient({ value, onChange }) {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    import("@ckeditor/ckeditor5-build-classic").then((mod) => {
      setEditor(() => mod.default);
    });
  }, []);

  if (!editor) return <p>Loading editor...</p>;

  return (
    <div className="ck-content">
    <CKEditor
      editor={editor}
      data={value || ""}
      
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
    </div>
  );
}