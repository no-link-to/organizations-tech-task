import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "store";

import { PlusIcon } from "icons";
import { RootState } from "slices/rootReducer";
import { uploadImage } from "slices/companySlice";

import "./style.sass";

type Props = {
    companyId: string
}

const CompanyImages = ({
    companyId
}: Props) => {

    const dispatch: AppDispatch = useDispatch();

    const ref = useRef<HTMLInputElement | null>(null);

    const { company } = useSelector((state: RootState) => state.company);

    const handleUploadFile = () => {
        if (ref && ref.current) {
            ref.current.click();
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];
            dispatch(uploadImage(Number(companyId), file))
        }
    }

    return (
        <div className="company-images">
            <h2 className="company-images__title">приложенные фото</h2>
            <input 
                type="file" 
                className="is_hidden" 
                ref={ref}
                onChange={handleChange}/>
            <button 
                type="button"
                className="company-images__btn"
                onClick={handleUploadFile}>
                <PlusIcon/>
                добавить изобаржение
            </button>
        </div>
    )
}

export { CompanyImages };