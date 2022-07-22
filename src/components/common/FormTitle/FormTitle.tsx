import React from "react";

import { EditIcon } from "icons";

import "./style.sass";

type Props = {
    title: string;
    value: boolean;
    fn: (value: boolean) => void;
}

const FormTitle = ({
    title, 
    value,
    fn
}: Props) => (
    <div className="form-header">
        <h1 className="form-header__text">{title}</h1>
        <button 
            type={value ? "submit" : "button"}
            onClick={() => fn(value)}
            className="form-header__btn">
                <EditIcon/>
        </button>
    </div>
)

export { FormTitle };