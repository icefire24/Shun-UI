import { FC } from "react";
import FirstName from "./FirstName";
import { Editor } from "@monaco-editor/react";

interface CodeEditorProps {

}

const CodeEditor: FC<CodeEditorProps> = () => {
    return (<div>
        <FirstName></FirstName>
        <Editor />
    </div>);
}

export default CodeEditor;

