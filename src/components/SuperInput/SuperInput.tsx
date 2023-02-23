import React, {ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, ReactNode} from 'react';

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
        <input
            type={type}
            onChange={onChangeCallback}
            onKeyPress={onKeyPressCallback}
            {...restProps}
        />
    );
};

export default SuperInput;