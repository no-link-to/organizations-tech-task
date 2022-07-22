import React from "react";

import { ArrowIcon, DeleteIcon, LinkIcon, RefreshIcon } from "icons";
import { ContactsForm } from "components/ContactsForm";
import { CompanyForm } from "components/CompanyForm";
import { CompanyModel } from "models";

import "./style.sass";

type Props = {
    company: CompanyModel;
}

const Company = ({
    company
}: Props) => (
    <div className="company">
        <div className="company-header">
            <button
                type="button"
                className="company-header__button">
                    <ArrowIcon/>
                    к списку юридических лиц
            </button>
            <div className="company-header-btns">
                <button
                    className="company-header-btns__button"
                    type="button">
                        <LinkIcon/>
                </button>
                <button
                    className="company-header-btns__button"
                    type="button">
                        <RefreshIcon/>
                </button>
                <button
                    className="company-header-btns__button"
                    type="button">
                        <DeleteIcon/>
                </button> 
            </div>
        </div>
        <CompanyForm/>
        <ContactsForm/>
    </div>
)

export { Company }