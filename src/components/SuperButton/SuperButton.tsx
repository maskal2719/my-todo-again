import React, {FC} from 'react';

type SuperButtonPropsType = {
    btnName: string
    callBack?: () => void
    disabled?: boolean
    className?: string

}
const SuperButton : FC<SuperButtonPropsType> = ({btnName, callBack,disabled,className}) => {
    return (
        <button className={className} disabled={disabled} onClick={callBack}>{btnName}</button>
    );
};

export default SuperButton;