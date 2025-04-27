export interface LoginFormData {
    email: string;
    password: string;
}

export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface CompanyFormData {
    id?: string;
    name: string;
    website: string;
    cnpj: string;
    locations?: Location[];
}

export interface Company {
    id: string;
    name: string;
    website: string;
    cnpj: string;
    locations: Location[] | string[];
}

export interface LocationFormData {
    id?: string;
    name: string;
    cep: string;
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    companyId?: string;
}

export interface Location {
    id: string;
    name: string;
    cep: string;
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    companyId?: string;
}