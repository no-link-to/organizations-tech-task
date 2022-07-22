import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";

import { RootState } from "slices/rootReducer";
import { CompanyModel } from "models";
import { EditIcon } from "icons";

import Schema from "./Schema";
import "./style.sass";


const CompanyNameForm = () => {

    const { company } = useSelector((state: RootState) => state.company);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const mapInitialValues = (values: CompanyModel | null) => ({
        name: values?.name || ""
    });

    const handleSubmit = (values: {name: string}) => {
        console.log("submit", values)
    }

    const getChildren = () => {
        if (isEdit) {
            return (
                <>
                    <Field
                        type="text"
                        name="name"
                        className="company-name__input"/>
                    <button
                        type="submit"
                        className="company-name__button">
                            <EditIcon/>
                    </button>
                </>
            )
        }
        return (
            <>
                <p className="company-name__text">{company?.name}</p>
                <button
                    type="button"
                    className="company-name__button"
                    onClick={() => setIsEdit(true)}>
                        <EditIcon/>
                </button>
            </>
        )
    }

    const children = getChildren();

    return (
        <Formik
            validationSchema={Schema}
            initialValues={mapInitialValues(company)}
            onSubmit={handleSubmit}>
                {() => (
                    <Form className="company-name">
                        {children}
                    </Form>
                )}
        </Formik>
    )
}

export { CompanyNameForm }