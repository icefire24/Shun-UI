import { useContext, useEffect, useState } from "react"
import { PlaygroundContext } from "../../../PlaygroundContext"


import styles from './index.module.scss'
import { FileNameItem } from "./FileNameItem"
import { APP_COMPONENT_FILE_NAME, ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME } from "../../../file"

export default function FileNameList() {
    const {
        files,
        removeFile,
        addFile,
        updateFileName,
        selectedFileName,
        setSelectedFileName
    } = useContext(PlaygroundContext)

    const [tabs, setTabs] = useState([''])
    const [creating, setCreating] = useState(false);
    const handleEditComplete = (name: string) => {
        updateFileName(selectedFileName, name)
        setSelectedFileName(name)
    }
    const handleRemove = (name: string) => {
        removeFile(name)
        setSelectedFileName(ENTRY_FILE_NAME)
    }
    const addTab = () => {
        const newFileName = 'Comp' + Math.random().toString().slice(2, 8) + '.tsx';
        addFile(newFileName);
        setSelectedFileName(newFileName);
        setCreating(true)
    }
    useEffect(() => {
        setTabs(Object.keys(files))
    }, [files])
    const readonlyFileNames = [ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME, APP_COMPONENT_FILE_NAME];

    return <div className={styles.tabs}>
        {
            tabs.map((item, index) => (
                <FileNameItem
                    key={item + index}
                    value={item}
                    creating={creating && index === tabs.length - 1}
                    readonly={readonlyFileNames.includes(item)}
                    actived={selectedFileName === item}
                    onClick={() => setSelectedFileName(item)}
                    handleEditComplete={handleEditComplete}
                    onRemove={() => { handleRemove(item) }}
                >
                </FileNameItem>
            ))
        }
        <button onClick={addTab}>add</button>
    </div>
}
