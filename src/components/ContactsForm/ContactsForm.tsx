import React, { useState } from "react";
import { Formik, Field, Form } from 'formik';
import { useSelector } from "react-redux";

import { RootState } from "slices/rootReducer";
import { FormTitle } from "components/common/FormTitle";
import { CustomField } from "components/common/CustomField";
import { FormRecord } from "components/common/FormRecord";
import { ContactModel } from "models";

import Schema from "./Schema";

const ContactsForm = () => {

    const { contact } = useSelector((state: RootState) => state.company)

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const mapInitialValues = (values: ContactModel | null) => ({
        fullName: values ? `${values.firstname} ${values.lastname} ${values.patronymic}` : "",
        phone: values?.phone || "",
        email: values?.email || ""
    })

    const handleSubmit = (values: {fullName: string, phone: string, email: string}) => {
        console.log(values)
    }

    const getChildren = () => {
        if (isEdit) {
            return (
                <>
                    <Field
                        type="text"
                        name="fullName"
                        label="ФИО"
                        autoComplete="none"
                        component={CustomField}/>
                    <Field
                        type="text"
                        name="phone"
                        label="Телефон"
                        mask="+7 (999) 999-99-99"
                        autoComplete="none"
                        component={CustomField}/>
                    <Field
                        type="text"
                        name="email"
                        label="Эл. почта"
                        autoComplete="none"
                        component={CustomField}/>
                </>
            )
        }
        return (
            <>
                <FormRecord
                    title="ФИО"
                    text={contact ? `${contact.firstname} ${contact.lastname} ${contact.patronymic}` : ""}/>
                <FormRecord
                    title="Телефон"
                    text={contact?.phone || ""}/>
                <FormRecord
                    title="Эл. почта"
                    text={contact?.email || ""}/>
            </>
        )
    }

    const children = getChildren();

    return (
        <Formik
            validationSchema={Schema}
            initialValues={mapInitialValues(contact)}
            onSubmit={handleSubmit}>
                {() => (
                    <Form className="form is_contacts">
                        <FormTitle
                            title="контактные данные"
                            value={!isEdit}
                            fn={setIsEdit}/>
                        
                        {children}
                    </Form>
                )}
        </Formik>
    )
}

export { ContactsForm }