import React, { useState } from "react";
import { Formik, Field, Form } from 'formik';

import { FormTitle } from "components/common/FormTitle";
import { FormField } from "components/common/FormField";

import Schema from "./Schema";

const ContactsForm = () => {

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const mapInitialValues = () => {
        return ({
            fullName: "Григорьев Сергей Петрович",
            phone: "+7 (916) 216-55-88",
            email: "grigoriev@funeral.com"
        })
    }

    const handleSubmit = (values: {fullName: string, phone: string, email: string}) => {
        console.log(values)
    }

    return (
        <Formik
            validationSchema={Schema}
            initialValues={mapInitialValues()}
            onSubmit={handleSubmit}>
                {() => (
                    <Form className="company-form is_contacts">
                        <FormTitle
                            title="контактные данные"
                            value={!isEdit}
                            fn={setIsEdit}/>
                        <Field
                            type="text"
                            name="fullName"
                            label="ФИО"
                            autoComplete="none"
                            component={FormField}
                            disabled={!isEdit}/>
                        <Field
                            type="text"
                            name="phone"
                            label="Телефон"
                            mask="+7 (999) 999-99-99"
                            autoComplete="none"
                            component={FormField}
                            disabled={!isEdit}/>
                        <Field
                            type="text"
                            name="email"
                            label="Эл. почта"
                            autoComplete="none"
                            component={FormField}
                            disabled={!isEdit}/>
                    </Form>
                )}
        </Formik>
    )
}

export { ContactsForm }