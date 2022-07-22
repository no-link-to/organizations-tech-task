import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SideMenu } from "components/SideMenu";
import { CardMenu } from "components/CardMenu";
import { Company as CompanyView } from "components/Company";
import { RootState } from "slices/rootReducer";
import { getCompany } from "slices/companySlice";
import { AppDispatch } from "store";
import { COMPANY_ID } from "consts";

const MainContainer = () => {

    const dispatch: AppDispatch = useDispatch();

    const { company } = useSelector((state: RootState) => state.company)

    useEffect(() => {
        if (!company) {
            dispatch(getCompany(COMPANY_ID))
        }
    }, [dispatch, company])

    return (
        <>
            <SideMenu/>
            <CardMenu/>
            {
                company
                &&
                <CompanyView
                    company={company}/>
                ||
                null
            }
        </>
    )
}
export { MainContainer };