import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCompanyReq, fetchCompanyReq, fetchContactReq, updateCompanyReq, updateContactReq } from "api";
import { CompanyModel, ContactModel, PaginationModel, RequestStatus, requestStatuses } from "models";
import { AppDispatch, AppThunk } from "store";
import { resetStateToInitial } from "./utils";

interface CompanyState {
  companyList: PaginationModel<CompanyModel[]> | null;
  company: CompanyModel | null;
  contact: ContactModel | null;
  status: RequestStatus;
  error: string | null;
}

const initialState: CompanyState = {
  companyList: null,
  company: null,
  contact: null,
  status: requestStatuses.idle,
  error: null,
};

const CompanySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    getCompaniesListStart: startLoading,
    getCompaniesListSuccess(state, action: PayloadAction<PaginationModel<CompanyModel[]> | null>) {
      state.companyList = action.payload;
      state.status = requestStatuses.succeeded;
      state.error = null;
    },
    getCompaniesListFailure: loadingFailed,

    getCompanyStart: startLoading,
    getCompanySuccess(state, action: PayloadAction<CompanyModel | null>) {
      state.company = action.payload;
      state.status = requestStatuses.succeeded;
      state.error = null;
    },
    getCompanyFailure: loadingFailed,

    getContactStart: startLoading,
    getContactSuccess(state, action: PayloadAction<ContactModel>) {
      state.contact = action.payload;
      state.status = requestStatuses.succeeded;
      state.error = null;
    },
    getContactFailure: loadingFailed,

    resetToDefaults(state) {
      resetStateToInitial(state, initialState);
    },
  }
});

const {
  getCompaniesListStart,
  getCompaniesListSuccess,
  getCompaniesListFailure,
  getCompanyStart,
  getCompanySuccess,
  getCompanyFailure,
  getContactStart,
  getContactSuccess,
  getContactFailure
} = CompanySlice.actions;

export const { resetToDefaults } = CompanySlice.actions;

export const getCompanies = (companyId: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
      dispatch(getCompaniesListStart())
      const item = await fetchCompanyReq(companyId);
      dispatch(getCompaniesListSuccess({
        count: 1,
        next: null,
        previous: null,
        results: [item]
      }))
  } catch (error: any) {
      dispatch(getCompaniesListFailure(error.toString()));
  }
}

export const getCompany = (companyId: number): AppThunk => async (
    dispatch: AppDispatch
) => {
    try {
        dispatch(getCompanyStart())
        const item = await fetchCompanyReq(companyId);
        dispatch(getCompanySuccess(item));
    } catch (error: any) {
        dispatch(getCompanyFailure(error.toString()));
    }
}

export const updateCompany = (companyId: number, params: Partial<CompanyModel>): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
      dispatch(getCompanyStart())
      const item = await updateCompanyReq(companyId, params);
      dispatch(getCompanySuccess(item));
      dispatch(getCompaniesListSuccess({
        count: 1,
        next: null,
        previous: null,
        results: [item]
      }))
  } catch (error: any) {
      dispatch(getCompanyFailure(error.toString()));
  }
}


export const deleteCompany = (companyId: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
      dispatch(getCompanyStart())
      const item = await deleteCompanyReq(companyId);
      if (item) {
        dispatch(getCompanySuccess(null));
        dispatch(getCompaniesListSuccess(null));
      }
  } catch (error: any) {
      dispatch(getCompanyFailure(error.toString()));
  }
}

export const getContact = (contactId: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
      dispatch(getContactStart())
      const item = await fetchContactReq(contactId);
      dispatch(getContactSuccess(item));
  } catch (error: any) {
      dispatch(getContactFailure(error.toString()));
  }
}

export const updateContact = (contactId: number, params: Partial<ContactModel>): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
      dispatch(getContactStart())
      const item = await updateContactReq(contactId, params);
      dispatch(getContactSuccess(item));
  } catch (error: any) {
      dispatch(getContactFailure(error.toString()));
  }
}

export default CompanySlice.reducer;

function startLoading(state: CompanyState) {
  state.status = requestStatuses.loading;
}

function loadingFailed(state: CompanyState, action: PayloadAction<string>) {
  state.status = requestStatuses.failed;
  state.error = action.payload;
}
