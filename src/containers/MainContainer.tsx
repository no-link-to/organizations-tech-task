import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "slices/rootReducer";
import { deleteCompany, getCompanies } from "slices/companySlice";
import { AppDispatch } from "store";
import { COMPANY_ID } from "consts";
import { CompanyList } from "components/CompanyList";
import { CardContent } from "components/common/CardContent";
import { CardHeader } from "components/common/CardHeader";
import { CardBody } from "components/common/CardBody";

const MainContainer = () => {

    const dispatch: AppDispatch = useDispatch();

    const { companyList } = useSelector((state: RootState) => state.company);

    useEffect(() => {
        if (!companyList) {
            dispatch(getCompanies(COMPANY_ID))
        }
    }, [dispatch, companyList])

    const handleDeleteCompany = (value: number) => {
        dispatch(deleteCompany(value));
    }

    return (
        <CardContent>
            <CardHeader>
                <h1 className="card-header__title">список юридических лиц</h1>
            </CardHeader>
            <CardBody>
                <CompanyList
                    handleDeleteCompany={handleDeleteCompany}/>
            </CardBody>
        </CardContent>
    )
}
export { MainContainer };