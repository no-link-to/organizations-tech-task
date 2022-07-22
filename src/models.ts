export enum requestStatuses {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}

export type RequestStatus =
  | requestStatuses.idle
  | requestStatuses.loading
  | requestStatuses.succeeded
  | requestStatuses.failed;

export interface PaginationModel<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}

export interface ImageModel {
  name: string;
  filePath: string;
  thumbPath: string;
}

export interface CompanyModel {
  id: number;
  contactId: number;
  name: string;
  shortName: string;
  businessEntity: string;
  contract:  {
    no: number;
    issue_date: string;
  };
  type: string[];
  status: string;
  photos: ImageModel[];
  createdAt: string;
  updatedAt: string;
}

export interface ContactModel {
  id: number,
  lastname: string;
  firstname: string;
  patronymic: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}