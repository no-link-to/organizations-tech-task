type RouteId = string | number;

export const routes = {
    "home": "/",
    company: (companyId: RouteId = ":companyId") => `/company/${companyId}`,
}