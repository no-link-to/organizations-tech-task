import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCompanyReq, fetchCompanyReq } from "api";
import { CompanyModel, PaginationModel, RequestStatus, requestStatuses } from "models";
import { AppDispatch, AppThunk } from "store";
import { resetStateToInitial } from "./utils";

interface CompanyState {
  companyList: PaginationModel<CompanyModel[]> | null;
  company: CompanyModel | null;
  status: RequestStatus;
  error: string | null;
}

const initialState: CompanyState = {
  companyList: null,
  company: null,
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

    resetToDefaults(state) {
      resetStateToInitial(state, initialState);
    },
  }
});

const {
  getCompaniesListSuccess,
  getCompanyStart,
  getCompanySuccess,
  getCompanyFailure
} = CompanySlice.actions;

export const { resetToDefaults } = CompanySlice.actions;

export const getCompany = (companyId: number): AppThunk => async (
    dispatch: AppDispatch
) => {
    try {
        dispatch(getCompanyStart())
        const item = await fetchCompanyReq(companyId);
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

export default CompanySlice.reducer;

function startLoading(state: CompanyState) {
  state.status = requestStatuses.loading;
}

function loadingFailed(state: CompanyState, action: PayloadAction<string>) {
  state.status = requestStatuses.failed;
  state.error = action.payload;
}
