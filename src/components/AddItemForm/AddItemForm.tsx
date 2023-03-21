import React, {ChangeEvent, useState} from 'react';
import SuperInput from "../SuperInput/SuperInput";
import SuperButton from "../SuperButton/SuperButton";

export type AddItemFormPropsType = {
    callBack: (title: string) => void
}
const AddItemForm: React.FC<AddItemFormPropsType> = ({callBack}) => {

    const [inputValue, setInputValue] = useState('')
    const [err, setErr] = useState<string | null>(null)

    const setInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
        setErr('')
    }
    const onClickAddTaskHandler = () => {
        if (inputValue.trim() !== '' && inputValue.length < 20) {
            callBack(inputValue.trim())
            setInputValue('')
        } else {
            setErr('Ошибка! Поле не может быть пустым !')
        }
    }
    const onKeyPressAddTaskHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && onClickAddTaskHandler()
    }

    const isAddBtnDisabled = inputValue.length < 3 || inputValue.length > 20


    return (
        <div>
            <SuperInput type={"text"}
                        value={inputValue}
                        onChange={setInputValueChange}
                        onKeyUp={onKeyPressAddTaskHandler}
                        className={err ? 'errInput' : ''}
            />
            <SuperButton
                disabled={isAddBtnDisabled}
                callBack={onClickAddTaskHandler}
                btnName={'+'}
            />
        </div>
    );
};

export default AddItemForm;