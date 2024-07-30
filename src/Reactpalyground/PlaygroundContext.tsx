import { createContext, FC, PropsWithChildren, useContext, useState } from "react";
import { fileName2Language } from "./util";
import { initFiles } from "./file";


export interface File {
    name: string
    value: string
    language: string
}

export interface Files {
    [key: string]: File
}

export interface PlaygroundContext {
    files: Files
    selectedFileName: string
    setSelectedFileName: (fileName: string) => void
    setFiles: (files: Files) => void
    addFile: (fileName: string) => void
    removeFile: (fileName: string) => void
    updateFileName: (oldFieldName: string, newFieldName: string) => void
}
export const PlaygroundContext = createContext<PlaygroundContext>({
    selectedFileName: 'App.tsx'
} as PlaygroundContext)

export const PlaygroundContextProvider = (props: PropsWithChildren) => {
    const [files, setFiles] = useState<Files>(initFiles);
    const [selectedFilename, setSelectedFilename] = useState('App.tsx');
    const addFile = (name: string) => {
        files[name] = {
            name,
            language: fileName2Language(name),
            value: '',
        }
        setFiles({ ...files })
    }

    const removeFile = (name: string) => {
        delete files[name]
        setFiles({ ...files })
    }

    const updateFileName = (oldFieldName: string, newFieldName: string) => {
        if (!files[oldFieldName] || newFieldName === undefined || newFieldName === null) return
        const { [oldFieldName]: value, ...rest } = files
        const newFile = {
            [newFieldName]: {
                ...value,
                language: fileName2Language(newFieldName),
                name: newFieldName,
            },
        }
        setFiles({
            ...rest,
            ...newFile,
        })
    }
    return (
        <PlaygroundContext.Provider value={{
            files,
            selectedFileName: selectedFilename,
            setSelectedFileName: setSelectedFilename,
            setFiles,
            addFile,
            removeFile,
            updateFileName
        }}>
            {props.children}
        </PlaygroundContext.Provider>
    )
}