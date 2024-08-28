import classnames from 'classnames'
import React, { useState, useRef, useEffect, MouseEventHandler } from 'react'

import styles from './index.module.scss'

export interface FileNameItemProps {
    value: string
    actived: boolean
    creating: boolean
    readonly: boolean
    onClick: () => void
    handleEditComplete: (name: string) => void
    onRemove: MouseEventHandler
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
    const {
        value,
        actived = false,
        readonly,
        creating,
        onClick,
        handleEditComplete,
        onRemove
    } = props

    const [name, setName] = useState(value)
    const [edit, setEdit] = useState(creating);
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {

        if (creating) {
            console.log(creating);
            inputRef.current?.focus()
        }
    }, [creating]);
    const handleDoubleClick = () => {
        setEdit(true)
        inputRef.current?.focus()

    }
    const handleBlur = (name: string) => {
        setEdit(false)
        handleEditComplete(name)
    }
    return (
        <div
            className={classnames(styles['tab-item'], actived ? styles.actived : null)}
            onClick={onClick}
        >
            {
                edit ? <input
                    ref={inputRef}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={(e) => handleBlur(e.target.value)}
                /> :
                    <>
                        <span onDoubleClick={!readonly ? handleDoubleClick : () => {
                        }}>{name}</span>
                        {!readonly ? <span style={{ marginLeft: 5, display: 'flex' }} onClick={onRemove}>
                            <svg width='12' height='12' viewBox='0 0 24 24'>
                                <line stroke='#999' x1='18' y1='6' x2='6' y2='18'></line>
                                <line stroke='#999' x1='6' y1='6' x2='18' y2='18'></line>
                            </svg>
                        </span> : ''}
                    </>

            }
        </div>
    )
}
