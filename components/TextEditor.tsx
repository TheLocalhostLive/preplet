import React, { useCallback, useRef, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then(module => module.Editor) as any,
  { ssr: false }
);

export default function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
}
