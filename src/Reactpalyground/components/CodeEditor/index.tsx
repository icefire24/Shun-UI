import { FC, useContext } from "react";
import FirstName from "./FirstName";
import Editor from "./Editor";
import { PlaygroundContext } from "../../PlaygroundContext";

interface CodeEditorProps {

}

const CodeEditor: FC<CodeEditorProps> = () => {
    const {
        files, selectedFileName, setFiles,theme
    } = useContext(PlaygroundContext)
    const file = files[selectedFileName]

    function onEditorChange(value?: string) {
        files[file.name].value = value!
        setFiles({ ...files })

    }
    return (<div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <FirstName></FirstName>
        <Editor file={file} onChange={onEditorChange} options={
            {theme:`vs-${theme}`}
        } />
    </div>);
}

export default CodeEditor;

