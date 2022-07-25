import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ClipboardJS from "clipboard";

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
import { CompanyNameForm } from "components/CompanyNameForm/CompanyNameForm";
import { CompanyImages } from "components/CompanyImages";
import { ConfirmContext, OverlayContext } from "context";
import { copyText } from "helpers";

type Props = {
    companyId: string
}

const CompanyContainer = ({
    companyId
}: Props) => {

    const { pathname } = useLocation();

    const dispatch: AppDispatch = useDispatch();

    const { setConfirmCompanyId } = useContext(ConfirmContext);
    const { setIsOverlay } = useContext(OverlayContext);

    const { company, contact } = useSelector((state: RootState) => state.company);

    useEffect(() => {
        if (company && (!contact || contact.id !== company.contactId)) {
            dispatch(getContact(Number(company.contactId)))
        }
    }, [dispatch, company, contact])

    useEffect(() => {
        if (companyId && (!company || company.id !== companyId)) {
            dispatch(getCompany(Number(companyId)))
        }
    }, [])

    useEffect(() => {
        return () => {
            dispatch(resetToDefaults())
        }
    }, [dispatch]);

    const handleDeleteCompany = () => {
        if (companyId) {
            setConfirmCompanyId(companyId);
            setIsOverlay(true)
        }
    }

    const handleRefreshData = () => {
        if (companyId) {
            dispatch(getCompany(Number(companyId)))
        }
    }

    const handleCopyLink = () => {
        copyText(pathname)
    }

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
                        type="button"
                        onClick={handleCopyLink}>
                            <LinkIcon/>
                    </button>
                    {
                        company
                        &&
                        <>
                            <button
                                className="card-header-btns__button"
                                type="button"
                                onClick={handleRefreshData}>
                                    <RefreshIcon/>
                            </button>
                            <button
                                className="card-header-btns__button"
                                type="button"
                                onClick={handleDeleteCompany}>
                                    <DeleteIcon/>
                            </button> 
                        </>
                        ||
                        null
                    }
                </div>
            </CardHeader>
            <CardBody>
                {
                    company
                    &&
                        <>
                        <CompanyNameForm
                            companyId={companyId}/>
                        <CompanyForm/>
                        {contact && <ContactsForm/> || null}
                        <CompanyImages
                            companyId={companyId}/>
                    </>
                    ||
                    <h1 className="card-body__empty-title">Компания удалена или ее не существует</h1>
                }
            </CardBody>
        </CardContent>
    )
}

export { CompanyContainer };