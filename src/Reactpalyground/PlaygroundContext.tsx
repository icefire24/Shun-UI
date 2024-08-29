import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { compress, fileName2Language, uncompress } from "./util";
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
    theme: 'light' | 'dark'
    setTheme: (theme: 'light' | 'dark') => void
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
const getFilesFromUrl=() => {
    const hash=window.location.hash.slice(1)     
    return JSON.parse(uncompress(hash))
}
export const PlaygroundContextProvider = (props: PropsWithChildren) => {
    const [files, setFiles] = useState<Files>(getFilesFromUrl||initFiles);
    const [selectedFilename, setSelectedFilename] = useState('App.tsx');
    useEffect(() => {
       window.location.hash = compress(JSON.stringify(files)) 
    }, [files]); 
    
    
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
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    return (
        <PlaygroundContext.Provider value={{
            theme,
            setTheme,
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