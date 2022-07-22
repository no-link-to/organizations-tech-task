import React, { useState } from "react";
import { Formik, Field, Form } from 'formik';
import { useSelector } from "react-redux";

import { FormTitle } from "components/common/FormTitle";
import { CustomField } from "components/common/CustomField";
import { CompanyModel } from "models";
import { RootState } from "slices/rootReducer";
import { formatDate } from "helpers";

import Schema from "./Schema";
import { FormRecord } from "components/common/FormRecord";

const CompanyForm = () => {

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const { company } = useSelector((state: RootState) => state.company);

    const mapInitialValues = (values: CompanyModel | null) => ({
        fullName: values?.shortName || "",
        contractNumber: values?.contract.no || "",
        contractDate: values ? formatDate(values.contract.issue_date) : "",
        businessEntity: values?.businessEntity || "",
        type: values && values.type.join(", ") || ""
    })

    const handleSubmit = (values: {fullName: string, contractNumber: string, contractDate: string, businessEntity: string, type: string}) => {
        console.log(values)
    }

    const getChildren = () => {
        if (isEdit) {
            return (
                <>
                    <Field
                        type="text"
                        name="fullName"
                        label="Полное название"
                        autoComplete="none"
                        component={CustomField}
                        disabled={!isEdit}/>
                    <Field
                        type="text"
                        name="contractNumber"
                        label="Номер договора"
                        autoComplete="none"
                        component={CustomField}
                        disabled={!isEdit}/>
                    <Field
                        type="text"
                        name="contractDate"
                        label="Дата договора"
                        autoComplete="none"
                        component={CustomField}
                        disabled={!isEdit}/>
                    <Field
                        type="text"
                        name="businessEntity"
                        label="Форма"
                        autoComplete="none"
                        component={CustomField}
                        disabled={!isEdit}/>
                    <Field
                        type="text"
                        name="type"
                        label="Тип"
                        autoComplete="none"
                        component={CustomField}
                        disabled={!isEdit}/>
                </>
            )
        }
        return (
            <>
                <FormRecord
                    title="Полное название"
                    text={company?.name || ""}/>
                <FormRecord
                    title="Договор"
                    text={company ? `${company.contract.no} от ${formatDate(company.contract.issue_date)}` : ""}/>
                <FormRecord
                    title="Форма"
                    text={company?.businessEntity || ""}/>
                <FormRecord
                    title="Тип"
                    text={company ? company.type.join(", ") : ""}/>
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
                    <Form className="form">
                        <FormTitle
                            title="общая информация"
                            value={!isEdit}
                            fn={setIsEdit}/>
                        {children}
                    </Form>
                )}
        </Formik>
    )
}

export { CompanyForm }