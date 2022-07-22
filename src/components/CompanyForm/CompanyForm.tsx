import React, { useState } from "react";
import { Formik, Field, Form } from 'formik';

import { FormTitle } from "components/common/FormTitle";
import { FormField } from "components/common/FormField";

import Schema from "./Schema";

const CompanyForm = () => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const mapInitialValues = () => {
        return ({
            fullName: "ООО Фирма “Перспективные захоронения”",
            contract: "12345 от 12.03.2015",
            businessEntity: "ООО",
            type: "Агент, Подрядчик"
        })
    }

    const handleSubmit = (values: {fullName: string, contract: string, businessEntity: string, type: string}) => {
        console.log(values)
    }

    return (
        <Formik
            validationSchema={Schema}
            initialValues={mapInitialValues()}
            onSubmit={handleSubmit}>
                {() => (
                    <Form className="company-form">
                        <FormTitle
                            title="контактные данные"
                            value={!isEdit}
                            fn={setIsEdit}/>
                        <Field
                            type="text"
                            name="fullName"
                            label="Полное название"
                            autoComplete="none"
                            component={FormField}
                            disabled={!isEdit}/>
                        <Field
                            type="text"
                            name="contract"
                            label="Договор"
                            mask="+7 (999) 999-99-99"
                            autoComplete="none"
                            component={FormField}
                            disabled={!isEdit}/>
                        <Field
                            type="text"
                            name="businessEntity"
                            label="Форма"
                            autoComplete="none"
                            component={FormField}
                            disabled={!isEdit}/>
                        <Field
                            type="text"
                            name="type"
                            label="Тип"
                            autoComplete="none"
                            component={FormField}
                            disabled={!isEdit}/>
                    </Form>
                )}
        </Formik>
    )
}

export { CompanyForm }