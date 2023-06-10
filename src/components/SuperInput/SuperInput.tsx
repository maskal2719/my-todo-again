import React, {ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, ReactNode} from 'react';
import {TextField} from "@mui/material";
import {Simulate} from "react-dom/test-utils";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: ReactNode
    type: string
    spanClassName?: string
}


const SuperInput: FC<SuperInputTextPropsType> = ({onEnter, onChange,onChangeText,onKeyPress,type, ...restProps}) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e)
        onChangeText?.(e.currentTarget.value)
    }

    const onKeyPressCallback = (e: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyPress?.(e)
        onEnter && // если есть пропс onEnter
        e.key === 'Enter' && // и если нажата кнопка Enter
        onEnter() // то вызвать его
    }

    return (
        <TextField
            variant={"outlined"}
            onChange={onChangeCallback}
            onKeyPress={onKeyPressCallback}
            type={type}
            value={restProps.value}
            onBlur={restProps.onBlur}
            autoFocus
        />
    );
};

export default SuperInput;