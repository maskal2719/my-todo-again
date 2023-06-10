import React, {FC} from 'react';
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

type SuperButtonPropsType = {
    btnName: string
    callBack?: () => void
    disabled?: boolean
    className?: string
}
const SuperButton : FC<SuperButtonPropsType> = ({btnName, callBack,disabled,className}) => {
    return (
        btnName === 'x' ? <IconButton onClick={callBack}><Delete/></IconButton> :
        <Button disabled={disabled} variant={"contained"} onClick={callBack}>{btnName}</Button>
);
};

export default SuperButton;