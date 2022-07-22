import React from "react";
import InputMask from 'react-input-mask';
import { clsx } from "clsx";

import { Field, FieldProps } from "formik";

import "./style.sass";

const FormField = ({
    field,
    form: {handleChange},
    ...props
}: FieldProps & { label: string; disabled: boolean, type: string, mask?: string, autoComplete: string }) => {

    const { label, disabled, type, mask, autoComplete } = props;

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
    
    const children = disabled 
        && 
        <>
            <p className="form-field__text">{label}:</p>
            <p className="form-field__value">{field.value}</p>
        </> 
        || 
        <>
            {element}
            <p className={clsx("form-field__label", field.value && "is_input_filled")}>{label}</p>
        </>;

    return (
        <div className="form-field">
            {children}
        </div>
    )
}

export { FormField }