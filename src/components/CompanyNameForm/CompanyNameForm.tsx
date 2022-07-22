import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";

import { RootState } from "slices/rootReducer";
import { CustomField } from "components/common/CustomField";
import { CompanyModel } from "models";
import { EditIcon } from "icons";
import { AppDispatch } from "store";
import { updateCompany } from "slices/companySlice";

import Schema from "./Schema";
import "./style.sass";

type Props = {
    companyId: string
}

const CompanyNameForm = ({
    companyId
}: Props) => {

    const dispatch: AppDispatch = useDispatch();

    const { company } = useSelector((state: RootState) => state.company);

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const mapInitialValues = (values: CompanyModel | null) => ({
        name: values?.name || ""
    });

    const handleSubmit = (values: {name: string}) => {
        if (companyId) {
            dispatch(updateCompany(Number(companyId), {name: values.name}))
        }
    }

    return (
        <Formik
            validationSchema={Schema}
            initialValues={mapInitialValues(company)}
            onSubmit={handleSubmit}>
                {() => (
                    <Form className="single-field-form">
                        {
                            isEdit
                            &&
                            <Field
                                type="text"
                                name="name"
                                label="Название компании"
                                autoComplete="none"
                                component={CustomField}/>
                            ||
                            <p className="single-field-form__text">{company?.name}</p>

                        }
                        <button
                            type="submit"
                            className="single-field-form__button"
                            onClick={() => setIsEdit(true)}>
                                <EditIcon/>
                        </button>
                    </Form>
                )}
        </Formik>
    )
}

export { CompanyNameForm }