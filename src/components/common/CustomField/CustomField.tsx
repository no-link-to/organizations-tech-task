import React from "react";
import InputMask from 'react-input-mask';
import { clsx } from "clsx";

import { Field, FieldProps } from "formik";

import "./style.sass";

const CustomField = ({
    field,
    form: {handleChange},
    ...props
}: FieldProps & { label: string; disabled: boolean, type: string, mask?: string, autoComplete: string }) => {

    const { label, type, mask, autoComplete } = props;

    const element = field.name === "phone" ? (
        <InputMask
            type={type}
            name={field.name}
            mask={mask}
            autoComplete={autoComplete}
            className={clsx("form-field__input", field.value && "is_filled")}
            value={field.value}
            onChange={handleChange}/>
    ) : (
        <Field
            name={field.name}
            value={field.value}
            className={clsx("form-field__input", field.value && "is_filled")}
            onChange={handleChange}/>
    );

    return (
        <div className="form-field">
            {element}
            <p className={clsx("form-field__label", field.value && "is_input_filled")}>{label}</p>
        </div>
    )
}

export { CustomField }