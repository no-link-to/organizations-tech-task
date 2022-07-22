import wretch, { Wretcher } from "wretch";

import { STORAGE_KEY } from "consts";
import { CompanyModel, ContactModel, ImageModel, PaginationModel } from "models";

const apiHost = (process.env.REACT_APP_API_URL as string) || "";

const openApiRequest = (): Wretcher => wretch().url(apiHost);
const getAuthToken = () => localStorage.getItem(STORAGE_KEY);

export const apiRequest = (isFile?: boolean): Wretcher =>
  wretch()
    .headers({
      Authorization: `Bearer ${getAuthToken()}`,
      'Content-Type': isFile ? 'application/json' : 'multipart/form-data'
    })
    .url(apiHost);

// Auth
export const authReq = (user: string) => 
    openApiRequest()
        .url('/auth/')
        .query({user})
        .get()
        .res()

// Company
export const fetchCompanyReq = (companyId: number) => 
    apiRequest()
        .url(`/companies/${companyId}`)
        .get()
        .json<CompanyModel>()

export const updateCompanyReq = (companyId: number, params: Partial<CompanyModel>) => 
    apiRequest()
        .url(`/companies/${companyId}`)
        .patch({...params})
        .json<CompanyModel>();

export const deleteCompanyReq = (companyId: number) => 
    apiRequest()
        .url(`/companies/${companyId}`)
        .delete()
        .json();

// Company Image
export const uploadImageReq = (companyId: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file)
    return (
        apiRequest(true)
            .url(`/companies/${companyId}/image/`)
            .formData(formData)
            .post()
            .json<ImageModel>()
    )
}

export const deleteImageReq = (companyId: number, imageName: number) => 
    apiRequest()
        .url(`/companies/${companyId}/image/${imageName}`)
        .delete()
        .json();

// Company Contact
export const fetchContactReq = (contactId: number) => 
    apiRequest()
        .url(`/contacts/${contactId}/`)
        .get()
        .json<ContactModel>();

export const updateContactReq = (contactId: number, params: Partial<ContactModel>) => 
    apiRequest()
        .url(`/contacts/${contactId}/`)
        .patch({...params})
        .json<ContactModel>();