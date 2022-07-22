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
    <div className="form-title">
        <h1 className="form-title__text">{title}</h1>
        <button 
            type="button"
            onClick={() => fn(value)}
            className="form-title__btn">
                <EditIcon/>
        </button>
    </div>
)

export { FormTitle };