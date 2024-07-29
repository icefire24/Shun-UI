import { FC } from "react";
import MonacEditor from '@monaco-editor/react'
interface EditorProps {

}

const Editor: FC<EditorProps> = (props) => {
    const code = `export default function App() {
    return <div>Hello World</div>
    }`
    return (<MonacEditor value={code} language={"typescript"}></MonacEditor>);
}

export default Editor;