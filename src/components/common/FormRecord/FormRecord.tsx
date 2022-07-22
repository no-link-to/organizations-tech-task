import React from "react";

import './style.sass';

type Props = {
    title: string;
    text: string;
}

const FormRecord = ({
    title,
    text
}: Props) => (
    <div className="form-record">
        <p className="form-record__title">{title}:</p>
        <p className="form-record__text">{text}</p>
    </div>
)

export { FormRecord }