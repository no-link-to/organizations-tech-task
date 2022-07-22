import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { CardContent } from "components/common/CardContent";
import { CardHeader } from "components/common/CardHeader";
import { CardBody } from "components/common/CardBody";
import { ContactsForm } from "components/ContactsForm";
import { CompanyForm } from "components/CompanyForm";
import { ArrowIcon, DeleteIcon, LinkIcon, RefreshIcon } from "icons";
import { getCompany, getContact, resetToDefaults } from "slices/companySlice";
import { RootState } from "slices/rootReducer";
import { AppDispatch } from "store";
import { routes } from "routes";

type Props = {
    companyId: string
}

const CompanyContainer = ({
    companyId
}: Props) => {

    const dispatch: AppDispatch = useDispatch();

    const { company, contact } = useSelector((state: RootState) => state.company);

    useEffect(() => {
        if (companyId && (!company || company.id !== companyId)) {
            dispatch(getCompany(Number(companyId)))
        }
        if (company && (!contact || contact.id !== company.contactId)) {
            dispatch(getContact(Number(company.contactId)))
        }
    }, [dispatch, company, contact])

    useEffect(() => {
        return () => {
            dispatch(resetToDefaults())
        }
    }, [dispatch])

    return (
        <CardContent>
            <CardHeader>
                <Link
                    className="card-header__link"
                    to={routes.home}>
                        <ArrowIcon/>
                        к списку юридических лиц
                </Link>
                <div className="card-header-btns">
                    <button
                        className="card-header-btns__button"
                        type="button">
                            <LinkIcon/>
                    </button>
                    <button
                        className="card-header-btns__button"
                        type="button">
                            <RefreshIcon/>
                    </button>
                    <button
                        className="card-header-btns__button"
                        type="button">
                            <DeleteIcon/>
                    </button> 
                </div>
            </CardHeader>
            <CardBody>
                <>
                    {company && <CompanyForm/> || null}
                    {contact && <ContactsForm/> || null}
                </>
            </CardBody>
        </CardContent>
    )
}

export { CompanyContainer };