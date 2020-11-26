import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { MdAddCircle, MdModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { Tooltip } from '@material-ui/core';

export function BaseTableAddBtn(props: any) {
    return (
        <Tooltip title="Add" key="add">
            <IconButton color="primary">
                <MdAddCircle />
            </IconButton>
        </Tooltip>
    )
}

export function BaseTableEditBtn() {
    return (
        <Tooltip title="Edit" key="edit">
            <IconButton color="inherit">
                <MdModeEdit />
            </IconButton>
        </Tooltip>
    )
}

export function BaseTableDeleteBtn() {
    return (
        <Tooltip title="Delete" key="delete">
            <IconButton color="secondary">
                <RiDeleteBinLine />
            </IconButton>
        </Tooltip>
    )
}
