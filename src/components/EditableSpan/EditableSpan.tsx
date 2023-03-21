import React, {ChangeEvent, useState} from 'react';
import SuperInput from "../SuperInput/SuperInput";

export type EditableSpanPropsType = {
    oldTitle: string
    callBack: (title: string) => void
}
const EditableSpan: React.FC<EditableSpanPropsType> = ({oldTitle, callBack}) => {

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(oldTitle)

    const changeEditModeStatus = () => {
        setEditMode(!editMode)
        addTask()
    }
    const onChangeNewTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTask = () => {
        callBack(newTitle)
    }

    return (
        !editMode ? <span onDoubleClick={changeEditModeStatus}>{oldTitle}</span> :
            <SuperInput type={"text"} onChange={onChangeNewTitle} value={newTitle} onBlur={changeEditModeStatus}
                        autoFocus/>
    );
};

export default EditableSpan;